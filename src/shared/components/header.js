// @flow

import React from 'react';
import { Link } from 'react-router';
import { DomEvent, HandleScroll } from '../utilities/classes/';

export default class extends React.Component {
  state: Object;
  setState: Function;

  componentDidMount() {
    const scrollHandler = new HandleScroll({
      scrollBreak: 200,
      element: 'header.transition__header'
    });
    const scrollEvent = new DomEvent({
      from: window,
      on: 'scroll',
      interval: 500,
      onFire: () => {
        scrollHandler.onScroll();
      },
      onIntervalFire: () => {
        scrollHandler.onScrollInterval();
      }
    });
    this.setState({
      scrollEvent: scrollEvent
    });
  }

  componentWillUnmount() {
    this.state.scrollEvent.destroy();
  }

  renderLink(link: Object, index: number) {
    const linkAttr = link.href.indexOf('http') > -1 ||
      link.href.indexOf('mailto:') > -1
      ? { href: link.href }
      : { to: link.href };
    return (
      <li key={index}>
        <Link {...linkAttr} activeClassName="active">
          {link.name}
        </Link>
      </li>
    );
  }

  renderHeader(attr: Object) {
    return (
      <header {...attr}>
        <nav>
          <ul>
            {this.props.links.map(this.renderLink)}
          </ul>
        </nav>
      </header>
    );
  }

  render() {
    return (
      <div>
        {this.renderHeader({})}
        {this.renderHeader({ className: 'transition__header' })}
      </div>
    );
  }
}
