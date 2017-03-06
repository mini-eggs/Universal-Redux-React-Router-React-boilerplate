import * as React from 'react';
import { Link } from 'react-router';
import CustomHeader from './header';
import CustomNavigation from './navigation';

interface Props {
  children: Object
}

export default (props: Props) => {
  return (
    <div>
      <CustomHeader/>
      <div className="clear"/>
      <div className="container">
        <div className="aPage col-xs-12 col-sm-8 col-sm-offset-2">
          <CustomNavigation/>
          <div className="clear"/>
          <div className="aContent">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};
