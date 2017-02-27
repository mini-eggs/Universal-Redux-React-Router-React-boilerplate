// @flow

import React from 'react';
import Background from 'background-image-fade-in';

const renderItem = item => {
  return (
    <article className="content__container">
      <header className="item__header" data-src={item.image}>
        <a className="header__inner" href={item.image}>
          <h1>
            {item.name}
          </h1>
        </a>
      </header>
      <p dangerouslySetInnerHTML={{ __html: item.description }} />
    </article>
  );
};

const findItem = (items, find) => {
  let foundItem = false;
  find = decodeURI(find);
  items.forEach(item => {
    if ('/' + item.slug === find || item.slug === find) {
      foundItem = item;
    }
  });
  return foundItem;
};

const propsToState = (props: Object) => {
  return {
    item: findItem(props.items, props.location.pathname)
  };
};

export default class extends React.Component {
  state: Object;
  setState: Function;

  constructor(props: Object) {
    super(props);
    this.state = propsToState(props);
  }

  componentWillReceiveProps(props: Object) {
    // this fixes nasty updates
    // with the background fader
    this.setState({ item: false }, () => {
      this.setState(propsToState(props));
    });
  }

  componentDidMount() {
    if (!this.state.item) {
      this.props.router.push('/');
    } else {
      this.background();
    }
  }

  componentDidUpdate() {
    this.background();
  }

  background() {
    Background('.item__header', 250);
  }

  render() {
    const { item } = this.state;
    return item ? renderItem(item) : <span />;
  }
}
