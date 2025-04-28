export interface EmojiOptions {
  /** 
   * An object where keys are emoji names and values are their corresponding characters.
   * Example: { "smile": "😄", "heart": "❤️" }
   */
  defs: { [key: string]: string };

  /** 
   * An object where keys are emoji shortcut names and values are the corresponding shortcuts.
   * Example: { "smile": [":)", ":-)"], "laughing": ":D" }
   */
  shortcuts: { [key: string]: string | string[] };
}

// Convert input options to more useable format
// and compile search regexp

function quoteRE(str: string): string {
  return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
}

export default function normalize_opts(options: EmojiOptions) {
  const emojies = options.defs;

  // Flatten shortcuts to simple object: { alias: emoji_name }
  const shortcuts = Object.keys(options.shortcuts).reduce((acc: { [alias: string]: string }, key: string) => {
    // Skip aliases for filtered emojies, to reduce regexp
    if (!emojies[key]) return acc

    if (Array.isArray(options.shortcuts[key])) {
      options.shortcuts[key].forEach(alias => { acc[alias] = key })
      return acc;
    }

    acc[options.shortcuts[key]] = key
    return acc;
  }, {})

  const keys = Object.keys(emojies)
  let names: string;

  // If no definitions are given, return empty regex to avoid replacements with 'undefined'.
  if (keys.length === 0) {
    names = '^$';
  } else {
    // Compile regexp
    names = keys
      .map(name => { return `:${name}:` })
      .concat(Object.keys(shortcuts))
      .concat(Object.values(emojies))
      .sort()
      .reverse()
      .map(name => { return quoteRE(name) })
      .join('|');
  }
  const scanRE = RegExp(names)
  const replaceRE = RegExp(names, 'g')

  return {
    defs: emojies,
    shortcuts,
    scanRE,
    replaceRE
  }
};
