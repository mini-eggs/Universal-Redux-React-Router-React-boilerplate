// @flow

import Triangulate from './business/triangulate/triangulate';

export default (app: Object, parser: Object) => {
  app.all('/triangly', (req, res) => {
    res.json({ message: 'welcome to triangly server' });
  });

  app.post('/triangly/triangulate', parser, Triangulate);
};
