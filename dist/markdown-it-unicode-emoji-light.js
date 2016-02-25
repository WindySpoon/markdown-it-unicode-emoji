/*! markdown-it-unicode-emoji 0.2.0 https://github.com//makepanic/markdown-it-unicode-emoji @license MIT */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.markdownitEmoji = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "smile": "😄",
  "smiley": "😃",
  "grinning": "😀",
  "blush": "😊",
  "wink": "😉",
  "heart_eyes": "😍",
  "kissing_heart": "😘",
  "kissing_closed_eyes": "😚",
  "kissing": "😗",
  "kissing_smiling_eyes": "😙",
  "stuck_out_tongue_winking_eye": "😜",
  "stuck_out_tongue_closed_eyes": "😝",
  "stuck_out_tongue": "😛",
  "flushed": "😳",
  "grin": "😁",
  "pensive": "😔",
  "relieved": "😌",
  "unamused": "😒",
  "disappointed": "😞",
  "persevere": "😣",
  "cry": "😢",
  "joy": "😂",
  "sob": "😭",
  "sleepy": "😪",
  "disappointed_relieved": "😥",
  "cold_sweat": "😰",
  "sweat_smile": "😅",
  "sweat": "😓",
  "weary": "😩",
  "tired_face": "😫",
  "fearful": "😨",
  "scream": "😱",
  "angry": "😠",
  "rage": "😡",
  "confounded": "😖",
  "laughing": "😆",
  "satisfied": "😆",
  "yum": "😋",
  "mask": "😷",
  "sunglasses": "😎",
  "sleeping": "😴",
  "dizzy_face": "😵",
  "astonished": "😲",
  "worried": "😟",
  "frowning": "😦",
  "anguished": "😧",
  "smiling_imp": "😈",
  "open_mouth": "😮",
  "neutral_face": "😐",
  "confused": "😕",
  "hushed": "😯",
  "no_mouth": "😶",
  "innocent": "😇",
  "smirk": "😏",
  "expressionless": "😑",
  "smiley_cat": "😺",
  "smile_cat": "😸",
  "heart_eyes_cat": "😻",
  "kissing_cat": "😽",
  "smirk_cat": "😼",
  "scream_cat": "🙀",
  "crying_cat_face": "😿",
  "joy_cat": "😹",
  "pouting_cat": "😾",
  "sparkles": "✨",
  "fist": "✊",
  "hand": "✋",
  "raised_hand": "✋",
  "cat": "🐱",
  "mouse": "🐭",
  "cow": "🐮",
  "monkey_face": "🐵",
  "star": "⭐",
  "zap": "⚡",
  "umbrella": "☔",
  "hourglass": "⌛",
  "watch": "⌚",
  "black_joker": "🃏",
  "mahjong": "🀄",
  "coffee": "☕",
  "anchor": "⚓",
  "wheelchair": "♿",
  "negative_squared_cross_mark": "❎",
  "white_check_mark": "✅",
  "loop": "➿",
  "aries": "♈",
  "taurus": "♉",
  "gemini": "♊",
  "cancer": "♋",
  "leo": "♌",
  "virgo": "♍",
  "libra": "♎",
  "scorpius": "♏",
  "sagittarius": "♐",
  "capricorn": "♑",
  "aquarius": "♒",
  "pisces": "♓",
  "x": "❌",
  "exclamation": "❗",
  "heavy_exclamation_mark": "❗",
  "question": "❓",
  "grey_exclamation": "❕",
  "grey_question": "❔",
  "heavy_plus_sign": "➕",
  "heavy_minus_sign": "➖",
  "heavy_division_sign": "➗",
  "curly_loop": "➰",
  "black_medium_small_square": "◾",
  "white_medium_small_square": "◽",
  "black_circle": "⚫",
  "white_circle": "⚪",
  "white_large_square": "⬜",
  "black_large_square": "⬛"
}
},{}],2:[function(require,module,exports){
// Emoticons -> Emoji mapping.
//
// (!) Some patterns skipped, to avoid collisions
// without increase matcher complicity. Than can change in future.
//
// Places to look for more emoticons info:
//
// - http://en.wikipedia.org/wiki/List_of_emoticons#Western
// - https://github.com/wooorm/emoticon/blob/master/Support.md
// - http://factoryjoe.com/projects/emoticons/
//
'use strict';

module.exports = {
  mad:              [ '>:(', '>:-(' ], // angry
  blush:            [ ':")', ':-")' ],
  broken_heart:     [ '</3', '<\\3' ],
  // :\ and :-\ not used because of conflict with markdown escaping
  confused:         [ ':/', ':-/' ], // emojione shows question
  cry:              [ ":'(", ":'-(", ':,(', ':,-(' ],
  frowning:         [ ':(', ':-(' ],
  heart:            [ '<3' ],
  imp:              [ ']:(', ']:-(' ],
  innocent:         [ 'o:)', 'O:)', 'o:-)', 'O:-)', '0:)', '0:-)' ],
  joy:              [ ":')", ":'-)", ':,)', ':,-)', ":'D", ":'-D", ':,D', ':,-D' ],
  kissing:          [ ':*', ':-*' ],
  laughing:         [ 'x-)', 'X-)' ],
  neutral_face:     [ ':|', ':-|' ],
  open_mouth:       [ ':o', ':-o', ':O', ':-O' ],
  rage:             [ ':@', ':-@' ],
  smile:            [ ':D', ':-D' ],
  smiley:           [ ':)', ':-)' ],
  smiling_imp:      [ ']:)', ']:-)' ],
  sob:              [ ":,'(", ":,'-(", ';(', ';-(' ],
  stuck_out_tongue: [ ':P', ':-P' ],
  sunglasses:       [ '8-)', 'B-)' ],
  sweat:            [ ',:(', ',:-(' ],
  sweat_smile:      [ ',:)', ',:-)' ],
  unamused:         [ ':s', ':-S', ':z', ':-Z', ':$', ':-$' ],
  wink:             [ ';)', ';-)' ]
};

},{}],3:[function(require,module,exports){
// Convert input options to more useable format
// and compile search regexp

'use strict';


function quoteRE (str) {
  return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
}


module.exports = function normalize_opts(options) {
  var emojies = options.defs,
      shortcuts;

  // Filter emojies by whitelist, if needed
  if (options.enabled.length) {
    emojies = Object.keys(emojies).reduce(function (acc, key) {
      if (options.enabled.indexOf(key) >= 0) {
        acc[key] = emojies[key];
      }
      return acc;
    }, {});
  }

  // Flatten shortcuts to simple object: { alias: emoji_name }
  shortcuts = Object.keys(options.shortcuts).reduce(function (acc, key) {
    // Skip aliases for filtered emojies, to reduce regexp
    if (!emojies[key]) { return acc; }

    if (Array.isArray(options.shortcuts[key])) {
      options.shortcuts[key].forEach(function (alias) {
        acc[alias] = key;
      });
      return acc;
    }

    acc[options.shortcuts[key]] = key;
    return acc;
  }, {});

  // Compile regexp
  var names = Object.keys(emojies)
                .map(function (name) { return ':' + name + ':'; })
                .concat(Object.keys(shortcuts))
                .sort()
                .reverse()
                .map(function (name) { return quoteRE(name); })
                .join('|');

  var scanRE = RegExp(names, 'g');

  return {
    defs: emojies,
    shortcuts: shortcuts,
    scanRE: scanRE,
    containsUnicodeEmoji: options.containsUnicodeEmoji,
    replaceUnicodeEmojis: options.replaceUnicodeEmojis
  };
};

},{}],4:[function(require,module,exports){
'use strict';

module.exports = function emoji_html(tokens, idx /*, options, env */) {
  return tokens[idx].content;
};

},{}],5:[function(require,module,exports){
// Emojies & shortcuts replacement logic.
//
// Note: In theory, it could be faster to parse :smile: in inline chain and
// leave only shortcuts here. But, who care...
//

'use strict';

function toCodePoint(unicodeSurrogates, sep) {
  /* eslint no-bitwise: 0, yoda: 0 */
  var
    r = [],
    c = 0,
    p = 0,
    i = 0;
  while (i < unicodeSurrogates.length) {
    c = unicodeSurrogates.charCodeAt(i++);
    if (p) {
      r.push((0x10000 + ((p - 0xD800) << 10) + (c - 0xDC00)).toString(16));
      p = 0;
    } else if (0xD800 <= c && c <= 0xDBFF) {
      p = c;
    } else {
      r.push(c.toString(16));
    }
  }
  return r.join(sep || '-');
}

function grabTheRightIcon(icon, variant) {
  // if variant is present as \uFE0F
  return toCodePoint(
    variant === '\uFE0F' ?
      // the icon should not contain it
      icon.slice(0, -1) :
      // fix non standard OSX behavior
      (icon.length === 3 && icon.charAt(1) === '\uFE0F' ?
      icon.charAt(0) + icon.charAt(2) : icon)
  );
}

module.exports = function createRule(md, emojies, shortcuts, compiledRE, containsUnicodeEmoji, replaceUnicodeEmojis) {
  var arrayReplaceAt = md.utils.arrayReplaceAt,
    ucm = md.utils.lib.ucmicro,
    ZPCc = new RegExp([ ucm.Z.source, ucm.P.source, ucm.Cc.source ].join('|'));

  function splitTextToken(text, level, Token) {
    var token,
      lastAliasPos = 0,
      nodes = [],
      nestedNodes;

    // tokenize colons and shortcuts
    text.replace(compiledRE, function (match, offset, src) {
      // Don't allow letters before :/ shortcut.
      if (match === ':/' && offset > 0 && !ZPCc.test(src[offset - 1])) {
        return;
      }

      var emojiName;
      // Validate emoji name
      if (shortcuts.hasOwnProperty(match)) {
        // replace shortcut with full name
        emojiName = shortcuts[match];
      } else {
        emojiName = match.slice(1, -1);
      }

      // Add new tokens to pending list
      if (offset > lastAliasPos) {
        token = new Token('text', '', 0);
        token.content = text.slice(lastAliasPos, offset);
        nodes.push(token);
      }

      token = new Token('emoji', '', 0);
      token.markup = emojiName;
      token.content = emojies[emojiName];
      nodes.push(token);

      lastAliasPos = offset + match.length;
    });

    if (lastAliasPos < text.length) {
      token = new Token('text', '', 0);
      token.content = text.slice(lastAliasPos);
      nodes.push(token);
    }

    // tokenize unicode emojis
    nestedNodes = nodes.map(function (node) {
      if (node.type === 'text') {
        var splitNodes = [],
          lastEmojiPos = 0,
          nodeText = node.content;

        replaceUnicodeEmojis(node.content, function (match, icon, variant, offset/*, src */) {
          var codePoint = grabTheRightIcon(icon, variant);

          // Add new tokens to pending list
          if (offset > lastEmojiPos) {
            token = new Token('text', '', 0);
            token.content = nodeText.slice(lastEmojiPos, offset);
            splitNodes.push(token);
          }

          token = new Token('emoji', '', 0);
          token.markup = codePoint;
          token.content = icon;
          splitNodes.push(token);

          lastEmojiPos = offset + match.length;
        });

        if (lastEmojiPos < nodeText.length) {
          token = new Token('text', '', 0);
          token.content = nodeText.slice(lastEmojiPos);
          splitNodes.push(token);
        }

        return splitNodes;
      }
      return node;
    });

    return [].concat.apply([], nestedNodes);
  }

  return function emojiReplace(state) {
    var i, j, l, tokens, token,
      blockTokens = state.tokens;

    for (j = 0, l = blockTokens.length; j < l; j++) {
      if (blockTokens[j].type !== 'inline') {
        continue;
      }
      tokens = blockTokens[j].children;

      // We scan from the end, to keep position when new tags added.
      // Use reversed logic in links start/end match
      for (i = tokens.length - 1; i >= 0; i--) {
        token = tokens[i];

        if (token.type === 'text') {
          if (compiledRE.test(token.content) || containsUnicodeEmoji(token.content)) {
            // replace current node
            blockTokens[j].children = tokens = arrayReplaceAt(
              tokens, i, splitTextToken(token.content, token.level, state.Token)
            );
          }
        }
      }
    }
  };
};

},{}],6:[function(require,module,exports){
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
  if (emojione) {
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

},{"./lib/data/light.json":1,"./lib/data/shortcuts":2,"./lib/normalize_opts":3,"./lib/render":4,"./lib/replace":5,"emojione":undefined}]},{},[6])(6)
});