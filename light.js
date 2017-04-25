'use strict';

var emojiesDefs = require('./lib/data/light.json'),
  emojiesShortcuts = require('./lib/data/shortcuts'),
  emojiHtml = require('./lib/render'),
  emojiReplace = require('./lib/replace'),
  normalizeOpts = require('./lib/normalize_opts');

var emojiOneInstance;
// allow not to have emojione installed
try {
  emojiOneInstance = require('emojione');
} catch (e) {
  /* eslint no-undef: 0, block-scoped-var: 0 */
  if (typeof emojione !== 'undefined') {
    emojiOneInstance = emojione;
  }
}

module.exports = function emojiPlugin(md, options) {
  options = options || {};
  var defaults = {
    defs: emojiesDefs,
    shortcuts: emojiesShortcuts,
    enabled: [],
    containsUnicodeEmoji: options.containsUnicodeEmoji ? options.containsUnicodeEmoji : function (text) {
      return emojiOneInstance.regUnicode.test(text);
    },
    replaceUnicodeEmojis: options.replaceUnicodeEmojis ? options.replaceUnicodeEmojis : function (text, replacer) {
      return text.replace(emojiOneInstance.regUnicode, replacer);
    }
  };

  var opts = normalizeOpts(md.utils.assign({}, defaults, options || {}));

  md.renderer.rules.emoji = emojiHtml;

  md.core.ruler.push('emoji', emojiReplace(md, opts.defs, opts.shortcuts, opts.scanRE,
    opts.containsUnicodeEmoji, opts.replaceUnicodeEmojis));
};
