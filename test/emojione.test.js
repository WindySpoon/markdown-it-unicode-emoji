'use strict';

var markdownit = require('markdown-it');
var generate = require('markdown-it-testgen');
var path = require('path');

var emoji = require('..'),
  emojione = require('emojione');

describe('replace', function () {
  var md = markdownit().use(emoji);

  emojione.imageType = 'svg';
  emojione.imagePathSVG = '/img/';

  md.renderer.rules.emoji = function (token, idx) {
    return emojione.unicodeToImage(token[idx].content);
  };

  generate(path.join(__dirname, 'fixtures/with-emojione'), { header: true }, md);
});
