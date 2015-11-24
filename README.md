# markdown-it-unicode-emoji

[![Build Status](https://img.shields.io/travis/makepanic/markdown-it-unicode-emoji/master.svg?style=flat)](https://travis-ci.org/makepanic/markdown-it-unicode-emoji)
[![NPM version](https://img.shields.io/npm/v/markdown-it-unicode-emoji.svg?style=flat)](https://www.npmjs.org/package/markdown-it-unicode-emoji)
[![Coverage Status](https://coveralls.io/repos/makepanic/markdown-it-unicode-emoji/badge.svg?branch=master&service=github)](https://coveralls.io/github/makepanic/markdown-it-unicode-emoji?branch=master)

> Plugin for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser, adding unicode emoji & emoticon syntax support.

__Note:__ 

- this package is a fork of [markdown-it/markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji)
- the `emoji` markdown-it token name which means it'll conflict with the [markdown-it/markdown-emoji](https://github.com/markdown-it/markdown-it) package. 
(This shouldn't be a problem because the functionality of markdown-it is extended)

Three versions:

- __Full__ (default), with all github supported emojies.
- [Light](https://github.com/makepanic/markdown-it-unicode-emoji/blob/master/lib/data/light.json), with only well supported unicode emojies and reduced size.
- [emoji-java](https://github.com/makepanic/markdown-it-unicode-emoji/blob/master/lib/data/emoji-java.json) uses the same alias as [emoji-java](https://github.com/vdurmont/emoji-java/blob/master/src/main/resources/emojis.json)

Also supports emoticons [shortcuts](https://github.com/makepanic/markdown-it-unicode-emoji/blob/master/lib/data/shortcuts.js) like `:)`, `:-(`, and other. See full list an link above.

## Differences to `markdown-it/markdown-it-emoji`

- adds additional `data`: `emoji-java.json` based on the dataset from [emoji-java](https://github.com/vdurmont/emoji-java/blob/master/src/main/resources/emojis.json)
- `emoji-java` version doesn't add any default shortcuts
- creates tokens for unicode emojis

## Install

node.js, browser:

```bash
npm install markdown-it-emoji --save
bower install markdown-it-emoji --save
```

In addition you need unicode emoji detection and parsing functions. If [twemoji](https://github.com/twitter/twemoji/) is provided, its functions are used by default.

## Use

### init

```js
var md = require('markdown-it')();
var emoji = require('markdown-it-emoji');
// Or for light version
// var emoji = require('markdown-it-emoji/light');

md.use(emoji [, options]);
```

Options are not mantatory:

- __defs__ (`Object`) - rewrite available emojies definitions
  - example: `{ name1: char1, name2: char2, ... }`
- __enabled__ (`Array`) - disable all emojies except whitelisted
- __shortcuts__ (`Object`) - rewrite default shortcuts
  - example: `{ "smile": [ ":)", ":-)" ], "laughing": ":D" }`
- __containsUnicodeEmoji__ (`Function(text)`) - function that returns true if a unicode emoji is found inside the text argument.
- __replaceUnicodeEmojis__ (`Function(text, replacer)`) - function that follows the ES5 `String.prototype.replace(RegExp, replacer)` syntax.

By default it tries to use [twemoji](https://github.com/twitter/twemoji/) to detect and parse unicode emojis, 
but it's possible to roll your own implementation by setting these properties on the config object:

```js
containsUnicodeEmoji: function (text) {
  return twemojiInstance.test(text);
},
replaceUnicodeEmojis: function (text, replacer) {
  return twemojiInstance.replace(text, replacer);
}
```

_Differences in browser._ If you load script directly into the page, without
package system, module will add itself globally with name `markdownitEmoji`.
Then init will look a bit different:

```js
var md = window.markdownit().use(window.markdownitEmoji);
```


### change output

By default, emojies are rendered as appropriate unicode chars. But you can change
renderer function as you wish.

Render as span blocks (for example, to use custom iconic font):

```js
// ...
// initialize

md.renderer.rules.emoji = function(token, idx) {
  return '<span class="emoji emoji_' + token[idx].markup + '"></span>';
};
```

Or use [twemoji](https://github.com/twitter/twemoji):

```js
// ...
// initialize

var twemoji = require('twemoji')

md.renderer.rules.emoji = function(token, idx) {
  return twemoji.parse(token[idx].content);
};
```

__NB 1__. Read [twemoji docs](https://github.com/twitter/twemoji#string-parsing)!
May be you need more options to change image size & type.

__NB 2__. For twemoji you can like to fit image height to line height with this
style:

```css
.emoji {
  height: 1.2em;
}
```

## License

[MIT](https://github.com/makepanic/markdown-it-unicode-emoji/blob/master/LICENSE)
