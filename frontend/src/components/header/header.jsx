import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Menu (3 dots) & X (close)

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="shadow sticky z-50 top-0 bg-white">
            <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex justify-between items-center mx-auto max-w-screen-xl">

                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src="/logo.png" className="mr-2 h-12" alt="Logo" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `text-sm ${isActive ? "text-orange-500" : "text-gray-700"} hover:text-orange-700`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `text-sm ${isActive ? "text-orange-500" : "text-gray-700"} hover:text-orange-700`
                            }
                        >
                            About Us
                        </NavLink>
                        <NavLink
                            to="/createquiz"
                            className={({ isActive }) =>
                                `text-sm ${isActive ? "text-orange-500" : "text-gray-700"} hover:text-orange-700`
                            }
                        >
                            Create Quiz
                        </NavLink>
                        <NavLink
                            to="/allquizes"
                            className={({ isActive }) =>
                                `text-sm ${isActive ? "text-orange-500" : "text-gray-700"} hover:text-orange-700`
                            }
                        >
                            All Quiz
                        </NavLink>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                `text-sm ${isActive ? "text-orange-500" : "text-gray-700"} hover:text-orange-700`
                            }
                        >
                            Contact Us
                        </NavLink>
                    </div>

                    {/* Buttons */}
                    <div className="hidden lg:flex items-center">
                        <Link
                            to="/login"
                            className="text-gray-800 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm"
                        >
                            Log in
                        </Link>
                        <Link
                            to="/signup"
                            className="bg-orange-700 text-white hover:bg-orange-800 px-4 py-2 rounded-lg text-sm"
                        >
                            Get started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-gray-700"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* Mobile Sidebar */}
                <div
                    className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"
                        } transition-transform duration-300 lg:hidden`}
                >
                    <button
                        className="absolute top-4 right-4 p-2 text-gray-700"
                        onClick={() => setIsOpen(false)}
                    >
                        <X size={24} />
                    </button>

                    <ul className="mt-16 space-y-6 px-6">
                        <li>
                            <NavLink to="/" className="block text-gray-700" onClick={() => setIsOpen(false)}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className="block text-gray-700" onClick={() => setIsOpen(false)}>
                                About Us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/createquiz" className="block text-gray-700" onClick={() => setIsOpen(false)}>
                                Create Quiz
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/allquizes" className="block text-gray-700" onClick={() => setIsOpen(false)}>
                                All Quiz
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className="block text-gray-700" onClick={() => setIsOpen(false)}>
                                Contact Us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/github" className="block text-gray-700" onClick={() => setIsOpen(false)}>
                                Github
                            </NavLink>
                        </li>
                        <li>
                            <Link
                                to="/login"
                                className="block text-gray-800 py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Log in
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/signup"
                                className="block bg-orange-700 text-white py-2 px-4 rounded-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                Get started
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
