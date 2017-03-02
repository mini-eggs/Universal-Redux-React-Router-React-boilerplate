// @flow

import React from 'react';

export default (props: Object) => {
  return (
    <div>
      <h1>
        Placeholder page 1
      </h1>
      <div>
        Message from initial store:
      </div>
      <div>
        {props.data}
      </div>
    </div>
  );
};
