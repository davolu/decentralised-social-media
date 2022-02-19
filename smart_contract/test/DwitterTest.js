const { expect } = require("chai");
const { ethers } = require("hardhat");
  
 
describe("Dwitter", function () {
  
 
  let Dwitter;
 
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async () => {
   
    Dwitter = await ethers.getContractFactory("Dwitter");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    Dwitter = await Dwitter.deploy();
    await Dwitter.deployed();
   });

  describe("Acvities", () => {

        
        it("", async function () {
          //  Post tweet contract works
       //  await Dwitter.postTweet(addr1.address,50,"Send etherium"); 
        });

        it("", async function () {
          //
        // await Dwitter.getTransactionsHistory(); 
      //   expect(Dwitter).be.not.empty;
        });
        
        it("", async function () {
          //
        // await Dwitter.getNumberOfTransactions(); 
         //expect(Dwitter).be.not.empty;

        });

  });


//more ...
});

 