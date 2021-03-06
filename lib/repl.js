const repl = require("repl");
const chalk = require("chalk");

const customRepl = repl.start({
  prompt: chalk.rgb(0, 255, 255)("Ethereum REPL > "),
  terminal: true,
  ignoreUndefined: true,
});

const defaultEval = customRepl.eval;
customRepl.eval = (cmd, context, filename, callback) => {
  defaultEval(cmd, context, filename, async (err, result) => {
    if (err) {
      callback(err);
    } else {
      try {
        callback(null, await Promise.resolve(result));
      } catch (err) {
        callback(err);
      }
    }
  });
};

Object.assign(customRepl.context, require("./conduit"));

module.exports = {
  customRepl,
};
