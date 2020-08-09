# `@ayamejs/quotes`
Split an input with quotes.

`hello "world" 'it works' “also supports iOS quotes”` -> `[ 'hello', 'world', 'it works', 'also supports iOS quotes' ]`

## Install
```sh
$ npm install @ayamejs/quotes
```

## Usage
```js
const quotes = require("@ayamejs/quotes");

quotes.parse(input);
```
Use it instead of your string.split logic.

## License
[MIT License](LICENSE)
