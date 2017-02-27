// @flow

export const INITIAL_STORE_DATA = 'INITIAL_STORE_DATA';

// only to be used on server
export const setInitialStoreData = (state: Object, props: Object) => {
  if (typeof process === 'undefined') {
    throw new Error('This function is to only be called on the server.');
  }
  return state.dispatch({
    type: INITIAL_STORE_DATA,
    payload: props
  });
};

export const EXAMPLE_ACTION = 'EXAMPLE_ACTION';

export const exampleAction = (props: Object) => (dispatch: Function) => {
  dispatch({
    type: EXAMPLE_ACTION,
    payload: props
  });
};
