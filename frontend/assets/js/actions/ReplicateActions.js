import alt from '../alt';

class ReplicateActions {

  queue(load) {
    this.dispatch(load);
  }

  load() {
    this.dispatch();
  }

  checkHyperActivity() {
    this.dispatch();
  }

  subscribe(collectionName, filter) {
    this.dispatch({collectionName, filter});
  }

  stop() {
    this.dispatch();
  }

  start() {
    this.dispatch();
  }

}

module.exports = alt.createActions(ReplicateActions);
