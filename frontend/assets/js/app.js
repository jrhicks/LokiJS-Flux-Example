import 'babel-core/polyfill';

import React from 'react';
import ReplicatedDBStore from './db/ReplicatedDBStore';
import ReplicatedDBActions from './db/ReplicatedDBActions';
import router from './router';
import ReplicatedDB from './db/ReplicatedDB'

window.React = React;
window.router = router;
window.ReplicatedDB = ReplicatedDB;
window.ReplicatedDBStore = ReplicatedDBStore;
window.ReplicatedDBActions = ReplicatedDBActions;
