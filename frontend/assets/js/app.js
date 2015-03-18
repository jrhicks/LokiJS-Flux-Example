import 'babel-core/polyfill';

import React from 'react';
import OPStore from './ops/OPStore';
import OPActions from './ops/OPActions';
import {opSyncPartition, opSyncAll} from './ops/OPSync';

import router from './router';

// Needed to launch App
window.React = React;
window.router = router;

// Nice stuff to have for debuggin
window.OPStore = OPStore;
window.OPActions = OPActions;
window.opSyncPartition = opSyncPartition;
window.opSyncAll = opSyncAll;
