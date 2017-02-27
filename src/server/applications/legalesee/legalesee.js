// @flow

import LegaleseeSockets from './sockets';
import Read from './business/read/read';

export { LegaleseeSockets };

export default (app: Object, parser: Object) => {
  app.all('/legalesee', (req, res) => {
    res.json({ message: 'welcome to legalesee server' });
  });

  app.post('/legalesee/read', parser, Read);
};
