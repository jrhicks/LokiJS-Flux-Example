import 'babel-core/polyfill';

import React from 'react';
window.React = React;

import router from './router';
window.router = router;

import collections from './models/Collections'
window.collections = collections;

import ReplicateActions from './actions/ReplicateActions';
window.ReplicateActions = ReplicateActions;

import ReplicateWorker from './workers/ReplicateWorker';
ReplicateWorker.run();
