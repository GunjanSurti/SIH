const { ethers } = require("hardhat")

const networkConfig = {
  default: {
    name: "hardhat",
  },
  31337: {
    name: "localhost",
    callbackGasLimit: "500000", // 500,000 gas
  },
  11155111: {
    name: "sepolia",
    callbackGasLimit: "500000", // 500,000 gas
  },
}

const developmentChains = ["hardhat", "localhost"]
const frontEndContractsFile =
  "../moralis-nextjs/constants/contractAddresses.json"
const frontEndAbiFile = "../moralis-nextjs/constants/abi.json"

module.exports = {
  networkConfig,
  developmentChains,
  frontEndContractsFile,
  frontEndAbiFile,
}
