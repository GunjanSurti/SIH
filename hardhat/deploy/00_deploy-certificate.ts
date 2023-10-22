import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  //@ts-ignore
  const { getNamedAccounts, deployments, networks } = hre
  const { deploy, log } = deployments
  const { admin } = await getNamedAccounts()
  await deploy("Certificate", {
    from: admin,
    args: [],
    log: true,
  })
}
export default func
