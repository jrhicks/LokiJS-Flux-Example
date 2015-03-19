import alt from '../alt';
import db from './LokiDB';
import objectHash from 'object-hash';
import OfflineActions from '../offline/OfflineActions';
import helper from '../helper';

class OfflineStore {

  constructor() {
    this.bindActions(OfflineActions);
  }

  static allsubscriptions() {
    return objectValues(this.getState().subscriptions);
  }

  onSubscribe(subscription) {
    console.log("onSubscribe");
    console.log(subscription);
    let {filter, collection} = subscription;
    let id = objectHash(subscription);
    let s = db.subscription.findOne({id:id});
    if (s) {
      s.lastSubscription = new Date().getTime();
      s.save
    } else {
      s = {
        id: id,
        filter: filter,
        collection: collection,
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

  onStartDownload(payload) {
    let {subscription, recordsToDownload} = payload;
    let s = db.subscription.findOne({id:id});
    s.recordsToDownload = recordsToDownload;
    s.isDownloading = true;
    s.recordsDownloaded = 0;
    s.save
  }

  onLoadData(payload) {
    let {subscription, data} = payload;
    let collection = db[subscription.collection];
    subscription = db.subscription.findOne({id: subscription.id});
    for (let serverRecord of data) {
      let localRecord = collection.findOne({id: serverRecord.id});
      if (localRecord) {
        console.log('Record Already Here');
      }
      else {
        collection.insert(serverRecord);
        subscription.recordsDownloaded += 1;
        subscription.save
      }
    }
  }

  onLoadServerChanges(payload) {
    let {subscription, records} = payload;
    let p = db.subscription[subscription.key];
    for (let r of records) {
      if (p.records.hasOwnProperty(r.id)) {
        console.log('Already Here');
      } else {
        p.records[r.id] = {data: r};
        p.lastIdCursor = r.id;
        p.lastUpdatedCursor = r.updated_at;
        p.recordCount += 1;
      }
    }
  }

}

module.exports = alt.createStore(OfflineStore);
