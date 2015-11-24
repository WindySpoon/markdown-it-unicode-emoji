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
