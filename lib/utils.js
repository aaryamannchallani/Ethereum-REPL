const { utils } = require("ethers");
const { table } = require("table");
module.exports = {
  utils,
  availableUtils() {
    const u = Object.keys(utils);
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
};
