import * as React from 'react';

export default (props) => {
  return (
    <div>
      <h1>
        Placeholder page 1
      </h1>
      <div>
        Message from initial store:
        &gt; "{props.data}"
      </div>
    </div>
  );
};
