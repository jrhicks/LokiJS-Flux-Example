'use strict';

import React from 'react';
import AppLayout from './views/layouts/AppLayout';
import ProjectsIndex from './views/projects/Index';
import ProjectsShow from './views/projects/Show';
import { Route, DefaultRoute } from 'react-router';

export default (
  <Route path='/' handler={AppLayout}>
    <DefaultRoute path='/projects' handler={ProjectsIndex}/>
    <Route name='project' path='/projects/:projectId' handler={ProjectsShow} />
  </Route>
);
