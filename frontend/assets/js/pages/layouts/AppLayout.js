import React from 'react';
import {Link, RouteHandler} from 'react-router';
import db from '../../db/ReplicatedDB'
import ReplicatedDBStore from '../../db/ReplicatedDBStore';
import helper from '../../helper';

var AppLayout = React.createClass({
  displayName: 'APP',

  getInitialState() {
    return {
      syncStatus: 'stopped',
      subscriptions: []
      }
  },

  componentWillMount() {
    db.subscription.on('insert', this._onChange);
    db.subscription.on('update', this._onChange);
    ReplicatedDBStore.listen(this._onChange);
  },

  componentWillUnmount() {
    ReplicatedDBStore.unlisten(this._onChange);
  },

  _onChange() {
    this.setState({
      syncStatus: ReplicatedDBStore.syncStatus,
      subscriptions: db.subscription.data
    });
  },

  startReplication() {
    db.startReplication();
  },

  stopReplication() {
    db.stopReplication();
  },

  subscriptionsTable() {
    let records = this.state.subscriptions;
    if (records && records.length > 0) {
      return (
      <table>
        <tr>
          <th>Collection</th>
          <th>Filter</th>
          <th>recordsToDownload</th>
          <th>lastIdCursor</th>
        </tr>
        {records.map((p)=>
          <tr key={p.id}>
            <td>{p.collectionName}</td>
            <td>{JSON.stringify(p.filter,null,2)}</td>
            <td>{p.recordsToDownload}</td>
            <td>{p.lastIdCursor}</td>
          </tr>
        )}
      </table> )
    } else {
      return <span>No subscriptions</span>
    }
  },

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Example-Flux-App-With-Offline-Stores</h1>
        <button onClick={this.startReplication}>SYNC Start</button>
        <button onClick={this.stopReplication}>SYNC Stop</button>
        <hr />
        {this.subscriptionsTable()}
        <hr />
        <RouteHandler/>
      </div>
    );
  }

});

module.exports = AppLayout;
