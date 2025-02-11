import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <aside className="relative overflow-hidden text-black rounded-lg flex flex-col-reverse sm:flex-row items-center sm:items-start sm:justify-between sm:py-16 py-10">
                <div className="relative z-10 sm:w-1/2 text-center sm:text-left">
                    <h2 className="text-3xl sm:text-5xl font-bold">
                        Welcome to Quizzers
                        <span className="block text-xl sm:text-2xl text-orange-700">Your Ultimate Quiz Platform</span>
                    </h2>
                    <p className="text-gray-600 text-lg mt-4">
                        Create interactive quizzes, challenge your friends, and track your performance – all in one place. Join our community to make learning fun and engaging!
                    </p>
                    <Link
                        className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75 mt-6"
                        to="/signup"
                    >
                        <svg
                            fill="white"
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                        >
                            <path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z" />
                        </svg>
                        &nbsp; Get Started
                    </Link>
                </div>
                <div className="w-full sm:w-1/2 flex justify-center sm:justify-end mb-6 sm:mb-0">
                    <img className="w-80 sm:w-96" src="https://media.istockphoto.com/id/1356323195/photo/quiz-word-sitting-next-to-a-white-alarm-clock-on-blue-background.jpg?s=612x612&w=0&k=20&c=mrFwb4WRTUDq1EQLfyUMmyRX30LW49bahlkEvOf84j4=" alt="Quiz" />
                </div>
            </aside>

            {/* Image Section */}
            <div className="grid place-items-center sm:mt-20 mt-10">
                <img className="w-48 sm:w-96" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfR6jYXjVm9JQxs3YVk7LzmxOdy3omQgJqcg&s" alt="Quiz Fun" />
            </div>

            {/* Intro Section */}
            <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">Why Choose Quizzers?</h1>
            <p className="text-center max-w-3xl mx-auto text-gray-700 text-lg sm:text-xl px-4">
                Quizzers is a user-friendly platform where educators, students, and quiz enthusiasts can create, share, and take quizzes effortlessly. Whether it's for academic purposes or just for fun, our platform makes quiz creation and participation seamless.
            </p>

            {/* Key Features Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4 py-12 text-center">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-orange-700">Create Quizzes</h3>
                    <p className="mt-2 text-gray-600">Design personalized multiple-choice quizzes with ease.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-orange-700">Participate & Track</h3>
                    <p className="mt-2 text-gray-600">Users can participate in quizzes and track their scores in real-time.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-orange-700">Collaborative Learning</h3>
                    <p className="mt-2 text-gray-600">Encourage collaborative learning by sharing quizzes with friends.</p>
                </div>
            </div>
        </div>
    );
}
