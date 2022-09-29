const hre = require("hardhat");
const {buildTreeAndProof} = require('./utils')
const wl = require('./wl.json')

async function main() {
  const {root} = buildTreeAndProof(wl, wl[0])
  console.log("Merkle root:", root)
  const Clothes = await hre.ethers.getContractFactory("WhitelistedSale");
  const params = [
    root,
    "ipfs://QmUbTNJ3tnMyS14JVaLAZj3uPCxKDAKnXDJXS1pFtpUHL9/",
  ]
  const clothes = await Clothes.deploy(...params);

  await clothes.deployed();
  console.log("Deployed to:", clothes.address);
  console.log(`Verify with npx hardhat verify --network rinkeby ${clothes.address} ${params.map(p=>`"${p}"`).join(' ')}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
