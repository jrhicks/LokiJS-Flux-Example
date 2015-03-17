import 'babel-core/polyfill';

import React from 'react';
import OPStore from './stores/OPStore';
import OPActions from './actions/OPActions';
import App from './components/App';

window.React = React;
window.OPStore = OPStore;
window.OPActions = OPActions;
window.APP = App;
