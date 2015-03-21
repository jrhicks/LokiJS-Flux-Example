import alt from '../alt';

class ReplicatedDBActions {
  reportChanges(changes) {
    this.dispatch(changes);
  }
}

module.exports = alt.createActions(ReplicatedDBActions);
