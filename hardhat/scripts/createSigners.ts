/** Compeleted */
module.exports = async function createSigner(privateKey: string) {
  // Create a provider (replace 'http://localhost:8545' with your provider's URL)
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")


  // Create a signer
  const signer = new ethers.Wallet(privateKey, provider)

  // Verify the connection
  const signerAddress = await signer.getAddress()
  console.log("Connected signer address:", signerAddress)

  return signer
}

// const signer = await createSigner()
