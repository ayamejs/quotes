# `@ayamejs/quotes`
Split an input with quotes.

`hello "world" 'it works' “also supports iOS quotes”` -> `[ 'hello', 'world', 'it works', 'also supports iOS quotes' ]`

## Install
```sh
$ npm install @ayamejs/quotes
```
TypeScript typings included.

## Usage
```js
const quotes = require("@ayamejs/quotes");

quotes.parse(input, seperator);
```
Use it instead of your string.split logic.

Seperator defaults to a space `" "` but any single character string can be used to split on.

E.g: `quotes.parse("hello, world", ",")` -> `[ 'hello', 'world' ]`

## Changelog

#### 0.2.0 (12/8/2020)
- Added a seperator option to split by different characters other than space.
- Added TypeScript typings.

#### 0.1.0
- Initial release.

## License
[MIT License](LICENSE)
