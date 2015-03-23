import React from 'react';
import Router from 'react-router';
import db from '../../db/ReplicatedDB';
import helper from '../../helper';

var {Link} = Router;

var ProjectShow = React.createClass({
  displayName: 'ProjectShow',

  mixins: [Router.Navigation, Router.State],

  getInitialState() {
    return {contacts: [], notes: []}
  },

  componentWillMount() {
    let params = this.context.router.getCurrentParams()
    let projectId = parseInt(params.projectId);

    db.note.on('insert', this._onChange);
    db.note.on('update', this._onChange);
    db.note.on('delete', this._onChange);
    db.contact.on('insert', this._onChange);
    db.contact.on('update', this._onChange);
    db.contact.on('delete', this._onChange);
    db.addSubscription('note', {project_id: projectId});
    db.addSubscription('contact', {project_id: projectId});
  },

  componentWillUnmount() {
    db.note.remove('insert', this._onChange);
    db.note.remove('update', this._onChange);
    db.note.remove('delete', this._onChange);
    db.contact.remove('insert', this._onChange);
    db.contact.remove('update', this._onChange);
    db.contact.remove('delete', this._onChange);
  },

  _onChange() {
    this.setState({
      contacts: db.contact.data,
      notes: db.note.data
    });
  },

  noteTable(notes, contacts) {
    if (notes.length > 0) {
      return <table>
              <tr>
                <th>ID</th>
                <th>Contact</th>
                <th>Message</th>
              </tr>
              {notes.map( (note) =>
                <tr key={note.id}>
                  <td>{note.id}</td>
                  <td></td>
                  <td>{note.message}</td>
                </tr>)}
             </table>;
    } else {
      return <p>No Notes</p>;
    }
  },

  render() {
    let notes = this.state.notes;
    let contacts = this.state.contacts;

    return (
      <div>
        <h2>Project Show</h2>
        {this.noteTable(notes, contacts)}
      </div>
    );
  }

});

module.exports = ProjectShow;
