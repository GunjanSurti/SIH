/** Done */
import { Certificate } from "../typechain/Certificate"
import { ethers, getNamedAccounts } from "hardhat"
//@ts-ignore
import createSigner from "./createSigners"

async function getAllCertificates() {
  const stu = await createSigner(
    "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a"
  )
  const certi: Certificate = await ethers.getContractAt(
    "Certificate",
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    stu
  )
  const getMyAllCertificates = await certi.getMyAllCertificates()

  console.log(getMyAllCertificates.length)
}
getAllCertificates()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
