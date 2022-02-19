
const FeedBox = ()=>{
    
    return(
        <>
        	<div className="flex w-full p-8 border-b border-gray-300">
					<span className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full"></span>
					<div className="flex flex-col flex-grow ml-4">
						<div className="flex">
							<span className="font-semibold">Username</span>
							<span className="ml-1">@username</span>
							<span className="ml-auto text-sm">Just now</span>
						</div>
						<p className="mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <a className="underline" href="#">#hashtag</a></p>
						<div className="flex items-center justify-center h-64 mt-2 bg-gray-200">
							<span className="font-semibold text-gray-500">Image</span>
						</div>
						<div className="flex mt-2">
							<button className="text-sm font-semibold">Like</button>
							<button className="ml-2 text-sm font-semibold">Reply</button>
							<button className="ml-2 text-sm font-semibold">Share</button>
						</div>
					</div>
				</div>
        </>
    )
}

export default FeedBox;