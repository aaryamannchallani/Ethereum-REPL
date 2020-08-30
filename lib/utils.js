const { utils } = require("ethers");
const { table } = require("table");
const chalk = require("chalk");

const availableUtils = () => {
    console.log(chalk.magenta(
      table(
        Object.keys(utils).reduce(
          (rows, key, index) =>
            (index % 3 == 0
              ? rows.push([key])
              : rows[rows.length - 1].push(key)) && rows,
          []
        )
      )
    ));
  }

module.exports = {
  utils,
  availableUtils  
};
