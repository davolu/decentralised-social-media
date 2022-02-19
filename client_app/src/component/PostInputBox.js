const PostInputBox = () =>{
    return(
        <>
	<div className="flex w-full p-8 border-b-4 border-gray-300">
					<span className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full"></span>
					<div className="flex flex-col flex-grow ml-4">
						<textarea className="p-3 bg-transparent border border-gray-500 rounded-sm" name="" id=""  rows="3" placeholder="What's happening?"></textarea>
						<div className="flex justify-between mt-2">
							<button className="flex items-center h-8 px-3 text-xs rounded-sm hover:bg-gray-200">Attach</button>
							<button className="flex items-center h-8 px-3 text-xs rounded-sm bg-gray-300 hover:bg-gray-400">Post</button>
						</div>
					</div>
				</div>
        </>
    )
}

export default PostInputBox;