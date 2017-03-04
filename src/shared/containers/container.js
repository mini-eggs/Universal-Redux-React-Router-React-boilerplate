import * as React from 'react';
import { Link } from 'react-router';

export default (props) => {
  return (
    <div>
      <header>
        <Link to="/">
          Go to placeholder page 1
        </Link>
        <br />
        <Link to="/placeholder2">
          Go to placeholder page 2
        </Link>
        <br />
        <br />
      </header>
      {props.children}
    </div>
  );
};
