import * as _ from 'lodash';
import Rimraf from 'rimraf';
import ChildProcess from 'child_process';

export default texts => {
  return new Promise((resolve, reject) => {
    const aChild = ChildProcess.fork(`${__dirname}/getMarkovChainChild.js`);

    aChild.on('message', sentence => {
      resolve(sentence);
    });

    aChild.send(_.shuffle(texts));
  });
};
