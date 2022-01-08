import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useRef, useEffect } from "react";
import { messageStore, addMessage } from "../store/messageStore";
import ChatBubble from "./ChatBubble";

export default function ChatBox({ user_id, username, avatar }) {
    const { messages } = messageStore();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({
            block: "start",
            behavior: "smooth",
        });
    }, [messages]);

    const [message, setMessage] = useState("");

    const onMessageChange = (e) => setMessage(e.target.value);

    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        try {
            let error = await addMessage(user_id, message, username, avatar);

            if (error) {
                toast.error(error.message);
                return;
            }
        } catch (error) {
            toast.error(error.message || error.toString());
            return;
        } finally {
            setMessage("");
        }
    };

    return (
        <>
            <div className="hover:overflow-y-auto h-[80vh] bg-[rgb(14,30,51)] py-2 chat-scroll overflow-hidden">
                {messages && messages.length != 0 ? (
                    messages.map((message) => (
                        <ChatBubble
                            key={message.id}
                            message={message.message}
                            isMe={user_id === message.user_id}
                            username={message.username}
                            avatar={message.avatar}
                        />
                    ))
                ) : (
                    <h3 className="text-white text-center h-full">
                        No Messages Yet
                    </h3>
                )}
                <div ref={messagesEndRef} style={{ height: 0 }} />
            </div>

            <form
                onSubmit={handleMessageSubmit}
                className="flex rounded-b-lg justify-between items-center bg-[rgb(14,30,51)] border-[1px] border-t-black border-transparent p-3"
            >
                <input
                    type="text"
                    className="block h-[27px] w-4/5 pl-3 pr-12 sm:text-sm border-gray-300 rounded-xl sm:w-[65%]"
                    name="message"
                    id="message"
                    autoComplete="off"
                    placeholder="Type a message here.."
                    value={message}
                    onChange={onMessageChange}
                />
                <button
                    type="submit"
                    disabled={message === ""}
                    className="flex justify-center py-1 px-4 border border-transparent text-sm font-medium text-black bg-gray-100 hover:bg-gray-700 hover:text-white transition-colors duration-500 ease-in-out rounded-full items-baseline sm:w-[70px]"
                >
                    <h3 className="mr-2">Send</h3>
                    <i aria-hidden={true} className="far fa-paper-plane"></i>
                </button>
            </form>
        </>
    );
}
