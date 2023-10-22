import { Certificate } from "../typechain/Certificate"
import { ICertificate } from "../typechain/Interfaces/ICertificate"
import { ethers, getNamedAccounts } from "hardhat"
import config from "../hardhat.config"
//@ts-ignore
import createSigner from "./createSigners"

async function assignRole() {
  //@ts-ignore
  const { student } = await getNamedAccounts()
  const admin = await createSigner(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
  )
  const certi: ICertificate = await ethers.getContractAt(
    "ICertificate",
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    admin
  )
  //   console.log(certi);

  const giveRole = await certi.modifyRole(student, 3)
  giveRole.wait(1)
}
assignRole()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

//   const accounts = await ethers.provider.listAccounts()
//   let accountsToFund = accounts[0]
//   console.log(accountsToFund)
