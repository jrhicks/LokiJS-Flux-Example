import alt from '../alt';
import request from 'superagent';

class OPActions {
  ensurePartition(partition) {
    this.dispatch(partition);
  }

  loadServerChange(partition, record) {
    this.dispatch({partition: partition, record:record})
  }
}

module.exports = alt.createActions(OPActions);
