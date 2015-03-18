"use strict";
import React from 'react';
import OPStore from '../ops/OPStore';
import OPActions from '../ops/OPActions'

var App = React.createClass({
  displayName: 'Application',

  getInitialState() {
    return {partitions: {}};
  },

  componentWillMount() {
    OPStore.listen(this._onChange);
    OPActions.ensurePartition({key: 'active_projects', entity: 'project', filter: {status: 'Active'}});
  },

  _onChange() {
    this.setState(OPStore.getState());
  },

  handleSync() {
    OPActions.syncAll();
  },


  projectTable() {
    let records = OPStore.allRecords('active_projects');
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
                  <td>{record.data.name}</td>
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
    var floatLeft = {width: '50%',float: 'left'};
    return (
      <div>
        <div style={floatLeft}>
          <h2>Projects</h2>
          <button onClick={this.handleSync}>SYNC</button>
          <hr/>
          {this.projectTable()}
        </div>
        <div style={floatLeft}>
          <pre>{JSON.stringify(this.state.partitions, null, 2)}</pre>
        </div>
      </div>
    );
  }

});

module.exports = App;
