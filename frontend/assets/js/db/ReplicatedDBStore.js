import alt from '../alt';
import ReplicatedDBActions from './ReplicatedDBActions';

class ReplicatedDBStore {

  constructor() {
    this.lastUpdated = new Date().getTime();
    this.bindActions(ReplicatedDBActions);
  }

  onUpdate() {
    this.lastUpdated = new Date().getTime();
  }

}

module.exports = alt.createStore(ReplicatedDBStore);
