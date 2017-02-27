const MarkovChain = require('markov-ultra').default;
const Rimraf = require('rimraf');

process.on('message', texts => {
  const directory = __dirname + '/markovChain';

  let found = false;

  Rimraf(directory, () => {
    const markov = new MarkovChain(directory);

    texts.forEach(text => {
      markov.learn(text);
    });

    while (!found) {
      const sentence = decodeURI(markov.generate());
      if (
        !(sentence.indexOf('http') > -1 || sentence.indexOf('://') > -1) &&
        !texts.includes(sentence)
      ) {
        found = true;
        process.send(sentence);
      }
    }
  });
});
