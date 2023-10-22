import { Certificate } from "../typechain/Certificate"
import { ethers, getNamedAccounts } from "hardhat"

async function genCert() {
    const {admin,student} = await getNamedAccounts()
  const certi: Certificate = await ethers.getContractAt(
    "Certificate",
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",admin
  )
  const generateCerti = await certi.generateCertificate(
    student,
    "xyz",
    "xyz",
    "xyz",
    "xyz"
  )

  const eventFilter = certi.filters.CertificateIssued()
  const events = await certi.queryFilter(eventFilter)

  console.log("Emitted events:", events)

  //   const getMyAllCertificates = await certi.getMyAllCertificates()
  //   console.log(getMyAllCertificates)
}
genCert()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
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
