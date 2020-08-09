const { version } = require("./package.json");

/**
 * Split the given input with quotes.
 * @param {String} line - A line of input.
 * @returns {Array<String>}
 */
function parse(line) {
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

    if (/\s/.test(r)) {
      if(singleQuoted || doubleQuoted || iSingleQuoted || iDoubleQuoted) {
        buf += r;
      } else if(got) {
        args.push(buf);
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

  if(got) args.push(buf);

  if(escaped || singleQuoted || doubleQuoted || iSingleQuoted || iDoubleQuoted) {
    throw new Error("Unexpected quote or escape");
  }

  return args;
}

module.exports = { parse, version };
