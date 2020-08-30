require('dotenv').config()
const ethers = require('ethers')

module.exports = {
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
      }

} 