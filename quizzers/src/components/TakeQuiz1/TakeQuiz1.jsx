import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchQuiz } from "../../features/quiz/api";
import LoadingPage from "../LoadingPage/LoadingPage";
import { FaArrowCircleDown } from "react-icons/fa";

export default function TakeQuiz1() {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const { quizzes, loading, error } = useSelector((state) => state.quiz)
    const [quiz, setQuiz] = useState(null);
    const [question, setQuestion] = useState(null);
    const [questionIdx, setQuestionIdx] = useState(0)
    const [statusCountArr, setStausCountArr] = useState(new Array(5).fill(4))
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [questionStatus, setQuestionStatus] = useState({});     // status: 0 -> unanswered, 1 -> mark for review and next, 2 -> save and mark for review, 3 -> save and next, 4 -> unvisited
    const [timeLeft, setTimeLeft] = useState(600);
    const timerRef = useRef(null);
    const dispatch = useDispatch()

    useEffect(() => {
        if (quizId in quizzes) setQuiz(quizzes[quizId])
        else {
            dispatch(fetchQuiz(quizId))
            setQuiz(quizzes[quizId])
        }
    }, [quizId, quizzes, dispatch]);

    const handleSelectedAnswers = (qIdx, nVal) => {
        const newSelectedAnswers = {};
        for (let i = 0; i < quiz.questions.length; i++) {
            newSelectedAnswers[i] = selectedAnswers[i]
        }
        newSelectedAnswers[qIdx] = nVal;
        setSelectedAnswers(newSelectedAnswers)
    }

    const handleQuestionStatus = (qIdx, nVal) => {
        const newStatus = {};
        for (let i = 0; i < quiz.questions.length; i++) {
            newStatus[i] = questionStatus[i]
        }
        newStatus[qIdx] = nVal;
        setQuestionStatus(newStatus)
    }

    useEffect(() => {
        if (quiz && quiz.questions) {
            setQuestion(quiz.questions[questionIdx]);

            setSelectedAnswers(prev => {
                const newSelectedAnswers = {};
                for (let i = 0; i < quiz.questions.length; i++) {
                    newSelectedAnswers[i] = -1;
                }
                return newSelectedAnswers;
            });

            setQuestionStatus(prev => {
                const newStatus = {};
                for (let i = 0; i < quiz.questions.length; i++) {
                    newStatus[i] = 4;
                }
                newStatus[0] = 0;
                return newStatus;
            });

            setStausCountArr(prev => prev.map((val, i) => (i === 0 ? 1 : 0)));
            setStausCountArr(prev => prev.map((val, i) => (i === 4 ? (quiz.questions.length - 1) : val)));
        }
    }, [quiz]);


    useEffect(() => {
        if (quiz && quiz.questions) {
            setQuestion(quiz.questions[questionIdx]);
            if (questionStatus[questionIdx] == 4) {
                const newStatus = {}
                for (let i = 0; i < quiz.questions.length; i++) {
                    if (i == questionIdx) newStatus[i] = 0
                    else newStatus[i] = questionStatus[i]
                }
                setQuestionStatus(newStatus)
            }

            let countArr = new Array(5).fill(0)
            for (const [idx, status] of Object.entries(questionStatus)) {
                if (status == 4) continue
                countArr[status]++;
            }
            let sum = 0
            for (let i = 0; i < 4; i++) sum += countArr[i]
            countArr[4] = quiz.questions.length - sum
            setStausCountArr(countArr)
        }
    }, [questionIdx]);

    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [timeLeft]);

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
        <>
            {quiz &&
                (<div>
                    <div className="h-auto py-3 px-7 flex justify-between bg-green-600">
                        <h1 className="text-4xl font-bold text-white">{quiz.title}</h1>
                        <div>
                            <span className="text-lg font-semibold text-white">Remaining time: </span>
                            <span className="text-xl bg-white text-black rounded-sm p-1">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</span>
                        </div>
                    </div>
                    <div className="flex h-auto">
                        <div className="w-[70%] border-2 border-green-300 h-auto py-10 px-7">
                            {question && (
                                <>
                                    <div className="flex justify-between">
                                        <h1 className="text-xl font-bold">Question {questionIdx + 1}:</h1>
                                        <FaArrowCircleDown className="text-2xl text-blue-700" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })} />
                                    </div>
                                    <hr className="border-t-1 border-black mt-2 mb-5" />

                                    <p className="px-3 text-xl">{question.question}</p>

                                    {question.options.map((option, oIndex) => (
                                        <div key={oIndex} className="flex items-center my-2 px-3 text-xl">
                                            <input
                                                type="radio"
                                                checked={selectedAnswers[questionIdx] === oIndex}
                                                onChange={() => handleSelectedAnswers(questionIdx, oIndex)}
                                                className="mr-2"
                                            />
                                            <label>{option.desc}</label>
                                        </div>
                                    ))}

                                    <hr className="border-t-1 border-black mt-5 mb-2" />

                                    <button
                                        className="p-1 text-white font-bold mx-2 bg-green-700"
                                        onClick={() => {
                                            handleQuestionStatus(questionIdx, 3)
                                            setQuestionIdx(Math.min(questionIdx + 1, quiz.questions.length - 1))
                                        }}
                                    >
                                        SAVE AND NEXT
                                    </button>
                                    <button
                                        className="p-1 text-white font-bold mx-2 bg-yellow-300"
                                        onClick={() => handleQuestionStatus(questionIdx, 2)}
                                    >
                                        SAVE AND MARK FOR REVIEW
                                    </button>
                                    <button
                                        className="p-1 text-black font-bold border-2 border-black mx-2 bg-white"
                                        onClick={() => {
                                            handleQuestionStatus(questionIdx, 0)
                                            handleSelectedAnswers(questionIdx, -1)
                                        }}
                                    >
                                        CLEAR RESPONSE
                                    </button>
                                    <button
                                        className="p-1 text-white font-bold mx-2 bg-blue-900"
                                        onClick={() => {
                                            handleQuestionStatus(questionIdx, 1)
                                            setQuestionIdx(Math.min(questionIdx + 1, quiz.questions.length - 1))
                                        }}
                                    >
                                        MARK FOR REVIEW AND NEXT
                                    </button>

                                    <div className="w-full flex justify-between py-2 px-2 mt-3 border-t-2 border-slate-300 bg-slate-100">
                                        <div>
                                            <button className="px-2 py-2 mr-2 bg-white border-2 border-slate-300 font-bold" onClick={() => setQuestionIdx(Math.max(questionIdx - 1, 0))}>BACK</button>
                                            <button className="px-2 py-2 mr-2 bg-white border-2 border-slate-300 font-bold" onClick={() => {
                                                if (selectedAnswers[questionIdx] != -1) handleQuestionStatus(questionIdx, 3)
                                                setQuestionIdx(Math.min(questionIdx + 1, quiz.questions.length - 1))
                                            }}>NEXT</button>
                                        </div>
                                        <button className="px-2 py-2 mr-2 bg-green-600 text-white font-bold" onClick={() => handleSubmit}>SUBMIT</button>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="w-[30%] border-2 border-blue-300 h-auto py-10 px-7">
                            <div className="mb-2"><span className="px-3 border-2 border-slate-700 mr-2 rounded-md bg-slate-200">{statusCountArr[4]}</span><span>Not Visited</span></div>
                            <div className="mb-2"><span className="px-3 border-2 border-red-700 mr-2 rounded-md bg-red-300">{statusCountArr[0]}</span><span>Not Answered</span></div>
                            <div className="mb-2"><span className="px-3 border-2 border-green-700 mr-2 rounded-md bg-green-400">{statusCountArr[3]}</span><span>Answered</span></div>
                            <div className="mb-2"><span className="px-3 border-2 border-blue-800 mr-2 rounded-md bg-blue-200">{statusCountArr[1]}</span><span>Marked for Review</span></div>
                            <div className="mb-2"><span className="px-3 border-2 border-blue-800 mr-2 rounded-md bg-blue-400">{statusCountArr[2]}</span><span>Answered & Marked for Review (will be considered for evaulation)</span></div>

                            <div className="w-full h-auto mt-5">
                                {quiz.questions.map((ques, qIdx) => {
                                    const status = questionStatus[qIdx];

                                    return (
                                        <button
                                            key={qIdx}
                                            onClick={() => setQuestionIdx(qIdx)}
                                            className={`px-3 border-2 mr-2 rounded-md 
                                                ${status === 4 ? "border-slate-700 bg-slate-200" : ""}
                                                ${status === 0 ? "border-red-700 bg-red-300" : ""}
                                                ${status === 3 ? "border-green-700 bg-green-400" : ""}
                                                ${status === 1 ? "border-blue-800 bg-blue-200" : ""}
                                                ${status === 2 ? "border-blue-800 bg-blue-400" : ""}
                                            `}
                                        >
                                            {qIdx + 1}
                                        </button>
                                    );
                                })}

                            </div>
                        </div>
                    </div>
                </div>)
            }
        </>
    );
}
