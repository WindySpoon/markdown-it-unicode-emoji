import emoji_html from './render';
import emoji_replace from './replace';
import normalize_opts, { type EmojiOptions } from './normalize_opts';
import type MarkdownIt from 'markdown-it';

export default function emoji_plugin(md: MarkdownIt, options: EmojiOptions) {
  const defaults: EmojiOptions = {
    defs: {},
    shortcuts: {},
  }

  const opts = normalize_opts(md.utils.assign({}, defaults, options || {}))

  md.renderer.rules.emoji = emoji_html

  md.core.ruler.after(
    'linkify',
    'emoji',
    emoji_replace(md, opts.defs, opts.shortcuts, opts.scanRE, opts.replaceRE)
  )
};
