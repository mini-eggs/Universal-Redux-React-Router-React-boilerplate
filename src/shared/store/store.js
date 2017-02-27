// @flow

import { createStore } from 'redux';
import Reducers from '../reducers/reducers';

export default (preloadedState: Object) => {
  return createStore(Reducers, preloadedState);
};
