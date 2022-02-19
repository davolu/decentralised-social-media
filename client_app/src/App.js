import React, {useEffect, useState,useRef} from 'react';
import logo from './logo.svg'
import './App.css'
import SideMenu from './component/SideMenu'
import FeedBox from './component/FeedBox'
import Loader from "./component/Loader";
 import { etherAddressShortener } from "./utils/etherAddressShortener";
import { create as ipfsHttpClient } from 'ipfs-http-client'
import Dwitter from './utils/Dwitter.json'
import {ethers} from 'ethers';
import Web3 from 'web3';
import {contractABI, contractAddress} from './utils/constants';
const {ethereum} = window;
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

 
const createDwitterContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const dwitterContract = new ethers.Contract(contractAddress, contractABI, signer);
  
    return dwitterContract;
  };

const  App = ()=> {
  const [count, setCount] = useState(0)
  const [mediaFileUrl, setMediaFileUrl] = useState("");
  const inputRef = useRef();
  const [currentAccountAddress, setCurrentAccountAddress] = useState("");
  const [formInput, updateFormInput] = useState({image: '', description: '' })
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTweets, setIsLoadingTweets] = useState(false);

  const [tweetCount, setTweetCount] = useState(null);
  const [tweets, setTweets] = useState([]);

   
  useEffect(() => {
 	checkForWallets();
	loadTweets();
  }, []);

 
  const checkForWallets = async () => {
	try {
	  if (!ethereum) return alert("Oops. Install MetaMask Wallet to use this App seamlessy.");
	  const accounts = await ethereum.request({ method: "eth_accounts" });
	  if (accounts.length) {
		setCurrentAccountAddress(accounts[0]);
	  } else {
		console.log("No accounts found");
	  }
	} catch (error) {
	  console.log(error);
	}
  };
  const connectWalletAccount = async () => {
	try {
	  if (!ethereum) return alert("Please install MetaMask.");
	  const accounts = await ethereum.request({ method: "eth_requestAccounts", });
	  setCurrentAccountAddress(accounts[0]);
	} catch (error) {
	  console.log(error);
	  throw new Error("No ethereum found");
	}
  };

  async function UploadMedia(e) {
	 const file = e.target.files[0]
	 setIsLoading(true)
	try {
	  const added = await client.add(
		file,
		{
		  progress: (prog) => console.log(`received: ${prog}`)
		}
	  )
	  const url = `https://ipfs.infura.io/ipfs/${added.path}`
	  setMediaFileUrl(url)
	  setIsLoading(false)

	} catch (error) {
	  console.log('Error uploading file: ', error)
	  setIsLoading(false)

	}  
  }


  const  postTweet = async ()=> {
	setIsLoading(true)

	const dwitterContract = createDwitterContract();

	const { image, description } = formInput
	if (!description || !mediaFileUrl) return	
	
	try {
		const postTweetHash = await dwitterContract.postTweet(mediaFileUrl, description);
		setIsLoading(true);
		console.log(`Loading - ${postTweetHash.hash}`);
		await postTweetHash.wait();
		console.log(`Success - ${postTweetHash.hash}`);
		setIsLoading(false);
		setMediaFileUrl("");
		updateFormInput({image: '', description: '' });
		loadTweets();
	} catch (error) {
	  console.log('Error Posting Tweet: ', error)
	  setIsLoading(false)

	}  
  }
  
  const loadTweets =  async ()=>{
	
	try {
		if (ethereum) {
		  const dwitterContract = createDwitterContract();
  
		  const tweetsList = await dwitterContract.getTweets();
  
		  /*
		    uint id;
			string hash;
			string description;
			uint likes;
			address  author;
			uint256 timestamp;
		  */
		  const structuredTweets = tweetsList.map((tweets) => ({
			image: tweets.hash,
			description: tweets.description,
			timestamp: new Date(tweets.timestamp.toNumber() * 1000).toLocaleString(),
			author: tweets.author,
		  }));
		  
		  setTweets(structuredTweets);
		} else {
		  console.log("Ethereum is not found");
		}
	  } catch (error) {
		console.log(error);
	  }
	 
	 
  }
  return (
    <div className="App">
 	<div className="flex justify-center w-screen h-screen px-4 text-gray-700">
	<div className="flex w-full max-w-screen-lg">
	 <SideMenu  
	 etherAddressShortener={etherAddressShortener}
	 currentAccountAddress={currentAccountAddress}
	 connectWalletAccount={connectWalletAccount}
	 />
	<div className="flex flex-col flex-grow border-l border-r border-gray-300">
	<div className="flex justify-between flex-shrink-0 px-8 py-4 border-b border-gray-300">
	<h1 className="text-xl font-semibold">Dwitter</h1>
 	</div>
	<div className="flex-grow h-0 overflow-auto">
	
	<div className="flex w-full p-8 border-b-4 border-gray-300">
					<span className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full"></span>
					<div className="flex flex-col flex-grow ml-4">
						<textarea className="p-3 bg-transparent border border-gray-500 rounded-sm" 
						name=""
						id=""  
						rows="3" 
						placeholder="What's happening?"
						onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
						></textarea>
						
						{ 
                  isLoading ? 
                  <Loader/>
                  :
				  <div className="flex justify-between mt-2">
				  <input
				  type="file"
				  name="imgupload"
				  className="my-4 invisible"
				  ref={inputRef}
				  onChange={UploadMedia}
				  />
				   {
					   mediaFileUrl !=="" ?
					   <img src={mediaFileUrl} className="w-16 md:w-22 lg:w-28" />
					   :
					   <>
					   </>
				   }
					  <button className="flex items-center h-8 px-3 text-xs rounded-sm hover:bg-gray-200" 
					  onClick={()=>{inputRef.current.click()}}>Attach</button>
					  <button className="flex items-center h-8 px-3 text-xs rounded-sm bg-gray-300 hover:bg-gray-400" onClick={postTweet}>Post</button>
				  </div>
                  }

					 

					</div>
				</div>
				{ 
                !isLoadingTweets ? 
				<FeedBox tweets={tweets}  
						 etherAddressShortener={etherAddressShortener}/>	 
				:
				 <Loader/>
				}
 	</div>
	</div>
	
	<div className="flex flex-col flex-shrink-0 w-1/4 py-4 pl-4">
 	 
	</div>
	</div>
	</div>
 
     </div>
  )
}

export default App
