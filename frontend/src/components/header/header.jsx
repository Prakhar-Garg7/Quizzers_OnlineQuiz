import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import { logout } from "../../contexts/Authcontext";
import { clearUser } from "../../features/userSlice/slice";
import { motion } from "framer-motion";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const handleLogout = async () => {
        try {
            await logout();
            dispatch(clearUser());
            setShowLogoutModal(false);
            navigate("/login");
        } catch (error) {
            alert("Something went wrong: Logout failed");
            console.error("Logout failed:", error.message);
        }
    };

    return (
        <header className="shadow sticky z-50 top-0 bg-white">
            <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img src="/logo.png" className="mr-2 h-12" alt="Logo" />
                    </Link>
                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <NavLink to="/" className={({ isActive }) => `text-sm ${isActive ? "text-orange-500" : "text-gray-700"} hover:text-orange-700`}>Home</NavLink>
                        <NavLink to="/about" className={({ isActive }) => `text-sm ${isActive ? "text-orange-500" : "text-gray-700"} hover:text-orange-700`}>About Us</NavLink>
                        {user && (
                            <>
                                <NavLink to="/admin" className={({ isActive }) => `text-sm ${isActive ? "text-orange-500" : "text-gray-700"} hover:text-orange-700`}>Profile</NavLink>
                                <NavLink to="/allquizes" className={({ isActive }) => `text-sm ${isActive ? "text-orange-500" : "text-gray-700"} hover:text-orange-700`}>All Quiz</NavLink>
                                {user.role === "teacher" && (<NavLink to="/createquiz" className={({ isActive }) => `text-sm ${isActive ? "text-orange-500" : "text-gray-700"} hover:text-orange-700`}>Create Quiz</NavLink>)}
                            </>
                        )}
                        <NavLink to="/contact" className={({ isActive }) => `text-sm ${isActive ? "text-orange-500" : "text-gray-700"} hover:text-orange-700`}>Contact Us</NavLink>
                    </div>
                    {/* Desktop Login/Logout Buttons */}
                    <div className="hidden lg:flex items-center">
                        {user ? (
                            <button
                                onClick={() => setShowLogoutModal(true)}
                                className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg text-sm"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-800 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm">Log in</Link>
                                <Link to="/signup" className="bg-orange-700 text-white hover:bg-orange-800 px-4 py-2 rounded-lg text-sm">Get started</Link>
                            </>
                        )}
                    </div>
                    {/* Mobile Menu Button */}
                    <button className="lg:hidden p-2 text-gray-700" onClick={() => setIsOpen(true)}>
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu (Side Panel) */}
            {isOpen && (
                <>
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-6"
                    >
                        <button className="absolute top-4 right-4" onClick={() => setIsOpen(false)}>
                            <X size={24} />
                        </button>
                        <div className="flex flex-col space-y-6 mt-10">
                            <NavLink to="/" className="text-lg text-gray-700 hover:text-orange-700" onClick={() => setIsOpen(false)}>Home</NavLink>
                            <NavLink to="/about" className="text-lg text-gray-700 hover:text-orange-700" onClick={() => setIsOpen(false)}>About Us</NavLink>
                            {user && (
                                <>
                                    {user.role === "teacher" && (<NavLink to="/createquiz" className="text-lg text-gray-700 hover:text-orange-700" onClick={() => setIsOpen(false)}>Create Quiz</NavLink>)}
                                    <NavLink to="/allquizes" className="text-lg text-gray-700 hover:text-orange-700" onClick={() => setIsOpen(false)}>All Quiz</NavLink>
                                    <NavLink to="/admin" className="text-lg text-gray-700 hover:text-orange-700" onClick={() => setIsOpen(false)}>Profile</NavLink>
                                </>
                            )}
                            <NavLink to="/contact" className="text-lg text-gray-700 hover:text-orange-700" onClick={() => setIsOpen(false)}>Contact Us</NavLink>
                            {user ? (
                                <button
                                    onClick={() => { setShowLogoutModal(true); setIsOpen(false); }}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link to="/login" className="text-gray-800 px-4 py-2 rounded-lg" onClick={() => setIsOpen(false)}>Log in</Link>
                                    <Link to="/signup" className="bg-orange-700 text-white px-4 py-2 rounded-lg" onClick={() => setIsOpen(false)}>Get started</Link>
                                </>
                            )}
                        </div>
                    </motion.div>

                    {/* Overlay to close menu */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black z-40"
                        onClick={() => setIsOpen(false)}
                    />
                </>
            )}

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-lg font-semibold mb-4">Are you sure you want to logout?</h2>
                        <div className="flex justify-center space-x-4">
                            <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg">Yes</button>
                            <button onClick={() => setShowLogoutModal(false)} className="bg-gray-300 px-4 py-2 rounded-lg">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
