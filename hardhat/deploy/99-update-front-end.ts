import {
  frontEndContractsFile,
  frontEndAbiFile,
  //@ts-ignore
} from "../helper-hardhat-config"
import fs from "fs"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

const updateUI: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { network, ethers } = hre
  const chainId = "31337"

  if (process.env.UPDATE_FRONT_END) {
    console.log("Writing to front end...")
    const certificate = await ethers.getContract("Certificate")
    const contractAddresses = JSON.parse(
      fs.readFileSync(frontEndContractsFile, "utf8")
    )
    if (chainId in contractAddresses) {
      if (
        !contractAddresses[network.config.chainId!].includes(
          certificate.address
        )
      ) {
        contractAddresses[network.config.chainId!].push(certificate.address)
      }
    } else {
      contractAddresses[network.config.chainId!] = [certificate.address]
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
    fs.writeFileSync(
      frontEndAbiFile,
      //@ts-ignore
      certificate.interface.format(ethers.utils.FormatTypes.json)
    )
    console.log("Front end written!")
  }
}
export default updateUI
updateUI.tags = ["all", "frontend"]
