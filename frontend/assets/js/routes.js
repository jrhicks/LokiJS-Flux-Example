'use strict';

import React from 'react';
import AppLayout from './pages/layouts/AppLayout';
import ProjectsIndex from './pages/projects/Index';
import ProjectsShow from './pages/projects/Show';
import { Route, DefaultRoute } from 'react-router';

export default (
  <Route path='/' handler={AppLayout}>
    <DefaultRoute path='/projects' handler={ProjectsIndex}/>
    <Route name='project' path='/projects/:projectId' handler={ProjectsShow} />
  </Route>
);
