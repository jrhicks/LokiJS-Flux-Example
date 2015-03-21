import React from 'react';
import {Link, RouteHandler} from 'react-router';
import db from '../../db/ReplicatedDB';
import helper from '../../helper';

var AppLayout = React.createClass({
  displayName: 'APP',

  getInitialState() {
    return {subscriptions: []}
  },

  // TODO FIX
  componentDidMount() {
    ReplicatedDBStore.listen(this._onChange);
  },

  componentWillUnmount() {
    ReplicatedDBStore.unlisten(this._onChange);
  },

  _onChange() {
    this.setState({subscriptions: db.subscription.data});
  },

  subscriptionsTable() {
    let records = this.state.subscriptions;
    if (records && records.length > 0) {
      return (
      <table>
        <tr>
          <th>Collection</th>
          <th>Filter</th>
        </tr>
        {records.map((p)=>
          <tr key={p.id}>
            <td>{p.collection}</td>
            <td>{JSON.stringify(p.filter,null,2)}</td>
            <td>{p.recordsDownloaded}</td>
          </tr>
        )}
      </table> )
    } else {
      return <span>No subscriptions</span>
    }
  },

  render() {
    return (
      <div>
        <h1>Example-Flux-App-With-Offline-Stores</h1>
        <button onClick={db.syncStart}>SYNC Start</button>
        <button onClick={db.syncStop}>SYNC Stop</button>
        <hr />
        {this.subscriptionsTable()}
        <hr />
        <RouteHandler/>
      </div>
    );
  }

});

module.exports = AppLayout;
