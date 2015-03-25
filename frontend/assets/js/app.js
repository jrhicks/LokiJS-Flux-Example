import 'babel-core/polyfill';

import React from 'react';
window.React = React;

import router from './router';
window.router = router;

import db from './db/db'
window.db = db;

import ReplicateActions from './actions/ReplicateActions';
window.ReplicateActions = ReplicateActions;

import replicate from './db/replicate';
replicate.run();
