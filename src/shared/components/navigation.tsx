import * as React from 'react';
import { Link } from 'react-router';

const links = [
  {
    name: 'About',
    link: '/about'
  },
  {
    name: 'More',
    link: '/more'
  }
]

interface LinkType {  
  name: string,
  link: string
}

const aLink = (link: LinkType, index: number) => {
  return (
    <Link key={index} className="col-xs-6 aLink" activeClassName="aLinkActive" to={link.link}>
      {link.name}
    </Link>
  )
}

export default () => {
  return (
    <div className="containerFluid">
      <div className="aLinkContainer">
        { links.map(aLink) }
        <div className="clear"/>
      </div>
    </div>
  );
};
