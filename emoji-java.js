'use strict';

var emojiesDefs = require('./lib/data/emoji-java.json'),
  emojiHtml = require('./lib/render'),
  emojiReplace = require('./lib/replace'),
  normalizeOpts = require('./lib/normalize_opts');

var twemojiInstance;
// allow not to have twemoji installed
try {
  twemojiInstance = require('twemoji');
} catch (e) {
  /* eslint no-undef: 0, block-scoped-var: 0 */
  if (twemoji) {
    twemojiInstance = twemoji;
  }
}

module.exports = function emojiPlugin(md, options) {
  options = options || {};
  var defaults = {
    defs: emojiesDefs,
    shortcuts: {},
    enabled: [],
    containsUnicodeEmoji: options.containsUnicodeEmoji ? options.containsUnicodeEmoji : function (text) {
      return twemojiInstance.test(text);
    },
    replaceUnicodeEmojis: options.replaceUnicodeEmojis ? options.replaceUnicodeEmojis : function (text, replacer) {
      return twemojiInstance.replace(text, replacer);
    }
  };

  var opts = normalizeOpts(md.utils.assign({}, defaults, options || {}));

  md.renderer.rules.emoji = emojiHtml;

  md.core.ruler.push('emoji', emojiReplace(md, opts.defs, opts.shortcuts, opts.scanRE,
    opts.containsUnicodeEmoji, opts.replaceUnicodeEmojis));
};
