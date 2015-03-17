"use strict";
import React from 'react';
import OPStore from '../stores/OPStore';
import OPActions from '../actions/OPActions'

var App = React.createClass({
  displayName: 'FeatureSetEditMap',

  getInitialState() {
    return {};
  },

  propTypes: {
    featureSetId: React.PropTypes.number.isRequired
  },

  componentWillMount() {
    OPStore.listen(this._onChange);
  },

  _onChange(store) {
    console.log("Store Changed");
  },

  render() {
    return (
      <div>
        <h2>Hello World</h2>
      </div>
    );
  }

});

module.exports = App;
