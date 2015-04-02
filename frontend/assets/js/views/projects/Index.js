import React from 'react';
import Router from 'react-router';
var {Link} = Router;

import db from '../../models/Collections';
import ReplicateStore from '../../stores/ReplicateStore';
import jsxHelper from '../../jsxHelper';

//import ReplicatedDBStore from '../../db/ReplicatedDBStore';

var ProjectIndex = React.createClass({
  displayName: 'ProjectIndex',

  getInitialState() {
    return {projects: db.project.data}
  },

  componentDidMount() {
    ReplicateStore.listen(this._onChange);
  },

  componentWillUnmount() {
    ReplicateStore.unlisten(this._onChange);
  },

  _onChange() {
  },

  render() {
    console.log("Project Index Render");
    console.log(this.state.projects);
    return (
        <div>
          <h2>Projects</h2>
          {jsxHelper.if(this.state.projects.length > 0,
            <table>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
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
              </tbody>
            </table>
          ,
          <p>No Projects</p>
          )}
      </div>
    );
  }

});

module.exports = ProjectIndex;
