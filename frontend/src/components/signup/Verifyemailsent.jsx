import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function VerifyEmailSent() 
{
    const location = useLocation();
    const email = location.state?.email || "your email";

    return (
        <div className="mx-auto w-full max-w-7xl">
            <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
                <div className="relative z-10 max-w-screen-md px-4 py-12 sm:py-20 mx-auto sm:px-6 lg:px-8 bg-white rounded-lg shadow-md text-center">
                    <h2 className="text-3xl font-bold sm:text-4xl">Verify Your Email</h2>
                    <p className="mt-4 text-gray-600">
                        A verification link has been sent to <b className="text-black">{email}</b>.
                    </p>
                    <p className="mt-2 text-gray-500">
                        Please check your inbox and click on the link to verify your account.
                    </p>

                    {/* Didn't receive an email? */}
                    <p className="mt-6 text-gray-600">
                        Didn't receive an email?{" "}
                        <Link to="/signup" className="text-orange-700 hover:underline">
                            Try signing up again
                        </Link>
                    </p>
                </div>
            </aside>
        </div>
    );
}
