import alt from '../alt';

class ContactActions {

  load(struct) {
    this.dispatch(struct);
  }

  update(record) {
    this.dispatch(record);
  }

  delete(record) {
    this.dispatch(record);
  }

}

module.exports = alt.createActions(ContactActions);
