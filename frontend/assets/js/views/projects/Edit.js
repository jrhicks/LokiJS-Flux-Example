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
    return {
      project: {}
    };
  },

  mountState() {
    let params = this.context.router.getCurrentParams();
    let projectId = parseInt(params.projectId);
    let project = db.project.findOne({id: projectId});
    return {project, x};
  },

  componentWillMount() {
    console.log(this.mountState());
    // Values Remain that of getInitialState?
    this.setState(this.mountState());
    console.log(this.state);
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
