//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Dwitter {
  
  string public name;
  uint public tweetCount = 0;
  mapping(uint => Tweet) public tweets;

  struct Tweet {
    uint id;
    string hash;
    string description;
    uint likes;
    address  author;
    uint256 timestamp;
  }

  event TweetCreated(
    uint id,
    string hash,
    string description,
    uint likes,
    address  author,
    uint256 timestamp

  );

  event TweetLiked(
    uint id,
    string hash,
    string description,
    uint likes,
    address  author
  );

     Tweet[] tweetsStruct;

  constructor() public {
    name = "Dwitter";
  }

  function postTweet(string memory _imgHash, string memory _description) public {
    // Tweet is optional

    // Make sure tweet description exists
    require(bytes(_description).length > 0);
    // Make sure uploader address exists
    require(msg.sender!=address(0));

    // Increment image id
    tweetCount ++;
  
    // Add Tweet to the contract
    tweetsStruct.push(Tweet(tweetCount, _imgHash, _description, 0, msg.sender,block.timestamp));

    // Add Tweet to the contract
    //tweets[tweetCount] = Tweet(tweetCount, _imgHash, _description, 0, msg.sender,block.timestamp);
    // Trigger an event
    emit TweetCreated(tweetCount, _imgHash, _description, 0, msg.sender,block.timestamp);
  }

  function LikeTweet(uint _id) public payable {
    // Make sure the id is valid
    
    require(_id > 0 && _id <= tweetCount);
    // Fetch the tweet
    Tweet memory _tweet = tweets[_id];
    // Fetch the author
    address  _author = _tweet.author;
    // Pay the author by sending them Ether for post was liked
    payable(_author).transfer(msg.value);
    // Increment the likes
    _tweet.likes = _tweet.likes + msg.value;
    // Update the tweet
    tweets[_id] = _tweet;
    // Trigger an event
    emit TweetLiked(_id, _tweet.hash, _tweet.description, _tweet.likes, _author);
  }

  function getTweets() public view returns ( Tweet[] memory){
    
   // Fetch the tweet
    return tweetsStruct;
    }
}
