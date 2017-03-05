import * as React from 'react';

interface Props {
    data: Object
}

export default (props: Props) => {
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
