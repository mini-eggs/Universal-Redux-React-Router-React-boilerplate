'use strict';

var MarkovChain = require('markov-ultra').default;
var Rimraf = require('rimraf');

process.on('message', function (texts) {
  var directory = __dirname + '/markovChain';

  var found = false;

  Rimraf(directory, function () {
    var markov = new MarkovChain(directory);

    texts.forEach(function (text) {
      markov.learn(text);
    });

    while (!found) {
      var sentence = decodeURI(markov.generate());
      if (!(sentence.indexOf('http') > -1 || sentence.indexOf('://') > -1) && !texts.includes(sentence)) {
        found = true;
        process.send(sentence);
      }
    }
  });
});