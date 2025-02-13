import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../contexts/Authcontext";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice/slice";
export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasErrors = false;
        const newErrors = { email: "", password: "" };

        if (!validateEmail(email)) {
            newErrors.email = "Please enter a valid email address.";
            hasErrors = true;
        }

        if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long.";
            hasErrors = true;
        }




        setErrors(newErrors);

        if (!hasErrors) {
            try{
                const result = await login(email, password);
                dispatch(setUser(result));
                alert("Login successfull")
                navigate("/")
            }catch(error){
                console.error(error);
                alert("Login failed");
            }
            
        }
    };

    return (
        <div className="mx-auto w-full max-w-7xl">
            <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
                <div className="relative z-10 max-w-screen-md px-4 py-12 sm:py-20 mx-auto bg-white rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-center sm:text-4xl">Login to Quizzers</h2>
                    <form className="space-y-6 mt-10" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className={`mt-1 block w-full px-4 py-3 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg shadow-sm`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className={`mt-1 block w-full px-4 py-3 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg shadow-sm`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <button type="submit" className="w-full px-6 py-3 text-white bg-orange-700 rounded-lg font-medium hover:opacity-75">
                            Login
                        </button>
                    </form>

                    <div className="text-center">
                        <Link to="/forgot-password" className="text-orange-700 text-sm hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <p className="text-center mt-4 text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-orange-700 hover:underline">Sign up here</Link>
                    </p>
                </div>
            </aside>
        </div>
    );
}
