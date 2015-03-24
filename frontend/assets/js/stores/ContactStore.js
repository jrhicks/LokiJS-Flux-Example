import alt from '../alt';
import ConactActions from '../actions/ConactActions';
import ReplicateStore from '../stores/ReplicateStore';

class ConactStore {

  constructor() {
    this.bindActions(ConactActions);
  }

  onReplicateIn() {

  }

  onUpdate() {
  }

}

module.exports = alt.createStore(ConactStore);
