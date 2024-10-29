import type { Token } from "markdown-it/index.js";

export default function emoji_html(tokens: Token[], idx: number) {
  return tokens[idx].content;
};
