'use strict';

var markdownit = require('markdown-it');
var generate = require('markdown-it-testgen');
var path = require('path');

var emoji = require('..');

describe('replace', function () {
  var md = markdownit().use(emoji);

  generate(path.join(__dirname, 'fixtures/emoji'), { header: true }, md);
});
