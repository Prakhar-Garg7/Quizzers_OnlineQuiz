import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        setMessage("");
        try {
            const response=await fetch("API call krenge baad me",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email}),
        }); 
        if(response.ok)
        {
            setMessage("Password reset link has been sent to your registered email.")
        }
        else{
            const mssg=await response.json();
            alert(`Error: ${mssg.message}`)
        }             
        } catch (error) {
            alert(`Network error: ${error.message}`);
        }
    };

    return (
        <div className="mx-auto w-full max-w-7xl">
            {/* Header Section */}
            <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">Forgot Password</h1>
            <p className="text-center max-w-2xl mx-auto text-gray-700 text-lg sm:text-xl px-4">
                Enter your registered email below, and we will send you a link to reset your password.
            </p>
            {/* Image Section */}
            <div className="grid place-items-center sm:mt-12">
                <img className="sm:w-32 w-12" src="https://cdn-icons-png.flaticon.com/512/747/747852.png" alt="Forgot Password" />
            </div>


            {/* Form Section */}
            <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-7 mt-2 pb-3 bg-gray-200">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold text-lg mb-2">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-700"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-6 py-3 font-medium text-white bg-orange-700 rounded-lg hover:opacity-75"
                    >
                        Send Reset Link
                    </button>
                    {/* Back to Login */}
                    <div className="text-center mt-3 p-1">
                        <Link to="/login" className="text-orange-700 font-medium hover:underline">
                            Back to Login
                        </Link>
                    </div>
                </form>
                {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
            </div>
            <div className="pb-5"></div>


        </div>
    );
}