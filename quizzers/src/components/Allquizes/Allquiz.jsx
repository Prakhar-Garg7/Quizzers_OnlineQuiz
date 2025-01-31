import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AllQuizzes() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchQuizzes() 
        {
            try {
                const response = await axios.get("http://localhost:4003/api/quiz/get", 
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                setQuizzes(response.data.quizzes);  
                setLoading(false);
            } catch (error) {
                console.error("Error fetching quizzes:", error);
                alert("Failed to load quizzes.");
                setLoading(false);
            }
        }
        fetchQuizzes();
    }, []);

    const handleQuizClick = (quizId) => {
        navigate(`/takequiz/${quizId}`);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">All Quizzes</h1>
            {loading ? (
                <p className="text-center">Loading quizzes...</p>
            ) : quizzes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {quizzes.map((quiz) => (
                        <div
                            key={quiz._id}
                            className="p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition"
                            onClick={() => handleQuizClick(quiz._id)}
                        >
                            <h3 className="text-xl font-semibold">{quiz.title}</h3>
                            <p className="text-gray-600">{quiz.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No quizzes available.</p>
            )}
        </div>
    );
}
