// @flow

import 'babel-polyfill';
import Http from 'http';
import Path from 'path';
import Express from 'express';
import Socket from 'socket.io';
import BodyParser from 'body-parser';
import ApiCache from 'apicache';
import { getPortPromise as PortFinder } from 'portfinder';
import Router from './router';
import RestroomRate from './applications/restroomrate/restroomrate';
import TwitterBot, {
  TwitterBotSockets
} from './applications/twitterBot/twitterBot';
import Triangly, {
  TrianglySockets
} from './applications/triangly/triangly';

const app = Express();
const server: Object = Http.createServer(app);
const io = Socket(server);
const jsonParser = BodyParser.json(server);
const cache = ApiCache.middleware;

/**
 * Up max post size
 */
app.use(BodyParser({ limit: '50mb' }));

/**
 * Static files
 */
app.use('/scripts', Express.static(`${__dirname}/../../dist/client/scripts`));
app.use('/styles', Express.static(`${__dirname}/../../dist/client/styles`));

/**
 * Routing per application
 */
RestroomRate(app, jsonParser);
TwitterBot(app, jsonParser);
Triangly(app, jsonParser);

/**
 * Cache routes
 */
app.use(cache('30 minutes'));

/**
 * Socketing per application
 */
io.on('connection', socket => {
  TrianglySockets(socket);
  TwitterBotSockets(socket);
});

/**
 * Main application routing
 * Server side rendering/etc
 */
Router(app);

if (process.env.PORT) {
  server.listen(process.env.PORT);
} else {
  
  const serverHasStarted = port => {
    console.log(`==> 🌎  http://localhost:${port}/`);
  };

  const serverHasNotStarted = err => {
    console.log('Something went wrong while trying to start the server. Error below:');
    console.log(err);
  };

  const startServer = port => {
    return new Promise((resolve, reject) => {
      server.listen(port, err => {
        if (err) {
          reject(err);
        } else {
          resolve(port);
        }
      });
    });
  };

  PortFinder()
    .then(startServer)
    .then(serverHasStarted)
    .catch(serverHasNotStarted);
}
