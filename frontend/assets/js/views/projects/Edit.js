import React from 'react';
import Router from 'react-router';
var {Link} = Router;
import t from 'tcomb-form';

import db from '../../models/Collections';
import types from '../../models/Types';
import jsxHelper from '../../jsxHelper';
import ReplicateActions from '../../actions/ReplicateActions';

let Form = t.form.Form;

var ProjectEdit = React.createClass({
  displayName: 'ProjectShow',

  mixins: [Router.Navigation, Router.State],

  getInitialState() {
    return {};
  },

  componentWillMount() {
    let params = this.context.router.getCurrentParams()
  },

  componentWillUnmount() {
  },

  _onChange() {
  },

  onClick() {
    alert("SAVE!");
  },

  render() {
    return (
      <div>
        <Form ref="form" type={types.projects} />
        <button onClick={this.onClick}>Save</button>
      </div>
    )
  }

});

module.exports = ProjectEdit;
