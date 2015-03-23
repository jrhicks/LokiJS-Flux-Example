import alt from '../alt';
//import ReplicatedDBActions from './ReplicatedDBActions';

class ReplicatedDBStore {

  constructor() {
    //this.bindActions(ReplicatedDBActions);
  }

  onReportChanges(changes) {
    // Alt notifies subscribed views for us.
  }

}

module.exports = alt.createStore(ReplicatedDBStore);
