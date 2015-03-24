import alt from '../alt';

class ProjectActions {

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

module.exports = alt.createActions(ProjectActions);
