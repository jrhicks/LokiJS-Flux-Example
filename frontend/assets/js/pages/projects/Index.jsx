import React from 'react';
import {Link} from 'react-router';
import db from '../../offline/LokiDB';
import helper from '../../helper';

import OfflineStore from '../../offline/OfflineStore';

var App = React.createClass({
  displayName: 'ProjectIndex',

  getInitialState() {
    return {projects: []}
  },

  componentDidMount() {
    OfflineStore.listen(this._onChange);
    OfflineActions.subscribe('project', {});
  },

  componentWillUnmount() {
    OfflineStore.unlisten(this._onChange);
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

//        <div style={floatLeft}>
//          <pre>{JSON.stringify(this.state.collections, null, 2)}</pre>
//        </div>
