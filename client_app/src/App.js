import React, {useEffect, useState,useRef} from 'react';
import logo from './logo.svg'
import './App.css'
import SideMenu from './component/SideMenu'
import FeedBox from './component/FeedBox'
import PostInputBox from './component/PostInputBox'
import TrendBox from './component/TrendBox'
import { etherAddressShortener } from "./utils/etherAddressShortener";
import { create as ipfsHttpClient } from 'ipfs-http-client'

import {ethers} from 'ethers';
import {contractABI, contractAddress} from './utils/constants';
const {ethereum} = window;
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

 
const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const etherTransactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
  
    return etherTransactionsContract;
  };

const  App = ()=> {
  const [count, setCount] = useState(0)
  const [mediaFileUrl, setMediaFileUrl] = useState("");
  const inputRef = useRef();
  const [currentAccountAddress, setCurrentAccountAddress] = useState("");

  useEffect(() => {
	checkForWallets();
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
	  alert("uploading");
	const file = e.target.files[0]
	try {
	  const added = await client.add(
		file,
		{
		  progress: (prog) => console.log(`received: ${prog}`)
		}
	  )
	  const url = `https://ipfs.infura.io/ipfs/${added.path}`
	  setMediaFileUrl(url)
	} catch (error) {
	  console.log('Error uploading file: ', error)
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
						<textarea className="p-3 bg-transparent border border-gray-500 rounded-sm" name="" id=""  rows="3" placeholder="What's happening?"></textarea>
						<div className="flex justify-between mt-2">
						<input
						type="file"
						name="imgupload"
						className="my-4 invisible"
						ref={inputRef}
						onChange={UploadMedia}
						/>
						{mediaFileUrl}
							<button className="flex items-center h-8 px-3 text-xs rounded-sm hover:bg-gray-200" 
							onClick={()=>{inputRef.current.click()}}>Attach</button>
							<button className="flex items-center h-8 px-3 text-xs rounded-sm bg-gray-300 hover:bg-gray-400">Post</button>
						</div>
					</div>
				</div>

	<FeedBox/>	 
	</div>
	</div>
	
	<div className="flex flex-col flex-shrink-0 w-1/4 py-4 pl-4">
 	<div>
	<h3 className="mt-6 font-semibold">Trending</h3>
	<TrendBox/>
	</div>
	</div>
	</div>
	</div>
 
     </div>
  )
}

export default App
