/** Done with Interfaces */

import { ICertificate } from "../typechain/Interfaces/ICertificate"

import { ethers, getNamedAccounts } from "hardhat"
//@ts-ignore
import createSigner from "./createSigners"

/** assign role to university */
async function genCert() {
  const { student } = await getNamedAccounts()

  const uni = await createSigner(process.env.UNIVERSITY)
  console.log(uni.address);
  

  const certi: ICertificate = await ethers.getContractAt(
    "ICertificate",
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    uni
  )
  const generateCerti = await certi.generateCertificate(
    student,
    "pqr",
    "pqr",
    "pqr",
    "pqr"
  )
  generateCerti.wait(1)
}
genCert()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
/**************************************************************/
// module.exports = { genCert }

//   //0x70997970C51812dc3A010C7d01b50e0d17dc79C8
//   const privateKey =
//     "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
//   const provider = new ethers.providers.JsonRpcProvider(
//     " http://127.0.0.1:8545/"
//   )

//   // Create a signer with the private key and provider
//   const signer = new ethers.Wallet(privateKey, provider)
//   //   console.log(signer.address);
