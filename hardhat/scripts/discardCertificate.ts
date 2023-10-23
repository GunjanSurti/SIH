/** Done with Interfaces*/
import { ICertificate } from "../typechain/Interfaces/ICertificate"
import { ethers, getNamedAccounts } from "hardhat"

//@ts-ignore
import createSigner from "./createSigners"

/** first of all give role to university */
async function assignRole() {
  //@ts-ignore
  const { student } = await getNamedAccounts()
  const uni = await createSigner(process.env.UNIVERSITY)
  const certi: ICertificate = await ethers.getContractAt(
    "ICertificate",
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    uni
  )

  const per = await certi.discardCertficate(student, "abc")
  per.wait(1)
  console.log(per)
}
assignRole()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

// method to get all 20 accounts
//   const accounts = await ethers.provider.listAccounts()
//   let accountsToFund = accounts[0]
//   console.log(accountsToFund)
