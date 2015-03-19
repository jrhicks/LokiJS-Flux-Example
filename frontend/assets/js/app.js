import 'babel-core/polyfill';

import React from 'react';
import OfflineStore from './offline/OfflineStore';
import OfflineActions from './offline/OfflineActions';
import router from './router';

window.React = React;
window.router = router;
window.OfflineStore = OfflineStore;
window.OfflineActions = OfflineActions;
