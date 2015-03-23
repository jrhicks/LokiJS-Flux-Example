import alt from '../alt';

class ReplicatedDBActions {

  update() {
    this.dispatch();
  }

}

module.exports = alt.createActions(ReplicatedDBActions);
