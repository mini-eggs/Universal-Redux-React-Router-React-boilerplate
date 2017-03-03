import { INITIAL_STORE_DATA } from '../actions/actions';

export default (state = {}, action) => {
  switch (action.type) {
    case INITIAL_STORE_DATA:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};
