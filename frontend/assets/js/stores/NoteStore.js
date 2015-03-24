import alt from '../alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {

  constructor() {
    this.bindActions(NoteActions);
  }

  onCreate(record) {
  }

  onUpdate(record) {
  }

  onDelete(record) {
  }

}

module.exports = alt.createStore(NoteStore);
