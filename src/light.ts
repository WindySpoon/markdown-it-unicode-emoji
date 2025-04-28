import emojies_defs from "./data/light.json";
import emojies_shortcuts from "./data/shortcuts";
import bare_emoji_plugin from "./bare.js";
import type MarkdownIt from "markdown-it";
import type { EmojiOptions } from "./normalize_opts";

export default function emoji_plugin(md: MarkdownIt, options: EmojiOptions) {
  const defaults: EmojiOptions = {
    defs: emojies_defs,
    shortcuts: emojies_shortcuts,
  }

  const opts = md.utils.assign({}, defaults, options || {})

  bare_emoji_plugin(md, opts)
};
