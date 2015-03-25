import NoteActions from './actions/NoteActions';
import ProjectActions from './actions/ProjectActions';
import ContactActions from './actions/ContactActions';
import ReplicateActions from './actions/ReplicateActions';

let Actions = {
  contact: ContactActions,
  note: NoteActions,
  project: ProjectActions,
  replicate: ReplicateActions,
}

module.exports = Actions;
