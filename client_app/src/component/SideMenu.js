import { SiEthereum } from "react-icons/si";
import { AiFillPlayCircle } from "react-icons/ai";

const SideMenu = ({currentAccountAddress,
				   etherAddressShortener,
				   connectWalletAccount}) =>{
    return(
    	<div className="flex flex-col w-64 py-4 pr-3">
  				<div className="flex flex-col ml-2">
				 
		 {!currentAccountAddress ?
            <button
              type="button"
              onClick={connectWalletAccount}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              <SiEthereum className="text-white mr-2" />
              <p className="text-white text-base text-sm">
                Connect Your Wallet
              </p>
            </button>
			:
			<a href={`https://ropsten.etherscan.io/address/${currentAccountAddress}`} target="_blank">
			<SiEthereum fontSize={21} color="blue" />
			<span className="mt-1 text-sm font-semibold leading-none">{etherAddressShortener(currentAccountAddress)}</span>
			</a>
            
            }
  				</div>
 		</div>
		
    )
}
export default SideMenu;