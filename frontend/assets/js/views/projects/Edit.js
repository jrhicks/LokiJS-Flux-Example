import React from 'react';
import Router from 'react-router';
import t from 'tcomb-form';

import db from '../../models/Collections';
import types from '../../models/Types';
import jsxHelper from '../../jsxHelper';
import ReplicateActions from '../../actions/ReplicateActions';

let Link = Router.Link;
let Form = t.form.Form;

var ProjectEdit = React.createClass({
  displayName: 'ProjectShow',

  mixins: [Router.Navigation, Router.State],

  getState() {
    if (this.isMounted() )
    {
      let params = this.context.router.getCurrentParams();
      let projectId = parseInt(params.projectId);
      let project = db.project.findOne({id: projectId});
      return {project};
    } else {
      let project = {};
      return {project};
    }
  },

  getInitialState() {
    return this.getState();
  },

  componentDidMount() {
    this.setState(this.getState());
  },

  onSave(v) {

  },

  render() {
    return (
      <div>
        <Form ref="form" type={types.projects} value={this.state.project} />
        <button onClick={this.onClick}>Save</button>
      </div>
    )
  }

});

module.exports = ProjectEdit;
