import React, { useState } from "react";

export default function CreateQuiz() {
    const [quizTitle, setQuizTitle] = useState("");
    const [quizDescription, setQuizDescription] = useState("");
    const [questions, setQuestions] = useState([]);

    // Handle adding a new question
    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                questionText: "",
                options: ["", "", "", ""],
                correctAnswer: "",
            },
        ]);
    };

    // Handle updating a question's text
    const handleQuestionChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].questionText = value;
        setQuestions(updatedQuestions);
    };

    // Handle updating an option's text
    const handleOptionChange = (qIndex, oIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options[oIndex] = value;
        setQuestions(updatedQuestions);
    };

    // Handle updating the correct answer
    const handleCorrectAnswerChange = (qIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].correctAnswer = value;
        setQuestions(updatedQuestions);
    };

    // Handle form submission
    const handleSubmit = () => {
        const quizData = {
            title: quizTitle,
            description: quizDescription,
            questions: questions,
        };

        console.log("Quiz Data:", quizData);
        // Send `quizData` to your backend using fetch or axios
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Create a New Quiz</h1>

            {/* Quiz Title */}
            <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Quiz Title"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
            />

            {/* Quiz Description */}
            <textarea
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Quiz Description"
                value={quizDescription}
                onChange={(e) => setQuizDescription(e.target.value)}
            />

            {/* Questions Section */}
            {questions.map((question, qIndex) => (
                <div key={qIndex} className="p-4 mb-6 bg-gray-100 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-2">Question {qIndex + 1}</h3>
                    <input
                        type="text"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        placeholder="Enter question text"
                        value={question.questionText}
                        onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                    />

                    {/* Options */}
                    {question.options.map((option, oIndex) => (
                        <input
                            key={oIndex}
                            type="text"
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            placeholder={`Option ${oIndex + 1}`}
                            value={option}
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
                            <option key={oIndex} value={option}>
                                {option || `Option ${oIndex + 1}`}
                            </option>
                        ))}
                    </select>
                </div>
            ))}

            {/* Add Question Button */}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                onClick={addQuestion}
            >
                Add Question
            </button>

            {/* Submit Button */}
            <button
                className="bg-green-500 text-white px-6 py-2 rounded"
                onClick={handleSubmit}
            >
                Submit Quiz
            </button>
        </div>
    );
}
