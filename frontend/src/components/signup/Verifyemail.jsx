import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
    const { token, email } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.post("http://localhost:4003/api/auth/verify",
                {
                   token:token,
                   email: email,
                   subject:"EmailVerification"
                },
                {
                    headers:{"Content-Type": "application/json" },
                    withCredentials: true,
                }
            );



                // If backend verifies successfully then set to success for redirection to login page
                if (response.status === 200) {
                    setSuccess(true);
                } else {
                    setError(response.data?.message || "Verification failed. Please try again.");
                }
            } catch (error) {
                setError(error.response?.data?.message || "Verification failed. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        verifyEmail();
    }, [token, email]);

    // Redirect to login page after 2 seconds if verification is successful
    useEffect(() => {
        if (success) {
            setTimeout(() => navigate("/login"), 2000);
        }
    }, [success, navigate]);

    return (
        <div className="mx-auto w-full max-w-7xl">
            <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
                <div className="relative z-10 max-w-screen-md px-4 py-12 sm:py-20 mx-auto sm:px-6 lg:px-8 bg-white rounded-lg shadow-md text-center">
                    <h2 className="text-3xl font-bold sm:text-4xl">
                        {loading ? "Verifying Your Email..." : error ? "Verification Failed" : "Email Verified!"}
                    </h2>

                    {loading ? (
                        <div className="mt-4 flex justify-center">
                            <div className="w-8 h-8 border-4 border-orange-700 border-dashed rounded-full animate-spin"></div>
                        </div>
                    ) : error ? (
                        <p className="mt-4 text-red-600">{error}</p>
                    ) : (
                        <p className="mt-4 text-green-600">Redirecting to login page...</p>
                    )}
                </div>
            </aside>
        </div>
    );
}
