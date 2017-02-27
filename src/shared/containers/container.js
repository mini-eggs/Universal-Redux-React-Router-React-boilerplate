// @flow

import React from 'react';
import HeaderContainer from './header';

export default (props: Object) => {
  return (
    <div className="page__wrap">
      <HeaderContainer />
      {props.children}
    </div>
  );
};
