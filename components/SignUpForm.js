import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { signUp } from "../store/userStore";
import Loader from "./Loader";

export default function SignUpForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username.indexOf(" ") >= 0) {
            toast.error("Username must not contain spaces");
            return;
        }
        setLoading(true);

        try {
            let error = await signUp({ username, email });
            if (error) {
                toast.error(error.message);
                return;
            }

            toast.success("Visit the link in your email to confirm signup!");
            setConfirmEmail(true);
        } catch (error) {
            toast.error(error.message || error.toString());
            return;
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            {!confirmEmail ? (
                <form
                    onSubmit={handleSubmit}
                    className="mt-3 space-y-6"
                    method="POST"
                >
                    {loading && <Loader />}
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div>
                        <label htmlFor="username" className="sr-only">
                            Username
                        </label>
                        <input
                            id="username"
                            required={true}
                            name="username"
                            type="text"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            placeholder="Username"
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email"
                            required={true}
                            name="email"
                            type="email"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            placeholder="Email Address"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            ) : (
                <div className="my-5">
                    <h3 className="text-2xl text-black text-center">
                        Visit the link in your email to confirm signup!
                    </h3>
                </div>
            )}
        </>
    );
}
