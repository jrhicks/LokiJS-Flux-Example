"use strict";
import React from 'react';
import { RouteHandler, Link } from 'react-router';
import OPActions from '../../ops/OPActions';

var AppLayout = React.createClass({
  displayName: 'APP',

  handleSync() {
    OPActions.syncAll();
  },

  render() {
    return (
      <div>
        <h1>Offline Partitioned Stores</h1>
        <button onClick={this.handleSync}>SYNC</button>
        <hr />
        <RouteHandler/>
      </div>
    );
  }

});

module.exports = AppLayout;
