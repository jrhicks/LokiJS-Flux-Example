import Loki from 'lokijs';
import objectHash from 'object-hash';

class ReplicatedDB {

  constructor() {
    let loki = new Loki('ReplicatedDB');
    this.loki = loki;

    // META COLLECTIONS
    this.subscription = loki.addCollection('__subscription', {indices:['id']});

    // APP COLLECTIONS
    this.project = loki.addCollection('project', {indices:['id']});
    this.note = loki.addCollection('note', {indices:['id']});
    this.contact = loki.addCollection('contact', {indices:['id']});

    this.shouldReplicate = false;
    this.isRunning = false;
    this.pollingInterval = 5000;
  }

  async run() {
    if (this.isRunning) {
      throw 'Please only run once at the start of your application.'
    } else {
      this.isRunning = true;
      while (true) {
        if (this.isRunning) {
          await this.replicate();
        }
        await this.milliseconds(this.pollingInterval);
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
  }

  startReplication() {
    this.shouldReplicate = true;
  }

  stopReplication() {
    this.shouldReplicate = false;
  }

  // PRIVATE METHODS

  async replicate() {
    let subscriptions = this.db.subscription.data;

    while (subscriptions.length > 0) {
      for (let s of db.subscription.data) {
        await this.replicatePageFromServer(s);
      }
      subscriptions = this.subscriptions.data.find((s) => s.cursorAtEnd == false);
    }
  }

  async replicatePageFromServer(subscription) {
    let scope = {
                  collection: subscription.collection,
                  filter: subscription.filter,
                  lastIdCursor: subscription.lastIdCursor,
                  lastUpdatedCursor: subscription.lastUpdatedCursor
                };
    let scopeJson = encodeURIComponent(JSON.stringify(scope));
    let url = `/replicated_db/download_updates?scope=${scopeJson}`;
    let response = await agent.get(url).end();
    let {availableUpdatesCount, data} = JSON.parse(response.text);
    if (availableUpdatesCount > 0) {
      if (subscription.isDownloading == false) {
        subscription.isDownloading = true;
        subscription.recordsToDownload = availableUpdatesCount;
        subscription.recordsDownloaded = 0;
      }
      await this.processPageFromServer(subscription, availableUpdatesCount, data);
      if (data.length >= availableUpdatesCount) {
        subscription.isDownloading = false;
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
        subscription.save
      }

      // TODO TRACK ELAPSED TIME
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
    let id = objectHash({collectionName: collectionName,
                         filter: filter});
  }

}

module.exports = alt.createStore(ReplicatedDBStore);
