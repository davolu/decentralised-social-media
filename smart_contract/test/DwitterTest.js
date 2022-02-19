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

   describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await Dwitter.address
      expect(address).to.be.not.equal(0x0)
      expect(address).to.be.not.equal('')
      expect(address).to.be.not.equal(null)
      expect(address).to.be.not.equal(undefined)
    })

    it('has a name', async () => {
      const name = await Dwitter.name()
      expect(name).to.be.equal("Dwitter")
     })
  })

  describe('tweets', async () => {
    let result, tweetCount
    const hash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'

    beforeEach(async () => {
      result = await Dwitter.postTweet(hash, 'Image description', { from: author })
      tweetCount = await decentragram.tweetCount()
    })
    
      //check event
      it('creates tweet', async () => {
        // SUCESS
        expect(tweetCount).to.be.equal(1,"tweetCount should equal 1")

        const event = result.logs[0].args
        expect(event.id.toNumber()).to.be.equal(imageCount.toNumber(),'id is valid')
        expect(event.hash).to.be.equal(hash,'Hash is valid')
        expect(event.description).to.be.equal('Image description','description is valid')
        expect(event.description).to.be.equal('author','author is valid')

  
        // FAILURE: Tweet must have image hash
        expect(await Dwitter.postTweet('', 'Image description', { from: author })).to.eventually.be.rejectedWith("Image must have hash");
        // FAILURE: Tweet must have description
        expect(Dwitter.postTweet('Image hash', '', { from: author })).to.eventually.be.rejectedWith("Image must have description");

       })

  })

  


//more ...
});

 