import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyOTP() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "";

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [message, setMessage] = useState("");
    const [timer, setTimer] = useState(0);
    const [isResendDisabled, setIsResendDisabled] = useState(false);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    useEffect(() => {
        if (message) {
            const timeout = setTimeout(() => setMessage(""), 5000);
            return () => clearTimeout(timeout);
        }
    }, [message]);

    const handleOtpChange = (index, value) => {
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < otp.length - 1) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    const handleResendOTP = async () => {
        setIsResendDisabled(true);
        setTimer(45);
        setMessage("Sending new OTP...");

        try {
            const response = await axios.post("http://localhost:4003/api/auth/sendEmail",
                {
                    email: email,
                    subject: "OTPVerification",
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
            if (response.status === 200) {
                setMessage("A new OTP has been sent to your email.");
            }
        } catch (error) {
            setMessage("Failed to send OTP. Please try again.");
        }
    };

    const handleVerifyOTP = async () => {
        const enteredOTP = otp.join("");
        if (enteredOTP.length !== 6) {
            setMessage("Please enter a valid 6-digit OTP.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:4003/api/auth/verify",
                {
                    email: email,
                    token: enteredOTP,
                    subject: "OTPVerification",
                });

            if (response.status === 200) {
                navigate("/reset-password", { state: { email } });
            } else {
                setMessage("Invalid OTP. Please try again.");
            }
        } catch (error) {
            setMessage("OTP verification failed. Please try again.");
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-7 mt-10 bg-gray-200 text-center">
            <h1 className="text-2xl font-medium mb-4">Verify OTP</h1>
            <p className="text-gray-700 mb-6">Enter the OTP sent to your email ({email}).</p>

            <div className="flex justify-center gap-3 mb-6">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        className="w-12 h-12 text-center text-xl border rounded focus:ring-2 focus:ring-orange-700"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                    />
                ))}
            </div>

            <button
                className="w-full px-6 py-3 font-medium text-white bg-orange-700 rounded-lg hover:opacity-75"
                onClick={handleVerifyOTP}
            >
                Verify OTP
            </button>

            <div className="mt-4">
                <button
                    className="text-orange-700 font-medium hover:underline"
                    onClick={handleResendOTP}
                    disabled={isResendDisabled || timer > 0}
                >
                    {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                </button>
            </div>

            {message && <p className="text-green-600 mt-4">{message}</p>}
        </div>
    );
}
