import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyOTP() {
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "";

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const response = await axios.post("API Call Baad Mein Karenge", { email, otp });

            if (response.status === 200) {
                setMessage("OTP Verified! Redirecting...");
                setTimeout(() => navigate("/reset-password", { state: { email } }), 1500);
            }
        } catch (error) {
            if (error.response) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert(`Network error: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-7xl">
            {/* Header */}
            <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">Verify OTP</h1>
            <p className="text-center max-w-2xl mx-auto text-gray-700 text-lg sm:text-xl px-4">
                We have sent a verification code to <span className="font-semibold">{email}</span>.
            </p>

            {/* Form */}
            <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-7 mt-2 pb-3 bg-gray-200">
                <form onSubmit={handleVerifyOTP}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold text-lg mb-2">Enter OTP</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-700"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-6 py-3 font-medium text-white bg-orange-700 rounded-lg hover:opacity-75"
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>
                {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
            </div>
        </div>
    );
}
