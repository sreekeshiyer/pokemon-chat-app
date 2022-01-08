import Image from "next/image";
import { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

export default function Auth() {
    const [authChoice, setAuthChoice] = useState("SignUp");

    const authMeta = {
        SignUp: {
            title: "Sign Up",
        },
        SignIn: {
            title: "Sign In Using Magic Link",
        },
    };

    return (
        <div className="w-full h-[100vh] flex flex-col justify-center items-center">
            <div className="bg-gray-50 rounded-lg px-[2rem] w-[550px] sm:w-[90%] sm:px-0">
                <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-lg w-full">
                        <div>
                            <div className="h-12 flex items-center justify-center">
                                <Image
                                    src="/images/app_logo.png"
                                    alt="Workflow"
                                    width={150}
                                    height={90}
                                />
                            </div>
                            <h2 className="mt-6 text-center text-[1.6rem] font-extrabold text-gray-900">
                                {authMeta[authChoice]["title"]}
                            </h2>
                        </div>
                        <div className="flex flex-col gap-2">
                            {authChoice === "SignUp" ? (
                                <>
                                    <SignUpForm />
                                    <div className="text-sm text-right sm:text-center">
                                        Already have an account?{" "}
                                        <button
                                            onClick={() =>
                                                setAuthChoice("SignIn")
                                            }
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Sign In
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <SignInForm />
                                    <div className="text-sm text-right sm:text-center">
                                        Don&apos;t have an account?{" "}
                                        <button
                                            onClick={() =>
                                                setAuthChoice("SignUp")
                                            }
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
