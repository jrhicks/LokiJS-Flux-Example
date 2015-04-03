import React from 'react';
import Router from 'react-router';
var {Link} = Router;

import db from '../../models/Collections';
import jsxHelper from '../../jsxHelper';
import ReplicateActions from '../../actions/ReplicateActions';
import ReplicateStore from '../../stores/ReplicateStore';

var ProjectShow = React.createClass({
  displayName: 'ProjectShow',

  mixins: [Router.Navigation, Router.State],

  getState() {
    if (this.isMounted() )
    {
      let params = this.context.router.getCurrentParams();
      let projectId = parseInt(params.projectId);
      let project = db.project.findOne({id: projectId});

      let notes = db.note.chain()
                  .find({project_id: projectId})
                  .simplesort('message')
                  .limit(100)
                  .data();

      let contactsData = db.contact.chain()
                  .find({project_id: projectId})
                  .data();

      let contacts = {};
      for (let c of contactsData) {
        contacts[c.id] = c;
      }

    } else {
      let project = {};
      let notes = [];
      let contacts = {};
    }
    return {project, notes, contacts};
  },

  getInitialState() {
    return this.getState();
  },

  componentDidMount() {
    let params = this.context.router.getCurrentParams();
    let projectId = parseInt(params.projectId);
    ReplicateActions.subscribe('note', {project_id: projectId });
    ReplicateActions.subscribe('contact', {project_id: projectId });
    ReplicateStore.listen(this.onStoreUpdate);
    this.setState(this.getState());
  },

  componentWillUnmount() {
    ReplicateStore.unlisten(this._onChange);
  },

  onStoreUpdate() {
    this.setState(this.getState());
  },

  noteTable(notes, contacts) {
    if (notes.length > 0) {
      return <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Contact</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
              {notes.map( (note) =>
                <tr key={note.id}>
                  <td>{note.id}</td>
                  <td>{(contacts[note.contact_id] || {}).name}</td>
                  <td>{note.message}</td>
                </tr>)}
             </tbody>
             </table>;
    } else {
      return <p>No Notes</p>;
    }
  },

  render() {
    let {notes, contacts} = this.state;

    return <div>
      <h2>Project Show</h2>
      {this.noteTable(notes, contacts)}
    </div>;
  }

});

module.exports = ProjectShow;
