const solc = require("solc");
const fs = require("fs");
module.exports = {
  compileSolidity(path) {
    const splitPath = path.split("/");
    const fileName = splitPath[splitPath.length - 1].split(".")[0];
    const input = {
      language: "Solidity",
      sources: {
        [fileName]: {
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
    if (!fs.existsSync("./artifacts")) {
      fs.mkdirSync("./artifacts");
    }
    fs.writeFileSync(
      `./artifacts/${Object.keys(output.contracts)}.json`,
      JSON.stringify(output)
    );
    return `Created Artifact at ./artifacts/${Object.keys(
      output.contracts
    )}.json`;
  },
};
