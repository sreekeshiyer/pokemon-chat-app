export default function ChatBubble({ isMe, message, username, avatar }) {
    return (
        <>
            {isMe ? (
                <div className="flex w-full items-center justify-end text-[0.9rem] min-w-[50px]">
                    <div className="bg-blue-500 text-white max-w-sm mx-3 my-2 p-2 rounded-lg sm:px-2 sm:py-1 sm:my-1">
                        {message}
                    </div>
                </div>
            ) : (
                <div className="flex w-full items-center text-[0.9rem] min-w-[50px] ml-2">
                    <img
                        src={avatar}
                        alt={username}
                        className="rounded-full w-[35px] h-[35px]"
                    />
                    <div className="bg-gray-300 max-w-sm mx-3 my-2 p-2 rounded-lg sm:px-2 sm:py-1 sm:my-1">
                        <h1 className=" text-black font-semibold mb-2 sm:mb-1">
                            {username}
                        </h1>

                        {message}
                    </div>
                </div>
            )}
        </>
    );
}
