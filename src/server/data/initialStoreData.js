// @flow

import Contentful from 'contentful';
import * as ActionTypes from '../../shared/actions/actions';
const client = Contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESSTOKEN
});

export default () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await client.getEntries();
      let links = [];
      let pages = [];
      let posts = [];
      let secondaryLink = [];

      data.items.forEach(item => {
        const type = item.sys.contentType.sys.id;
        switch (type) {
          case 'tabs':
            links.push(item.fields);
            break;
          case 'page':
            pages.push(item.fields);
            break;
          case 'blogPost':
            posts.push(item.fields);
            break;
          case 'about':
            secondaryLink = secondaryLink.concat(item.fields.links);
            break;
          default:
            break;
        }
      });

      // fix blog posts data
      // fixed to be lol
      posts.sort((a, b) => new Date(a.date) > new Date(b.date) ? -1 : 1);

      // fix links
      links = links.concat(secondaryLink);
      let fixedLinks = [];
      links.forEach(link => {
        fixedLinks.push({
          name: link.name,
          href: typeof link.slug !== 'undefined' ? link.slug : link.url
        });
      });

      resolve({ links: fixedLinks, pages: pages, posts: posts });
    } catch (err) {
      reject(err);
    }
  });
};
