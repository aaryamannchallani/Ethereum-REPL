# Custom REPL for Sandboxing on Ethereum
---
## Usage:
- `yarn`
- `node index.js`
- If using Bash/zsh :
  - `echo 'alias erepl="node <path-to-index.js>"' >> ~/.bashrc` now use it from any directory!
---
## Features:
- Top-Level await - no more callbacks 🎊
- `getInfuraProvider()` : returns Infura Provider connected to INFURA_KEY in .env
- `getLocalProvider()` : returns provider connected to http://localhost:8545 🎆
- `getWebSocketProvider(<optional>)` : defaults to wss://localhost:8546 🕸
- `ethUtils` : Utility library derived from ethers.js 👷
- `getBalance(address)` : Mainnet Balance of given address 💰
- `availableUtils()` : returns available utilities from ethers.utils 🎡
- `compileSolidity(path-to-contract)` : saves artifact including abi, bytecode, assembly and all the other good stuff in ./artifacts/
- `getReadContract(address)` : returns contract instance ready to go(read-only)
- `getWriteContract(address,signer)`: returns contract instance with given signer
- More Coming Soon...✨
---
## Roadmap:
- Adding DeFi contracts for easy interaction
- Easy interface to listen for contract events
---
