import 'babel-core/polyfill';

import React from 'react';
window.React = React;

import ReplicatedDBStore from './db/ReplicatedDBStore';
window.ReplicatedDBStore = ReplicatedDBStore;

import ReplicatedDBActions from './db/ReplicatedDBActions';
window.ReplicatedDBActions = ReplicatedDBActions;

import router from './router';
window.router = router;

import db from './db/ReplicatedDB'
// Just run once :)
db.run();
window.db = db;
