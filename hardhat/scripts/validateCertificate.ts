
/*** not working properly dky */
import { ICertificate } from "../typechain/Interfaces/ICertificate"
import { ethers } from "hardhat"
//@ts-ignore
import createSigner from "./createSigners"

/*** used by ThirdPartyValidator, so assign role  */
async function validateCertificate() {
  const tpv = await createSigner(process.env.THIRD_PARTY_VALIDATOR)
  const certi: ICertificate = await ethers.getContractAt(
    "Certificate",
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    tpv
  )
  const validate = await certi.validateCertificate("pqr")
  validate.wait(1)

  console.log(validate.value.toNumber())
}
validateCertificate()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
