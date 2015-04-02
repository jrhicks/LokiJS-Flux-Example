import alt from '../alt';
import db from '../models/Collections';
import agent from 'superagent-promise';

import ReplicateActions from '../actions/ReplicateActions';
import ReplicateStore from '../stores/ReplicateStore';

class ReplicateWorker {

  constructor() {
    ReplicateStore.listen(this.onReplicationChange);

    // Private Variables
    this.countDown = 0;
    this.isRunning = false;
    this.lastPolled = new Date().getTime();

    this.state = {
      shouldReplicate: false,
      pollingInterval: 5000,
      hyperActivity: false,
      loadQueue: [],
    }
  }

  onReplicationChange() {
    this.state = ReplicateStore.getState();
  }

  async run() {
    let resolution = 20; // Check for Sync Opportunities 5 times a second
    if (this.isRunning) {
      throw 'Please only run once at the start of your application.'
    } else {
      this.isRunning = true;

      while (true) {
        this.state = ReplicateStore.getState();
        if (this.state.shouldReplicate) {
          let timePassed = new Date().getTime() - this.lastPolled;
          if ( this.state.hyperActivity || this.timePassed > this.state.pollingInterval)
          {
            console.log("1");
            this.lastPolled = new Date().getTime();
            await this.createReplicateAction();
          } else {
            console.log( timePassed > this.state.pollingInterval);
          }
        }
        await this.milliseconds(resolution);
      }
    }
  }

  async createReplicateAction() {
    if (this.state.loadQueue.length == 0) {
      await this.createQueueActions();
    } else {
      await this.createLoadAction();
      ReplicateActions.checkHyperActivity();
    }
  }

  async createLoadAction() {
    ReplicateActions.load();
  }

  async createQueueActions() {
    for (let s of db.subscription.data) {
      let {availableUpdatesCount, data} = await this.fetchLoad(s);
      let subscriptionId = s.id;
      let collectionName = s.collectionName;
      let createdAt = new Date().getTime();
      if (data.length > 0) {
        ReplicateActions.queue({subscriptionId, collectionName, availableUpdatesCount, createdAt, data});
      }
    }
  }

  async fetchLoad(s) {
    let scope = {
                  collectionName: s.collectionName,
                  filter: s.filter,
                  lastIdCursor: s.lastIdCursor,
                  lastUpdatedCursor: s.lastUpdatedCursor
                };
    let scopeJson = encodeURIComponent(JSON.stringify(scope));
    let url = `/replicated_db/download_updates?scope=${scopeJson}`;
    let response = await agent.get(url).end();
    return JSON.parse(response.text);
    return response
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

module.exports = new ReplicateWorker();
