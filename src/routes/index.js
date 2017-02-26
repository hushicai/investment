import React from 'react';

import {Route, IndexRoute} from 'react-router';
import AppLayout from '../layouts/App';
import Home from './Home';

import NotFound from './NotFound';

const routes = (
  <Route>
    <Route path="/" component={AppLayout}>
      <IndexRoute components={{main: Home}}></IndexRoute>
    </Route>
    <Route path="*" component={NotFound}></Route>
  </Route>
);

export default routes;
