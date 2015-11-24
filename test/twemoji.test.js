'use strict';

var markdownit = require('markdown-it');
var generate = require('markdown-it-testgen');
var path = require('path');

var emoji = require('..'),
  twemoji = require('twemoji');

describe('replace', function () {
  var md = markdownit().use(emoji);

  md.renderer.rules.emoji = function (token, idx) {
    return twemoji.parse(token[idx].content, function(icon, options/*, variant*/) {
      return '/img/' + options.size + '/' + icon + '.png';
    });
  };

  generate(path.join(__dirname, 'fixtures/with-twemoji'), { header: true }, md);
});
