import { ICertificate } from "../typechain/Interfaces/ICertificate"
import { ethers, getNamedAccounts } from "hardhat"

//@ts-ignore
import createSigner from "./createSigners"

async function assignRole() {
  //@ts-ignore
  const { student } = await getNamedAccounts()
  const stu = await createSigner(
    "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a"
  )
  const certi: ICertificate = await ethers.getContractAt(
    "ICertificate",
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    stu
  )

  const per = await certi.userPermission(student)
  console.log(per)

  //   console.log(certi)
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
