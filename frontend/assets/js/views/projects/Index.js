import React from 'react';
import Router from 'react-router';

import db from '../../models/Collections';
import ReplicateStore from '../../stores/ReplicateStore';
import ReplicateActions from '../../actions/ReplicateActions';
import jsxHelper from '../../jsxHelper';

let {Link} = Router;

var ProjectIndex = React.createClass({
  displayName: 'ProjectIndex',

  getState() {
    if (this.isMounted() )
    {
      var projects = db.project.data;
    } else {
      var projects = [];
    }

    return {projects};
  },

  getInitialState() {
    return this.getState();
  },

  componentDidMount() {
    ReplicateStore.listen(this.onStoreUpdate);
    ReplicateActions.subscribe('project', {});
  },

  componentWillUnmount() {
    ReplicateStore.unlisten(this.onStoreUpdate);
  },

  onStoreUpdate() {
    this.setState(this.getState());
  },

  render() {
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
                  <th></th>
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
                    <td>
                      <Link to="projectEdit" params={{projectId: project.id}}>
                        edit
                      </Link>
                    </td>
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
