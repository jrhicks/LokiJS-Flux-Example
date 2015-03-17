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
    OPActions.ensurePartition({key: 'active_projects', entity: 'project', filter: {status: 'active'}});
  },

  _onChange() {
    this.setState({partitions: OPStore.getState() });
  },

  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.state.partitions, null, 2)}</pre>
      </div>
    );
  }

});

module.exports = App;
