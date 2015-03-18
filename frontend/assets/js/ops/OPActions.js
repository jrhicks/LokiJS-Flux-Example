import alt from '../alt';
import request from 'superagent';

class OPActions {
  ensurePartition(partition) {
    this.dispatch(partition);
  }

  loadServerChanges(partition, records) {
    this.dispatch({partition: partition, records:records})
  }

  syncAll() {
    window.opSyncAll();
  }
}

module.exports = alt.createActions(OPActions);
