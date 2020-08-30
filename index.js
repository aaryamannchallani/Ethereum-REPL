const repl = require("repl");
const chalk = require("chalk");

const { methods } = require('./lib/conduit')



const customRepl = repl.start(chalk.rgb(0, 255, 255)("Ethereum REPL > "));

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

Object.assign(customRepl.context, methods);
