import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage } from "../../features/uploadImage/api";
import LoadingPage from "../LoadingPage/LoadingPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import { deleteImage, resetUploadImageState } from "../../features/uploadImage/slice";
import { createQuiz } from "../../features/createQuiz/api";
import { setTitle as setSliceTitle, setDescription as setSliceDescription, setStartTime as setSliceStartTime, setDuration as setSliceDuration, setQuestions as setSliceQuestions, resetState as resetCreateQuizAutoSaveSlice } from "../../features/createQuizAutoSave/slice";

export default function CreateQuiz() {
    const dispatch = useDispatch();
    const [quizTitle, setQuizTitle] = useState("");
    const [startTime, setStartTime] = useState("");
    const [duration, setDuration] = useState(0);
    const [quizDescription, setQuizDescription] = useState("");
    const [questions, setQuestions] = useState([]);
    const { urls, imageUploadLoading, imageUploadError } = useSelector((state) => state.uploadImage)
    const { createQuizLoading, createQuizError } = useSelector((state) => state.createQuiz)
    const { quizTitle: sliceQuizTitle, quizDescription: sliceQuizDesc, startTime: sliceStartTime, duration: sliceDuration, questions: sliceQuestions } = useSelector((state) => state.createQuizAutoSave)

    useEffect(() => {
        setQuizTitle(sliceQuizTitle)
        setQuizDescription(sliceQuizDesc)
        setStartTime(sliceStartTime)
        setDuration(sliceDuration)
        setQuestions(sliceQuestions)
    }, [sliceQuizTitle, sliceQuizDesc, sliceStartTime, sliceDuration, sliceQuestions])

    // Handle adding a new question
    const addQuestion = () => {
        let arr = [...questions]
        arr.push({
            question: "",
            options: [{ desc: "" }, { desc: "" }, { desc: "" }, { desc: "" }],
            correctAnswer: "",
            imageUrl: "",
        })
        setQuestions(arr)
        dispatch(setSliceQuestions({ questions: arr }))
    };

    const removeQuestion = () => {
        let arr = [...questions]
        arr.pop()
        setQuestions(arr)
        dispatch(setSliceQuestions({ questions: arr }))
    };

    // Handle updating a question's text
    const handleQuestionChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = { ...updatedQuestions[index], question: value };
        setQuestions(updatedQuestions);
        dispatch(setSliceQuestions({ questions: updatedQuestions }))
    };

    // Handle updating an option's text
    const handleOptionChange = (qIndex, oIndex, value) => {
        const updatedQuestions = [...questions];
        const updatedOptions = [...updatedQuestions[qIndex].options];
        updatedOptions[oIndex] = { ...updatedOptions[oIndex], desc: value };

        updatedQuestions[qIndex] = { ...updatedQuestions[qIndex], options: updatedOptions };
        setQuestions(updatedQuestions);
        dispatch(setSliceQuestions({ questions: updatedQuestions }));
    };

    // Handle updating the correct answer
    const handleCorrectAnswerChange = (qIndex, value) => {
        const updatedQuestions = [...questions];

        // Create a new object for the specific question instead of modifying it directly
        updatedQuestions[qIndex] = {
            ...updatedQuestions[qIndex],
            correctAnswer: value
        };

        setQuestions(updatedQuestions);
        dispatch(setSliceQuestions({ questions: updatedQuestions }));
    };

    //validating quiz data
    // Handle image upload for a question
    const handleImageUpload = async (qIndex, event) => {
        const file = event.target.files[0];
        if (!file) return;

        dispatch(uploadImage({ qIdx: qIndex, file }))
    };

    useEffect(() => {
        if (Object.entries(urls).length > 0) {
            const updatedQuestions = questions.map((q, index) =>
                urls[index] ? { ...q, imageUrl: urls[index] } : q
            );

            setQuestions(updatedQuestions);
            dispatch(setSliceQuestions({ questions: updatedQuestions }));
        }
    }, [urls]);

    // Validate quiz data before submission
    const validateQuiz = () => {
        if (!quizTitle.trim()) {
            alert("Quiz title is required.");
            return false;
        }

        if (!quizDescription.trim()) {
            alert("Quiz description is required.");
            return false;
        }

        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].question.trim()) {
                alert(`Question ${i + 1} must have text.`);
                return false;
            }

            for (let j = 0; j < questions[i].options.length; j++) {
                if (!questions[i].options[j].desc.trim()) {
                    alert(`All options for Question ${i + 1} must be filled.`);
                    return false;
                }
            }

            if (!questions[i].correctAnswer.trim()) {
                alert(`Correct answer for Question ${i + 1} must be selected.`);
                return false;
            }
        }

        return true;
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!validateQuiz()) {
            return;
        }
        
        const quizData = {
            title: quizTitle,
            description: quizDescription,
            questions: questions,
            startTime,
            duration
        };

        try {
            const res = await dispatch(createQuiz(quizData)).unwrap()
            dispatch(resetUploadImageState())
            dispatch(resetCreateQuizAutoSaveSlice())
            setQuizTitle("")
            setQuizDescription("")
            setStartTime("")
            setDuration("")
            setQuestions([])
        } catch (error) {
            console.log("Quiz creation failed: ", error)
        }
    };

    const handleReset = () => {
        dispatch(resetUploadImageState())
        dispatch(resetCreateQuizAutoSaveSlice())
        setQuizTitle("")
        setQuizDescription("")
        setStartTime("")
        setDuration("")
        setQuestions([])
    }

    if (imageUploadLoading || createQuizLoading) return <LoadingPage />
    if (imageUploadError || createQuizError) return <ErrorPage />

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Create a New Quiz</h1>

            {/* Quiz Title */}
            <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Quiz Title"
                value={quizTitle}
                onChange={(e) => {
                    setQuizTitle(e.target.value)
                    dispatch(setSliceTitle({ quizTitle: e.target.value }))
                }}
            />

            {/* Quiz Description */}
            <textarea
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Quiz Description"
                value={quizDescription}
                onChange={(e) => {
                    setQuizDescription(e.target.value)
                    dispatch(setSliceDescription({ quizDescription: e.target.value }))
                }}
            />

            <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => {
                    setStartTime(e.target.value)
                    dispatch(setSliceStartTime({ startTime: e.target.value }))
                }}
            />

            <input
                type="number"
                step={5}
                value={duration}
                onChange={(e) => {
                    setDuration(e.target.value)
                    dispatch(setSliceDuration({ duration: e.target.value }))
                }}
            />

            {/* Questions Section */}
            {questions.map((question, qIndex) => (
                <div key={qIndex} className="p-4 mb-6 bg-gray-100 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-2">Question {qIndex + 1}</h3>
                    <input
                        type="text"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        placeholder="Enter question text"
                        value={question.question}
                        onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                    />

                    {/* Image Upload */}
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full mb-2"
                        onChange={(e) => handleImageUpload(qIndex, e)}
                    />
                    {question.imageUrl && (
                        <div className="relative w-1/3 h-48 mt-2 rounded-lg bg-center bg-cover" style={{ backgroundImage: `url(${question.imageUrl})` }}>
                            {/* Close Button */}
                            <button
                                className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center hover:bg-red-500"
                                onClick={() => {
                                    setQuestions((prevQuestions) =>
                                        prevQuestions.map((q, index) =>
                                            index === qIndex ? { ...q, imageUrl: "" } : q
                                        )
                                    );
                                    dispatch(deleteImage({ qIdx: qIndex }))
                                }}
                            >
                                ✕
                            </button>
                        </div>

                    )}

                    {/* Options */}
                    {question.options.map((option, oIndex) => (
                        <input
                            key={oIndex}
                            type="text"
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            placeholder={`Option ${oIndex + 1}`}
                            value={option.desc}
                            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                        />
                    ))}

                    {/* Correct Answer */}
                    <select
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        value={question.correctAnswer}
                        onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                    >
                        <option value="">Select Correct Answer</option>
                        {question.options.map((option, oIndex) => (
                            <option key={oIndex} value={oIndex}>
                                {oIndex}
                            </option>
                        ))}
                    </select>
                </div>
            ))}

            {/* Add Question Button */}
            <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4 mx-1" onClick={addQuestion}>
                Add Question
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4 mx-1" onClick={removeQuestion}>
                Remove Question
            </button>
            {/* Submit Button */}
            <button className="bg-green-500 text-white px-6 py-2 rounded mb-4 mx-1" onClick={handleSubmit}>
                Submit Quiz
            </button>
            <button className="bg-green-500 text-white px-6 py-2 rounded mb-4 mx-1" onClick={handleReset}>
                Reset Quiz
            </button>
        </div>
    );
}