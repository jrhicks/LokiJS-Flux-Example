import React from 'react';
import Router from 'react-router';
var {Link, RouteHandler} = Router;

import ReplicateStore from '../../stores/ReplicateStore';
import ReplicateActions from '../../actions/ReplicateActions';
import db from '../../db/db';
import jsxHelper from '../../jsxHelper';

var AppLayout = React.createClass({
  displayName: 'APP',

  getInitialState() {
    return {
      replicate: ReplicateStore.getState(),
      subscriptions: db.subscription.data
    }
  },

  componentWillMount() {
    ReplicateStore.listen(this._onChange);
    ReplicateActions.subscribe('project', {});
  },

  componentWillUnmount() {
    ReplicateStore.unlisten(this._onChange);
  },

  _onChange() {
    this.setState({
      replicate: ReplicateStore.getState(),
      subscriptions: db.subscription.data
    })
  },

  queueTable(ts, cs) {
    let records = this.state.replicate.loadQueue;
    if (records && records.length > 0) {
      return (
      <table style={ts}>
        <thead>
        <tr>
          <th style={cs}>Collection</th>
          <th style={cs}>Data</th>
          <th style={cs}>CreatedAt</th>
        </tr>
        </thead>
        <tbody>
        {records.map((p)=>
          <tr style={cs} key={p.id}>
            <td style={cs}>{p.collectionName}</td>
            <td style={cs} >{p.data.length}</td>
            <td style={cs} >{p.createdAt}</td>
          </tr>
        )}
      </tbody>
      </table> )
    } else {
      return <span>Nothing in Queue</span>
    }
  },

  subscriptionsTable(ts, cs) {
    let records = this.state.subscriptions;
    if (records && records.length > 0) {
      return (
      <table style={ts}>
        <thead>
          <tr>
            <th style={cs}>Collection</th>
            <th style={cs}>Filter</th>
            <th style={cs}>recordsToDownload</th>
            <th style={cs}>lastIdCursor</th>
            <th style={cs}>lastUpdatedCursor</th>
          </tr>
        </thead>
        <tbody>
          {records.map((p)=>
            <tr key={p.id}>
              <td style={cs}>{p.collectionName}</td>
              <td style={cs}>{JSON.stringify(p.filter,null,2)}</td>
              <td style={cs}>{p.recordsToDownload}</td>
              <td style={cs}>{p.lastIdCursor}</td>
              <td style={cs}>{p.lastUpdatedCursor}</td>
            </tr>
          )}
        </tbody>
      </table> )
    } else {
      return <span>No subscriptions</span>
    }
  },

  render() {
    let ts = {borderCollapse: 'collapse'};
    let cs = {border: '1px solid grey', padding: '5px'};
    return (
      <div>
        <h1>LokiJS Flux</h1>
        {jsxHelper.if(this.state.replicate.shouldReplicate,
          <button onClick={ReplicateActions.stop}>SYNC Stop</button>,
          <button onClick={ReplicateActions.start}>SYNC Start</button>
         )}

        <hr />
        <h2>Replicate Store</h2>
        shouldReplicate: {JSON.stringify(this.state.replicate.shouldReplicate)} <br />
        loadQueue: {this.state.replicate.loadQueue.length} <br />
        subscriptions: {this.state.subscriptions.length} <br />
        <h3>Subscriptions</h3>
        {this.subscriptionsTable(ts,cs)}
        <h3>Load Queue</h3>
        {this.queueTable(ts,cs)}
        <hr />
        <RouteHandler/>
      </div>
    );
  }

});

module.exports = AppLayout;
