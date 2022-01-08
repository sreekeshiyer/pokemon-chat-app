import Layout from "./Layout";
import ChatBox from "./ChatBox";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { signOut, setRandomAvatar } from "../store/userStore";

export default function Chat({ user }) {
    const [avatar, setAvatar] = useState(user.avatar);

    // Logout Handler
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            let error = await signOut();
            if (error) {
                toast.error(error.message);
                return;
            }
        } catch (error) {
            toast.error(error.message || error.toString());
            return;
        }
    };

    // Change Avatar
    const handleAvatarChange = async (e) => {
        e.preventDefault();
        try {
            setAvatar(await setRandomAvatar(avatar));
        } catch (error) {
            toast.error(error.message || error.toString());
            return;
        }
    };

    return (
        <Layout>
            <ToastContainer />
            <div className="w-full h-[100vh] flex flex-col justify-center items-center">
                <div className="bg-blue-500 rounded-lg w-3/4 sm:w-[90%]">
                    <div className="bg-blue-500 text-white flex justify-between items-center rounded-t-lg">
                        <div className="flex gap-2 mx-2 text-blue-100 font-semibold text-lg tracking-wide">
                            <button onClick={handleAvatarChange}>
                                <img
                                    src={avatar}
                                    alt={user.username}
                                    className="rounded-full w-[35px] h-[35px] border-white border-2"
                                />
                            </button>
                            <h1>{user.username}</h1>
                        </div>
                        <div>
                            <button
                                type="submit"
                                onClick={handleLogout}
                                className="flex justify-center py-2 px-4 mx-2 my-2 border border-transparent text-sm font-medium rounded-md text-black bg-gray-100 hover:bg-gray-700 hover:text-white transition-colors duration-500 ease-in-out"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                    <ChatBox
                        user_id={user.id}
                        username={user.username}
                        avatar={avatar}
                    />
                </div>
            </div>
        </Layout>
    );
}
