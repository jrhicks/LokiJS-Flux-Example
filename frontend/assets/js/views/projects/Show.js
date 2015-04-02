import React from 'react';
import Router from 'react-router';
var {Link} = Router;

import db from '../../models/Collections';
import jsxHelper from '../../jsxHelper';
import ReplicateActions from '../../actions/ReplicateActions';

var ProjectShow = React.createClass({
  displayName: 'ProjectShow',

  mixins: [Router.Navigation, Router.State],

  getInitialState() {
    return {contacts: db.contact.data,
            notes: db.note.data}
  },

  componentWillMount() {
    let params = this.context.router.getCurrentParams()
    let projectId = parseInt(params.projectId);
    ReplicateActions.subscribe('contact', {project_id: projectId})
    ReplicateActions.subscribe('note', {project_id: projectId})
  },

  componentWillUnmount() {
  },

  _onChange() {
    this.setState(
       {
         contacts: db.contact.data,
         notes: db.note.data
       })
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
                  <td>{(db.contact.findOne({id:note.contact_id}) || {}).name}</td>
                  <td>{note.message}</td>
                </tr>)}
             </tbody>
             </table>;
    } else {
      return <p>No Notes</p>;
    }
  },

  render() {
    let notes = this.state.notes.slice(0,50);
    let contacts = this.state.contacts;

    return <div>
      <h2>Project Show</h2>
      {this.noteTable(notes, contacts)}
    </div>;
  }

});

module.exports = ProjectShow;
