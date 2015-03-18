"use strict";
import React from 'react';
import OPStore from '../../ops/OPStore';
import Router from 'react-router';
import OPActions from '../../ops/OPActions'

var {Link} = Router;

var ProjectShow = React.createClass({
  displayName: 'ProjectShow',

  mixins: [Router.Navigation, Router.State],

  componentWillMount() {
    let projectId = this.getParams().projectId;
    OPActions.ensurePartition({key: `projects/${projectId}/notes`, entity: 'note', filter: {project_id: projectId}} );
    OPActions.ensurePartition({key: `projects/${projectId}/contacts`, entity: 'contact', filter: {project_id: projectId}} );
  },

  _onChange() {
  },

  render() {
    return (
      <div>
        <h2>Project Show</h2>
        <pre>{this.getParams().projectId}</pre>
      </div>
    );
  }

});

module.exports = ProjectShow;
