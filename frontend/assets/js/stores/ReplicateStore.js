import alt from '../alt';
import objectHash from 'object-hash';

import db from '../models/Collections';
import ReplicateActions from '../actions/ReplicateActions';

class ReplicateStore {

  constructor() {
    this.bindActions(ReplicateActions);
    this.shouldReplicate = false;
    this.pollingInterval = 5000; // Milliseconds
    this.loadQueue = [];
  }

  onQueue(load) {
    this.loadQueue.push(load);
  }

  onLoad() {
    let blockTime = 50; // milliseconds
    var remoteRec;
    var localRec;

    var localRecords = {};

    let startedAt = new Date().getTime();
    while (this.loadQueue.length > 0 && new Date().getTime() - startedAt < blockTime) {
      let loadJob = this.loadQueue[0];
      let {subscriptionId, collectionName, availableUpdatesCount, data, createdAt} = loadJob;

      // Find All The Local Records First To Optimize Index Usage In LociJS
      // https://github.com/techfort/LokiJS/issues/119
      for (let d of data) {
        localRec = db[collectionName].findOne({id: d.id})
        if (localRec) {
          localRecords[localRec.id] = localRec;
        }
      }

      while (loadJob.data.length > 0 && new Date().getTime() - startedAt < blockTime) {
        remoteRec = data[0];
        localRec = false;
        if (localRecords[remoteRec.id]) {
          console.log("TODO: Merge");
        } else {
          let r = db[collectionName].insert(remoteRec);
          localRec[r.id] = r;
          loadJob.data.shift();
        }
      }
      if (remoteRec) {
        let s = db.subscription.findOne({id: loadJob.subscriptionId});
        s.lastIdCursor = remoteRec.id;
        s.lastUpdatedCursor = remoteRec.updated_at;
        s.save
      }
      if (loadJob.data.length == 0) {
        this.loadQueue.shift();
      } else {
        this.loadQueue[0]=loadJob;
      }
    }
  }

  onStop() {
    this.shouldReplicate = false;
  }

  onStart() {
    console.log('ReplicateStore.onStart()');
    this.shouldReplicate = true;
  }

  onSubscribe({collectionName, filter}) {
    console.log("ReplicateStore.subscribe");
    let id = objectHash({collectionName, filter});
    let s = db.subscription.findOne({id:id});
    if (s) {
      s.lastSubscription = new Date().getTime(),
      s.save
    } else {
      s =  {
        id: id,
        collectionName: collectionName,
        filter: filter,
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
    db.subscription.insert(s);
    }
  }

}

module.exports = alt.createStore(ReplicateStore);
