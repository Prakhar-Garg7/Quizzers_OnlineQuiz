import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuizzes } from "../../features/getQuiz/api";
import LoadingPage from "../LoadingPage/LoadingPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import { resetState } from "../../features/quizAutoSave/slice";


export default function AllQuizzes() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { quizzes, error, loading } = useSelector((state) => state.getQuiz)

    useEffect(() => {
        if (!quizzes.length) {
            dispatch(fetchAllQuizzes())
        }
    }, [dispatch, quizzes.length]);

    const handleQuizClick = (quizId) => {
        navigate(`/takequiz/${quizId}`);
    };

    if (loading) {
        return <LoadingPage />;
    }

    if (error) {
        return <ErrorPage/>
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">All Quizzes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Object.entries(quizzes).map(([id, quiz]) => (
                    <div
                        key={id}
                        className="p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition"
                        onClick={() => handleQuizClick(id)}
                    >
                        <h3 className="text-xl font-semibold">{quiz.title}</h3>
                        <p className="text-gray-600">{quiz.description}</p>
                    </div>
                ))}
            </div>
            <button onClick={() => {
                dispatch(resetState())
            }}>Delete quizAutoSave Data</button>
        </div>
    );

}
