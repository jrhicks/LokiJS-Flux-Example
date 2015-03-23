import alt from '../alt';
import ReplicatedDBActions from './ReplicatedDBActions';

class ReplicatedDBStore {

  constructor() {
    this.replicationStatus = null;
    this.bindActions(ReplicatedDBActions);
  }

  onUpdate() {
    console.log("ReplicatedDBStore Received Update :)")
  }

}

module.exports = alt.createStore(ReplicatedDBStore);
