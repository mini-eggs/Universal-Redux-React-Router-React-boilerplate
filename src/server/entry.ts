import * as Http from 'http';
import * as Path from 'path';
import * as Express from 'express';
import { getPortPromise as PortFinder } from 'portfinder';
import Router from './router';

if (process.env.NODE_ENV === 'production') {
  process.env.PORT = 8888
}

const app = Express();
const server = Http.createServer(app);

app.use(
  '/scripts',
  Express.static(Path.join(__dirname, '..', '..', 'dist', 'client', 'scripts'))
);
app.use(
  '/styles',
  Express.static(Path.join(__dirname, '..', '..', 'dist', 'client', 'styles'))
);

Router(app);

if (process.env.PORT) {
  server.listen(process.env.PORT);
} else {
  const serverHasStarted = port => {
    console.log(
      `==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`
    );
  };

  const serverHasNotStarted = err => {
    console.log(
      'Something went wrong while trying to start the server. Error below:'
    );
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
