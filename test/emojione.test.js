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

  var FITZPATRICK_SCALE = [
    '\u{1F3FB}',
    '\u{1F3FC}',
    '\u{1F3FD}',
    '\u{1F3FE}',
    '\u{1F3FF}'
  ];
  md.renderer.rules.emoji = function (token, idx) {
    var value;
    if (FITZPATRICK_SCALE.indexOf(token[idx].content) === -1) {
      var nextToken = token[idx + 1],
        content = token[idx].content;

      if (nextToken && FITZPATRICK_SCALE.indexOf(nextToken.content) !== -1) {
        content += nextToken.content;
      }

      value = emojione.unicodeToImage(content);
    } else {
      value = '';
    }
    return value;
  };

  generate(path.join(__dirname, 'fixtures/with-emojione'), { header: true }, md);
});
