// @flow

import React from 'react';
import {
  Router,
  Route,
  browserHistory,
  IndexRedirect,
  IndexRoute
} from 'react-router';
import Item from '../containers/item';
import Blogs from '../containers/blogs';
import Container from '../containers/container';

const handleRouteChange = () => {
  window.scrollTo(0, 0);
};

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Container} onChange={handleRouteChange}>
      <IndexRedirect to="/home" />
      <Route path="/blog" component={Blogs} />
      <Route path="/:item" component={Item} />
    </Route>
    <Route path="*">
      <IndexRedirect to="/" />
    </Route>
  </Router>
);

export default (props: Object) => {
  return routes;
};
