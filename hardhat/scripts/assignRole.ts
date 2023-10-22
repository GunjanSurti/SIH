import { Certificate } from "../typechain/Certificate"
import { ethers, getNamedAccounts } from "hardhat"
import config from "../hardhat.config"

async function assignRole() {
  //@ts-ignore
  const { admin, university } = await getNamedAccounts()
  console.log(admin)
  console.log(university)
}
assignRole()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})

//  ``` const accounts = await ethers.provider.listAccounts()
//   let accountsToFund = accounts[0]
//   console.log(accountsToFund)```