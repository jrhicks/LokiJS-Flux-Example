import alt from '../alt';
import db from './LokiDB';
import agent from 'superagent-promise';

class OfflineActions {
  ensurecollection(collection) {
    this.dispatch(collection);
  }

  async downloadUpdates() {
    for (let subscription of db.subscription.data) {
      this.actions.downloadUpdatesFor(subscription);
    }
  }

  async downloadUpdatesFor(subscription) {
    let i = subscription.lastIdCursor;
    let d = subscription.lastUpdatedCursor;
    do {
      let scope = {
                    collection: subscription.collection,
                    filter: subscription.filter,
                    lastIdCursor: i,
                    lastUpdatedCursor: d
                  };
      let scopeJson = encodeURIComponent(JSON.stringify(scope));
      let url = `/offline/download_updated?scope=${scopeJson}`;
      let response = await agent.get(url).end();
      let data = JSON.parse(response.text);
      this.actions.loadData(subscription, data);
      let lastItem = data[data.length - 1];
      if (lastItem) {
        i = lastItem.id;
        d = lastItem.updated_at;
      }
    } while (data.length > 0)
  }

  loadData(subscription, data) {
    this.dispatch({subscription, data});
  }

  async getUpdateCountsFor(subscription) {
    let i = subscription.lastIdCursor;
    let d = subscription.lastUpdatedCursor;
    let scope = {
                  collection: subscription.collection,
                  filter: subscription.filter,
                  lastIdCursor: i,
                  lastUpdatedCursor: d
                };
    let scopeJson = encodeURIComponent(JSON.stringify(scope));
    let url = `/offline/count_updated?scope=${scopeJson}`;
    let response = await agent.get(url).end();
    let data = JSON.parse(response.text);
    console.log(data);
  }

  subscribe(collection, filter) {
    this.dispatch({collection, filter})
  }

  syncAll() {
    window.opSyncAll();
  }
}

module.exports = alt.createActions(OfflineActions);
