import React from 'react';
import Router from 'react-router';
var {Link, RouteHandler} = Router;

import ReplicateStore from '../../stores/ReplicateStore';
import ReplicateActions from '../../actions/ReplicateActions';
import db from '../../models/Collections';
import jsxHelper from '../../jsxHelper';

var AppLayout = React.createClass({
  displayName: 'APP',

  getState() {
    let replicate = ReplicateStore.getState();

    return {replicate};
  },

  getInitialState() {
    return this.getState();
  },

  componentDidMount() {
    ReplicateStore.listen(this.onStoreUpdate);
  },

  componentWillUnmount() {
    ReplicateStore.unlisten(this.onStoreUpdate);
  },

  onStoreUpdate() {
    this.setState(this.getState());
  },

  render() {
    return (
      <div>
        <h1>LokiJS Flux</h1>
        <p>
        <Link to="projects">Projects</Link> |
        <Link to="replicate">Replicate</Link>
        </p>
        {jsxHelper.if(this.state.replicate.shouldReplicate,
          <button onClick={ReplicateActions.stop}>SYNC Stop</button>,
          <button onClick={ReplicateActions.start}>SYNC Start</button>
         )}
        <RouteHandler/>
      </div>
    );
  }

});

module.exports = AppLayout;
