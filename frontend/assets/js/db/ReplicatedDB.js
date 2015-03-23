import alt from '../alt';
import Loki from 'lokijs';
import objectHash from 'object-hash';
import agent from 'superagent-promise';
import ReplicatedDBActions from './ReplicatedDBActions';

class ReplicatedDB {

  constructor() {
    let loki = new Loki('ReplicatedDB');
    this.db = loki;

    // META COLLECTIONS
    this.subscription = this.db.addCollection('subscription', {indices:['id']});

    // APP COLLECTIONS
    this.project = this.db.addCollection('project', {indices:['id']});
    this.note = this.db.addCollection('note', {indices:['id']});
    this.contact = this.db.addCollection('contact', {indices:['id']});

    this.countDown = 0;
    this.shouldReplicate = false;
    this.isRunning = false;
    this.pollingInterval = 5000; // Milliseconds
  }

  notifyChange() {
    ReplicatedDBActions.update();
  }

  async run() {
    let resolution = 10; // 10 milliseconds
    if (this.isRunning) {
      throw 'Please only run once at the start of your application.'
    } else {
      this.isRunning = true;
      while (true) {
        if (this.countDown <= 0) {
          this.countDown = this.pollingInterval / resolution;
          if (this.shouldReplicate) {
            console.log(".");
            await this.replicate();
          } else {
            console.log("#");
          }
        }
        this.countDown -= 1;
        await this.milliseconds(resolution);
      }
    }
  }

  addSubscription(collectionName, filter) {
    let id = this.subscriptionKey(collectionName, filter);
    let s = db.subscription.findOne({id:id});
    if (s) {
      s.lastSubscription = new Date().getTime();
      s.save
    } else {
      s = {
        id: id,
        filter: filter,
        collectionName: collectionName,
        lastSubscription: new Date().getTime(),
        lastSync: null,
        lastUpdatedCursor: null,
        lastIdCursor: null,
        cursorAtEnd: false,
        isDownloading: false,
        recordsToDownload: 0,
        recordsDownloaded: 0,
        isUploading: false,
        recordsToUpload: 0,
        recordsUploaded: 0
      }
      this.subscription.insert(s);
    }
    this.countDown = 0;
    this.notifyChange();
  }

  startReplication() {
    this.shouldReplicate = true;
    this.countDown = 0;
    this.notifyChange();
  }

  stopReplication() {
    this.shouldReplicate = false;
    this.notifyChange();
  }

  // PRIVATE METHODS

  async replicate() {
    let subscriptions = this.subscription.data;

    while (subscriptions.length > 0) {
      for (let s of db.subscription.data) {
        await this.replicatePageFromServer(s);
        this.notifyChange();
      }
      subscriptions = this.subscription.data.find((s) => s.cursorAtEnd == false);
    }
  }

  async replicatePageFromServer(s) {
    let scope = {
                  collectionName: s.collectionName,
                  filter: s.filter,
                  lastIdCursor: s.lastIdCursor,
                  lastUpdatedCursor: s.lastUpdatedCursor
                };
    let scopeJson = encodeURIComponent(JSON.stringify(scope));
    let url = `/replicated_db/download_updates?scope=${scopeJson}`;
    let response = await agent.get(url).end();
    let {availableUpdatesCount, data} = JSON.parse(response.text);
    if (availableUpdatesCount > 0) {
      if (s.isDownloading == false) {
        s.isDownloading = true;
        s.recordsToDownload = availableUpdatesCount;
        s.recordsDownloaded = 0;
        s.save
        this.notifyChange();
      }
      await this.processPageFromServer(s, availableUpdatesCount, data);
      if (data.length >= availableUpdatesCount) {
        s.isDownloading = false;
        s.save
        this.notifyChange();
      }
    }
  }

  async processPageFromServer(subscription, availabieUpdatesCount, data) {
    let collection = this[subscription.collectionName];
    for (let serverRecord of data) {
      let localRecord = collection.findOne({id: serverRecord.id});
      if (localRecord) {
        // TODO
        console.log('Record Already Here');
      }
      else {
        collection.insert(serverRecord);
        subscription.recordsDownloaded += 1;
        subscription.lastIdCursor = serverRecord.id;
        subscription.lastUpdatedCursor = serverRecord.updated_at;
        subscription.save
      }

      if (subscription.recordsDownloaded % 10 == 0) {
        await this.milliseconds(10);
      }
    }

  }

  // HELPERS

  milliseconds(m) {
    return new Promise((cb)=>setTimeout(function(){ cb() }, m));
  }

  subscriptionKey(collectionName, filter) {
    return objectHash({collectionName: collectionName,
                         filter: filter});
  }

}

module.exports = new ReplicatedDB();
