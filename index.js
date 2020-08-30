require("dotenv").config();
const repl = require("repl");
const chalk = require("chalk");
const ethers = require("ethers");
const { utils: ethUtils } = require("ethers");
const { table } = require("table");
const fs = require("fs");

const functions = {
  getInfuraProvider(network) {
    return new ethers.providers.InfuraProvider(network, process.env.INFURA_KEY);
  },
  getLocalProvider() {
    return new ethers.providers.JsonRpcProvider();
  },
  getWebSocketProvider() {
    return new ethers.providers.WebSocketProvider();
  },
  getWebSocketProvider(host) {
    return new ethers.providers.WebSocketProvider(host);
  },
  ethUtils,
  ethers,
  async getBalance(address) {
    const p = new ethers.providers.InfuraProvider(
      "homestead",
      process.env.INFURA_KEY
    );
    return ethUtils.formatEther(await p.getBalance(address)) + " Ethers";
  },
  availableUtils() {
    const u = Object.keys(ethUtils);
    console.log(
      table(
        u.reduce(
          (rows, key, index) =>
            (index % 3 == 0
              ? rows.push([key])
              : rows[rows.length - 1].push(key)) && rows,
          []
        )
      )
    );
  },
  compileSolidity(path) {
	const solc = require('solc')
    const splitPath = path.split('/')
    const fileName = splitPath[splitPath.length-1].split('.')[0]
    const input = {
      language: "Solidity",
      sources: {
        [fileName] : {
          content: fs.readFileSync(path).toString(),
        },
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["*"],
          },
        },
      },
    };
    const output = JSON.parse(solc.compile(JSON.stringify(input)));
    if(!fs.existsSync('./artifacts')){
              fs.mkdirSync('./artifacts')
        }
          fs.writeFileSync(`./artifacts/${Object.keys(output.contracts)}.json`,JSON.stringify(output))
  	return `Created Artifact at ./artifacts/${Object.keys(output.contracts)}.json`
  },
};

const customRepl = repl.start(chalk.rgb(0, 255, 255)("Ethereum REPL>"));

const defaultEval = customRepl.eval;
customRepl.eval = (cmd, context, filename, callback) => {
  defaultEval(cmd, context, filename, async (err, result) => {
    if (err) {
      // propagate errors from the eval
      callback(err);
    } else {
      // awaits the promise and either return result or error
      try {
        callback(null, await Promise.resolve(result));
      } catch (err) {
        callback(err);
      }
    }
  });
};

Object.assign(customRepl.context, functions);
