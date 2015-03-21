import alt from '../alt';
import ReplicatedDBActions from './db/ReplicatedDBActions';

class ReplicatedDBStore {

  constructor() {
    this.bindActions(ReplicatedDBActions);
  }

  onReportChanges(changes) {
    // Alt notifies subscribed views for us.
  }

}

module.exports = new ReplicatedDBStore();
