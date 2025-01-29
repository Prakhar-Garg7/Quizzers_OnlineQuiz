import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        let hasErrors = false;
        const newErrors = { email: "", password: "" };

        // Email validation
        if (!validateEmail(email)) {
            newErrors.email = "Please enter a valid email address.";
            hasErrors = true;
        }

        // Password length validation
        if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long.";
            hasErrors = true;
        }

        setErrors(newErrors);

        if (!hasErrors) {
            try {
                const response = await fetch("http://localhost:4003/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (response.ok) {
                    alert("Login successful!");
                    setEmail("");
                    setPassword("");
                    
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.message}`);
                }
            } catch (error) {
                alert(`Network error: ${error.message}`);
            }
        }
    };

    return (
        <div className="mx-auto w-full max-w-7xl">
            {/* Login Section */}
            <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
                <div className="relative z-10 max-w-screen-md px-4 py-12 sm:py-20 mx-auto sm:px-6 lg:px-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-center sm:text-4xl">Login to Quizzers</h2>
                    <p className="text-gray-600 text-center mt-4">Welcome back! Please enter your details to continue.</p>

                    <form className="space-y-6 mt-10" onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className={`mt-1 block w-full px-4 py-3 border ${errors.email ? "border-red-500" : "border-gray-300"
                                    } rounded-lg shadow-sm focus:ring-orange-700 focus:border-orange-700 sm:text-sm`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className={`mt-1 block w-full px-4 py-3 border ${errors.password ? "border-red-500" : "border-gray-300"
                                    } rounded-lg shadow-sm focus:ring-orange-700 focus:border-orange-700 sm:text-sm`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full px-6 py-3 text-white bg-orange-700 rounded-lg font-medium hover:opacity-75"
                        >
                            Login
                        </button>
                    </form>

                    {/* Google Login Button */}
                    <div className="mt-6 text-center">
                        <button
                            className="inline-flex items-center px-6 py-3 text-white bg-red-600 rounded-lg font-medium hover:opacity-75"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="mr-2"
                                fill="white"
                            >
                                <path d="M21.35 11.1h-9.34v2.73h5.66a5.08 5.08 0 01-2.16 3.35v2.8h3.48c2-1.84 3.36-4.57 3.36-7.88 0-.92-.1-1.82-.3-2.7zm-9.34 6.48a5.42 5.42 0 01-4.94-3.36h-2.9v2.85a9.27 9.27 0 007.84 4.3c2.28 0 4.34-.79 5.97-2.09l-2.94-2.66a5.19 5.19 0 01-3.03.96zm-7.84-6.73h2.85a5.42 5.42 0 010-3.1h-2.85v3.1zm0-4.35h2.9a5.42 5.42 0 014.94-3.36v-2.85a9.27 9.27 0 00-7.84 4.3zm7.84-6.48v2.85a5.42 5.42 0 014.9 3.36h2.91a9.27 9.27 0 00-7.81-4.3z" />
                            </svg>
                            Login with Google
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <p className="text-center mt-4 text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-orange-700 hover:underline">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </aside>
        </div>
    );
}
