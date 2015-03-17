import alt from '../alt';
import OPActions from '../actions/OPActions';

class OPStore {

  constructor() {
    this.bindActions(OPActions);
  }

}

module.exports = alt.createStore(OPStore);
