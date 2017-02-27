// @flow

// import CreatePost from './business/createPost/createPost'
import Template from './template/template';

import TwitterBotSockets from './sockets';
export { TwitterBotSockets };

export default (app: Object, parser: Object) => {
  app.get('/twitter-bot', Template);

  app.get('/twitter-bot/info', (req, res) => {
    res.json({ message: 'welcome to Twitter Bot server' });
  });
  // depricated in favor of sockets
  // app.get('/twitter-bot/create-post', parser, CreatePost);
};
