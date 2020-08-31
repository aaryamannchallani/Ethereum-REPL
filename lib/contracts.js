const ethers = require("ethers");
const { getInfuraProvider } = require("./providers");
const axios = require("axios");
const abicall =
  "https://api.etherscan.io/api?module=contract&action=getabi&address=";
class FetchContract {
  constructor(address, etherscan, provider = getInfuraProvider()) {
    this.address = address;
    this.provider = provider;
    this.etherscan = etherscan;
  }
  getABI = async (address) => {
    return JSON.parse(
      (await axios.get(`${abicall}${address}&apikey=${this.etherscan}`)).data
        .result
    );
  };
  getReadOnlyContract = async () => {
    this.abi = await this.getABI(this.address);
    return new ethers.Contract(this.address, this.abi, this.provider);
  };
  getWriteContract = async (signer) => {
    this.abi = await this.getABI(this.address);
    return new ethers.Contract(this.address, this.abi, signer);
  };
}

module.exports = {
  getReadContract(address, etherscan, provider = getInfuraProvider()) {
    const contract = new FetchContract(
      address,
      etherscan,
      provider
    ).getReadOnlyContract();
    contract.then((res) => {
      Object.assign(d, res);
    });
    return contract;
  },
  getWriteContract(address, etherscan, signer) {
    const contract = new FetchContract(
      address,
      etherscan,
      signer
    ).getWriteContract(signer);
    contract.then((res) => {
      Object.assign(contract, res);
    });
    return contract;
  },
};
