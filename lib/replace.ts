import type MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";
import type StateCore from "markdown-it/lib/rules_core/state_core.mjs";
import type { Nesting } from "markdown-it/lib/token.mjs";

type TokenConstructor = new (type: string, tag: string, nesting: Nesting) => Token;

// Emojies & shortcuts replacement logic.
//
// Note: In theory, it could be faster to parse :smile: in inline chain and
// leave only shortcuts here. But, who care...
//

export default function create_rule(md: MarkdownIt, emojies: {
  [key: string]: string;
}, shortcuts: {
  [alias: string]: string;
}, scanRE: RegExp, replaceRE: RegExp) {
  const arrayReplaceAt = md.utils.arrayReplaceAt;
  const ucm = md.utils.lib.ucmicro;
  const has = md.utils.has;
  const ZPCc = new RegExp([ucm.Z.source, ucm.P.source, ucm.Cc.source].join('|'));
  const emojies_rev = reverse_object(emojies);

  function splitTextToken(text: string, _level: number, TokenConstructor: TokenConstructor): Token[] {
    let last_pos = 0;
    const nodes: Token[] = [];

    text.replace(replaceRE, (match: string, offset: number, src: string) => {
      let emoji_name: string;
      // Validate emoji name
      if (has(shortcuts, match)) {
        // replace shortcut with full name
        emoji_name = shortcuts[match];

        // Don't allow letters before any shortcut (as in no ":/" in http://)
        if (offset > 0 && !ZPCc.test(src[offset - 1])) {
          return match;
        }

        // Don't allow letters after any shortcut
        if (offset + match.length < src.length && !ZPCc.test(src[offset + match.length])) {
          return match;
        }
      } else if (match[0] === ':' && match[match.length - 1] === ':') {
        // emoji_name specified like :smile:
        emoji_name = match.slice(1, -1);
      } else {
        // replace unicode emoji using canonical name
        emoji_name = emojies_rev[match];
      }

      // Add new tokens to pending list
      if (offset > last_pos) {
        const token = new TokenConstructor('text', '', 0);
        token.content = text.slice(last_pos, offset);
        nodes.push(token);
      }

      const token = new TokenConstructor('emoji', '', 0);
      token.markup = emoji_name;
      token.content = emojies[emoji_name];
      nodes.push(token);

      last_pos = offset + match.length;

      return match;
    })

    if (last_pos < text.length) {
      const token = new TokenConstructor('text', '', 0)
      token.content = text.slice(last_pos)
      nodes.push(token)
    }

    return nodes
  }

  return function emoji_replace(state: StateCore) { // is this the correct state type???
    let token;
    const blockTokens = state.tokens;
    let autolinkLevel = 0;

    for (let j = 0, l = blockTokens.length; j < l; j++) {
      if (blockTokens[j].type !== 'inline') { continue }
      let tokens = blockTokens[j].children;

      if (!tokens) continue;

      // We scan from the end, to keep position when new tags added.
      // Use reversed logic in links start/end match
      for (let i = tokens.length - 1; i >= 0; i--) {
        token = tokens[i];

        if (token.type === 'link_open' || token.type === 'link_close') {
          if (token.info === 'auto') { autolinkLevel -= token.nesting }
        }

        if (token.type === 'text' && autolinkLevel === 0 && scanRE.test(token.content)) {
          // replace current node
          blockTokens[j].children = tokens = arrayReplaceAt(
            tokens, i, splitTextToken(token.content, token.level, state.Token)
          );
        }
      }
    }
  }
};

function reverse_object(obj: { [key: string]: string }): { [key: string]: string } {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [value, key])
  );
}