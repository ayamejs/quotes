const { version } = require("./package.json");

const escapeRegex = (str) => str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

/**
 * Split the given input with quotes.
 * @param {String} line - A line of input.
 * @param {String} [sep=" "] - Seperator character to split on.
 * @returns {Array<String>}
 */
function parse(line, sep = " ") {
  // Type checks.
  if(typeof line !== "string") throw new TypeError("Line must be a string.");
  if(typeof sep !== "string") throw new TypeError("Seperator must be a string.");

  if(sep.length > 1) throw new RangeError("Seperator must be a single character.");

  const args = [];
  let buf = "";
  let escaped = false;

  let doubleQuoted = false;
  let singleQuoted = false;
  let iDoubleQuoted = false;
  let iSingleQuoted = false;

  let got = false;

  for(const r of line) {
    if(escaped) {
      buf += r;
      escaped = false;
      continue;
    }

    if(r === "\\") {
      if(singleQuoted || iSingleQuoted) {
        buf += r;
      } else {
        escaped = true;
      }
      continue;
    }

    if (new RegExp(escapeRegex(sep)).test(r)) {
      if(singleQuoted || doubleQuoted || iSingleQuoted || iDoubleQuoted) {
        buf += r;
      } else if(got) {
        args.push(buf.trim());
        buf = "";
        got = false;
      }
      continue;
    }

    switch(r) {
    case "‘":
    case "’":
      if(!singleQuoted && !doubleQuoted && !iDoubleQuoted) {
        if(iSingleQuoted) got = true;
        iSingleQuoted = !iSingleQuoted;
        continue;
      }
      break;
    case "“":
    case "”":
      if(!singleQuoted && !doubleQuoted && !iSingleQuoted) {
        if(iDoubleQuoted) got = true;
        iDoubleQuoted = !iDoubleQuoted;
        continue;
      }
      break;
    case "\"":
      if(!singleQuoted && !iSingleQuoted && !iDoubleQuoted) {
        if(doubleQuoted) got = true;
        doubleQuoted = !doubleQuoted;
        continue;
      }
      break;
    case "'":
      if(!doubleQuoted && !iSingleQuoted && !iDoubleQuoted) {
        if(singleQuoted) got = true;
        singleQuoted = !singleQuoted;
        continue;
      }
      break;
    }

    got = true;
    buf += r;
  }

  if(got) args.push(buf.trim());

  if(escaped || singleQuoted || doubleQuoted || iSingleQuoted || iDoubleQuoted) {
    throw new Error("Unexpected quote or escape");
  }

  return args;
}

module.exports = { parse, version };
