const ethers = require("ethers");
module.exports = {
  async getBalance(address) {
    const p = new ethers.providers.InfuraProvider(
      "homestead",
      process.env.INFURA_KEY
    );
    return ethers.utils.formatEther(await p.getBalance(address)) + " Ethers";
  },
  ethers,
};
