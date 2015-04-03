'use strict';

import React from 'react';
import AppLayout from './views/layouts/AppLayout';
import ProjectsIndex from './views/projects/Index';
import ProjectsShow from './views/projects/Show';
import ProjectsEdit from './views/projects/Edit';
import ReplicateShow from './views/replicate/Show';

import { Route, DefaultRoute } from 'react-router';

export default (
  <Route path='/' handler={AppLayout}>
    <DefaultRoute name='projects' path='/projects' handler={ProjectsIndex}/>
    <Route name='project' path='/projects/:projectId' handler={ProjectsShow} />
    <Route name="projectEdit" path='/projects/:projectId/edit' handler={ProjectsEdit} />
    <Route name="replicate" path='/replicate' handler={ReplicateShow} />
  </Route>
);
