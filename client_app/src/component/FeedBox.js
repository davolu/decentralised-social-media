import { SiEthereum } from "react-icons/si";
import { AiFillPlayCircle } from "react-icons/ai";

const FeedBox = ({tweets,etherAddressShortener})=>{
    
    return(
        <>
 		{ tweets && tweets.map( (item, index) =>{
			 return(
	<div className="flex w-full p-8 border-b border-gray-300" key={index}>
	<span className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full"></span>
		<div className="flex flex-col flex-grow ml-4">
			<div className="flex">
				<SiEthereum fontSize={21} color="blue" />
				<span className="font-semibold">{etherAddressShortener(item.author)}</span>
			 

				<span className="ml-auto text-sm">{item.timestamp}</span>
			</div>
			<p className="mt-1">{item.description}</p>
 			<img src={item.image} className="post-img" />
 			<div className="flex mt-2">
				<button className="text-sm font-semibold">Like</button>
				<button className="ml-2 text-sm font-semibold">Reply</button>
				<button className="ml-2 text-sm font-semibold">Share</button>
			</div>
		</div>
	</div>
			 )
		})
         
		}	
		<br/><br/>	
        </>
    )
}

export default FeedBox;