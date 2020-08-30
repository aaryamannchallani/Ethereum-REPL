"use strict";

var _functions;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require("dotenv").config();

var repl = require("repl");

var chalk = require("chalk");

var ethers = require("ethers");

var _require = require("ethers"),
    ethUtils = _require.utils;

var _require2 = require("table"),
    table = _require2.table;

var solc = require("solc");

var fs = require("fs");

var functions = (_functions = {
  getInfuraProvider: function getInfuraProvider(network) {
    return new ethers.providers.InfuraProvider(network, process.env.INFURA_KEY);
  },
  getLocalProvider: function getLocalProvider() {
    return new ethers.providers.JsonRpcProvider();
  },
  getWebSocketProvider: function getWebSocketProvider() {
    return new ethers.providers.WebSocketProvider();
  }
}, _defineProperty(_functions, "getWebSocketProvider", function getWebSocketProvider(host) {
  return new ethers.providers.WebSocketProvider(host);
}), _defineProperty(_functions, "ethUtils", ethUtils), _defineProperty(_functions, "ethers", ethers), _defineProperty(_functions, "getBalance", function getBalance(address) {
  var p;
  return regeneratorRuntime.async(function getBalance$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          p = new ethers.providers.InfuraProvider("homestead", process.env.INFURA_KEY);
          _context.t0 = ethUtils;
          _context.next = 4;
          return regeneratorRuntime.awrap(p.getBalance(address));

        case 4:
          _context.t1 = _context.sent;
          _context.t2 = _context.t0.formatEther.call(_context.t0, _context.t1);
          return _context.abrupt("return", _context.t2 + " Ethers");

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}), _defineProperty(_functions, "availableUtils", function availableUtils() {
  var u = Object.keys(ethUtils);
  console.log(table(u.reduce(function (rows, key, index) {
    return (index % 3 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows;
  }, [])));
}), _defineProperty(_functions, "compileSolidity", function compileSolidity(path) {
  var input = {
    language: "Solidity",
    sources: {
      "Storage.sol": {
        content: fs.readFileSync(path).toString()
      }
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"]
        }
      }
    }
  };
  var output = JSON.parse(solc.compile(JSON.stringify(input)));

  if (!fs.existsSync('./artifacts')) {
    fs.mkdirSync('./artifacts');
  }

  fs.writeFileSync("./artifacts/".concat(Object.keys(output.contracts), ".json"), JSON.stringify(output));
}), _functions);
var customRepl = repl.start(chalk.rgb(0, 255, 255)("Ethereum REPL>"));
var defaultEval = customRepl.eval;

customRepl.eval = function (cmd, context, filename, callback) {
  defaultEval(cmd, context, filename, function _callee(err, result) {
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!err) {
              _context2.next = 4;
              break;
            }

            // propagate errors from the eval
            callback(err);
            _context2.next = 15;
            break;

          case 4:
            _context2.prev = 4;
            _context2.t0 = callback;
            _context2.next = 8;
            return regeneratorRuntime.awrap(Promise.resolve(result));

          case 8:
            _context2.t1 = _context2.sent;
            (0, _context2.t0)(null, _context2.t1);
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t2 = _context2["catch"](4);
            callback(_context2.t2);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[4, 12]]);
  });
};

Object.assign(customRepl.context, functions);