"use strict";
import React from 'react';
import OPStore from '../../ops/OPStore';
import {Link} from 'react-router';

var App = React.createClass({
  displayName: 'ProjectIndex',

  getInitialState() {
    return {partitions: {}};
  },

  componentWillMount() {
    OPStore.listen(this._onChange);
    OPActions.ensurePartition({key: 'projects', entity: 'project', filter: {}});
  },

  componentWillUnmount() {
    OPStore.unlisten(this._onChange);
  },

  _onChange() {
    this.setState(OPStore.getState());
  },

  projectTable() {
    let records = OPStore.allRecords('projects');
    if (records.length > 0) {
      return <table>
              <tr>
                <th>Project Name</th>
                <th>City</th>
                <th>State</th>
                <th>Status</th>
              </tr>
              {records.map( (record) =>
                <tr key={record.data.id}>
                  <td>
                    <Link to="project" params={{projectId: record.data.id}}>
                      {record.data.name}
                    </Link>
                  </td>
                  <td>{record.data.city}</td>
                  <td>{record.data.state}</td>
                  <td>{record.data.status}</td>
                </tr>)}
             </table>;
    } else {
      return <p>No Projects</p>;
    }
  },

  render() {
    return (
      <div>
        <div>
          <h2>Projects</h2>
          {this.projectTable()}
        </div>
      </div>
    );
  }

});

module.exports = App;

//        <div style={floatLeft}>
//          <pre>{JSON.stringify(this.state.partitions, null, 2)}</pre>
//        </div>
