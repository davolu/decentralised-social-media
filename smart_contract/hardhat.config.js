require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks:{
    ropsten:{
      url:'https://eth-ropsten.alchemyapi.io/v2/5GKBfGNgcbaF2gA_7oaof_29waclxwRN',
      accounts:['669333b4816847976122cc5ff80a1c1171a4548ea2d7dbe14c15279c0986762e']
    }
}
};
