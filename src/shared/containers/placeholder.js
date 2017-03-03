import React from 'react';
import { connect } from 'react-redux';
import Placeholder from '../components/placeholder';

const getProps = state => {
  return {
    data: state.InitialReducer.data
  };
};

export default connect(getProps)(Placeholder);
