
const  main = async () => {

  // We get the contract to deploy
  const dwitterFactory = await hre.ethers.getContractFactory("Dwitter");
  const dwitterContract = await dwitterFactory.deploy();

  await dwitterContract.deployed();

  console.log("Dwitter  deployed to:", dwitterContract.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
