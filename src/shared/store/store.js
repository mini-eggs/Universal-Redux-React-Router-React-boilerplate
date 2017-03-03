import { createStore } from 'redux';
import Reducers from '../reducers/reducers';

export default (preloadedState) => {
  return createStore(Reducers, preloadedState);
};
