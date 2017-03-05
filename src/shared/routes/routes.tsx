import * as React from 'react';
import {
  Router,
  Route,
  browserHistory,
  IndexRedirect,
  IndexRoute
} from 'react-router';
import Placeholder from '../containers/placeholder';
import PlaceholderTwo from '../containers/placeholder2';
import Container from '../components/container';

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Container}>
      <IndexRedirect to="/about" />
      <Route path="/about" component={Placeholder} />
      <Route path="/more" component={PlaceholderTwo} />
    </Route>
    <Route path="*">
      <IndexRedirect to="/" />
    </Route>
  </Router>
);

export default (props) => {
  return routes;
};
