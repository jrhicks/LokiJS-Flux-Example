import alt from '../alt';

class NoteActions {

  load(struct) {
    this.dispatch(struct);
  }

  create(record) {
    this.dipatch(record);
  }
  
  update(record) {
    this.dispatch(record);
  }

  delete(record) {
    this.dispatch(record);
  }

}

module.exports = alt.createActions(NoteActions);
