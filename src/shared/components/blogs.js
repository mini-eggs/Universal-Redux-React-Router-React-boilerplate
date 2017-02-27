// @flow

import React from 'react';
import { Link } from 'react-router';
import Background from 'background-image-fade-in';

const item = (item: Object, index: number) => {
  return (
    <Link key={index} to={item.slug}>
      <div key={index} className="single__blog" data-src={item.image}>
        <div className="blog__link__container">
          <div to={item.slug} className="blog__link">
            {item.name}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default class extends React.Component {
  componentDidMount() {
    Background('.single__blog', 250);
  }

  render() {
    return (
      <div className="content__container">
        {this.props.items.map(item)}
      </div>
    );
  }
}
