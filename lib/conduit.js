const { getInfuraProvider,getLocalProvider,getWebSocketProvider } = require('./providers')
const { utils: ethUtils,availableUtils } = require("./utils");
const { getBalance,ethers } = require('./transactions')
const { compileSolidity } = require('./compiler')

module.exports = {
    methods : {
        getInfuraProvider,
        getLocalProvider,
        getWebSocketProvider,
        ethUtils,
        ethers,
        getBalance,
        availableUtils,
        compileSolidity
      }
}
