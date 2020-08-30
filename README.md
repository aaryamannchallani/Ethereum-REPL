# Custom REPL for Sandboxing on Ethereum
---
## Usage:
- `node index.js`
---
## Features:
- Top-Level await - no more callback hell 🎊
- `getInfuraProvider()` : returns Infura Provider connected to INFURA_KEY in env
- `getLocalProvider()` : returns provider connected to http://localhost:854 🎆
- `getWebSocketProvider(<optional>)` : defaults to wss://localhost:8546// 🕸
- `ethUtils` : Utility library derived from ethers.js 👷
- `getBalance(address)` : Mainnet Balance of given address 💰
- `availableUtils()` : returns available utilities from ethers.utils 🎡
- More Coming Soon...✨
---
## Roadmap:
- Adding DeFi contracts for easy interaction
- Easy interface to listen for contract events
- Artifact Maker
---
