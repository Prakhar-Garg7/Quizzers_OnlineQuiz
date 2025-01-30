import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
    const [newpassword, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage("");

        if (newpassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:4003/api/auth/setNewPassword", 
            { 
                email: email, 
                newPassword:newpassword, 
            });

            if (response.status === 200) {
                setMessage("Password updated successfully!");
                setTimeout(() => navigate("/login"), 2000);
            }
        } catch (error) {
            if (error.response) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert(`Network error: ${error.message}`);
            }
        }
    };

    return (
        <div className="mx-auto w-full max-w-7xl">
            {/* Header */}
            <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">Reset Password</h1>
            <p className="text-center max-w-2xl mx-auto text-gray-700 text-lg sm:text-xl px-4">
                Enter your new password below.
            </p>

            {/* Form */}
            <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-7 mt-2 pb-3 bg-gray-200">
                <form onSubmit={handleResetPassword}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold text-lg mb-2">New Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-700"
                            placeholder="Enter new password"
                            value={newpassword}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold text-lg mb-2">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-700"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-6 py-3 font-medium text-white bg-orange-700 rounded-lg hover:opacity-75"
                    >
                        Reset Password
                    </button>
                </form>
                {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
            </div>
        </div>
    );
}
