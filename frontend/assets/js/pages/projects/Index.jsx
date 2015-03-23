import React from 'react';
import {Link} from 'react-router';
import db from '../../db/ReplicatedDB';
import helper from '../../helper';

//import ReplicatedDBStore from '../../db/ReplicatedDBStore';

var App = React.createClass({
  displayName: 'ProjectIndex',

  getInitialState() {
    return {projects: []}
  },

  componentDidMount() {
    db.project.on('insert', this._onChange);
    db.project.on('update', this._onChange);
    db.project.on('delete', this._onChange);
    db.addSubscription('project', {});
  },

  componentWillUnmount() {
    //db.project.remove('insert', this._onChange);
    //db.project.remove('update', this._onChange);
    //db.project.remove('delete', this._onChange);
  },

  _onChange() {
    this.setState({projects: db.project.data});
  },

  render() {
    return (
        <div>
          <h2>Projects</h2>
          {helper.if(this.state.projects.length > 0,
            <table>
              <tr>
                <th>Project Name</th>
                <th>City</th>
                <th>State</th>
                <th>Status</th>
              </tr>
              {this.state.projects.map( (project) =>
                <tr key={project.id}>
                  <td>
                    <Link to="project" params={{projectId: project.id}}>
                      {project.name}
                    </Link>
                  </td>
                  <td>{project.city}</td>
                  <td>{project.state}</td>
                  <td>{project.status}</td>
                </tr>)}
            </table>
          ,
          <p>No Projects</p>
          )}
      </div>
    );
  }

});

module.exports = App;
