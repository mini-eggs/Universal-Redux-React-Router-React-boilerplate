// @flow

import React from 'react';
import { Link } from 'react-router';

export default (props: Object) => {
  return (
    <div>
      <header>
        <div>
          <Link to="/">
            Go to placeholder page 1
          </Link>
        </div>
        <div>
          <Link to="/placeholder2">
            Go to placeholder page 2
          </Link>
        </div>
      </header>
      {props.children}
    </div>
  );
};
