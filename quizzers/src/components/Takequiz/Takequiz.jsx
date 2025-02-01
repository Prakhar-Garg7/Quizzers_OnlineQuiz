import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchQuiz } from "../../features/quiz/api";
import LoadingPage from "../LoadingPage/LoadingPage";

export default function TakeQuiz() {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const { quizzes, loading, error } = useSelector((state) => state.quiz)
    const [quiz, setQuiz] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(600);
    const timerRef = useRef(null);
    const dispatch = useDispatch()

    useEffect(() => {
        if (quizId in quizzes) setQuiz(quizzes[quizId])
        else {
            dispatch(fetchQuiz(quizId))
            setQuiz(quizzes[quizId])
        }
    }, [quizId]);

    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit(); // Auto-submit when time is up
            return;
        }

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [timeLeft]);

    const handleAnswerSelect = (qIndex, optionIndex) => {
        setSelectedAnswers({ ...selectedAnswers, [qIndex]: optionIndex });
    };

    const handleSubmit = async () => {
        clearInterval(timerRef.current);
        const answersArray = quiz.questions.map((_, qIndex) =>
            selectedAnswers[qIndex] !== undefined ? selectedAnswers[qIndex] : -1
        );
        try {
            const response = await axios.post(`http://localhost:4003/api/quiz/evaluate/${quizId}`,
                {
                    userAnswers: answersArray
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );

            console.log("res: ", response);

            if (response.status === 200) {
                alert("Quiz submitted successfully!");
                navigate("/");
            } else {
                alert("Submission failed");
            }
        } catch (error) {
            console.error(error);
            alert("Network error");
        }
    };

    if (loading) return <LoadingPage />
    if (error) {
        return <ErrorPage />
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            {quiz ? (
                <>
                    <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
                    <p className="text-lg mb-6">{quiz.description}</p>
                    <p className="text-red-500 font-bold mb-4">
                        Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
                    </p>
                    {quiz.questions.map((q, qIndex) => (
                        <div key={qIndex} className="p-4 mb-6 bg-gray-100 rounded-lg shadow">
                            <h3 className="text-xl font-semibold mb-2">
                                {qIndex + 1}. {q.question}
                            </h3>
                            {q.options.map((option, oIndex) => (
                                <div key={oIndex} className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        name={`question-${qIndex}`}
                                        value={oIndex}
                                        checked={selectedAnswers[qIndex] === oIndex}
                                        onChange={() => handleAnswerSelect(qIndex, oIndex)}
                                        className="mr-2"
                                    />
                                    <label>{option.desc}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button className="bg-green-500 text-white px-6 py-2 rounded" onClick={handleSubmit}>
                        Submit Quiz
                    </button>
                </>
            ) : (
                <p>Loading quiz...</p>
            )}
        </div>
    );
}
