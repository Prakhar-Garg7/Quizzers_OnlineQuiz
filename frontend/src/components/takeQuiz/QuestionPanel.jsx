import { FaArrowCircleDown } from "react-icons/fa";

export default function QuestionPanel(props) {
    const { quiz, question, questionIdx, setQuestionIdx, selectedAnswers, handleSelectedAnswers, handleQuestionStatus, questionStatus, statusCountArr, handleTimestamps, handleSubmit } = props;
    return (
        <div className="w-[70%] h-auto py-10 px-7">
            {question && (
                <>
                    <div className="flex justify-between">
                        <h1 className="text-xl font-bold">Question {questionIdx + 1}:</h1>
                        <FaArrowCircleDown className="text-2xl text-blue-700" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })} />
                    </div>
                    <hr className="border-t-1 border-black mt-2 mb-5" />

                    <p className="px-3 text-xl">{question.question}</p>
                    {question.imageUrl && <img src={question.imageUrl} alt="question Image"></img>}

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

                    <hr className="border-t-1 border-[#8a8a8a] mt-5 mb-2" />

                    <button
                        className="p-1 text-white font-bold mx-2 bg-green-700 rounded-md px-2"
                        onClick={() => {
                            if (selectedAnswers[questionIdx] != -1) handleQuestionStatus(questionIdx, 3)
                            else handleQuestionStatus(questionIdx, 0)
                            setQuestionIdx(Math.min(questionIdx + 1, quiz.questions.length - 1))
                        }}
                    >
                        Save and Next
                    </button>
                    <button
                        className="p-1 text-white font-bold mx-2 bg-blue-700 rounded-md px-2"
                        onClick={() => {
                            if (selectedAnswers[questionIdx] != -1) handleQuestionStatus(questionIdx, 2)
                            else handleQuestionStatus(questionIdx, 0)
                        }}
                    >
                        Save and Mark for Review
                    </button>
                    <button
                        className="p-1 text-white font-bold mx-2 bg-red-600 rounded-md px-2"
                        onClick={() => {
                            handleQuestionStatus(questionIdx, 0)
                            handleSelectedAnswers(questionIdx, -1)
                        }}
                    >
                        Clear Response
                    </button>
                    <button
                        className="p-1 text-white font-bold mx-2 bg-purple-700 rounded-md px-2"
                        onClick={() => {
                            handleQuestionStatus(questionIdx, 1)
                            handleSelectedAnswers(questionIdx, -1)
                            setQuestionIdx(Math.min(questionIdx + 1, quiz.questions.length - 1))
                        }}
                    >
                        Mark for Review and Next
                    </button>

                    <div className="w-full flex justify-between py-2 px-2 mt-3 border-t-2 border-slate-300 bg-slate-100">
                        <div>
                            <button className="px-4 py-1 mr-2 bg-white border-2 border-slate-300 font-bold rounded-lg" onClick={() => {
                                if(questionStatus[questionIdx] != 2){
                                    if (selectedAnswers[questionIdx] != -1) handleQuestionStatus(questionIdx, 3)
                                    else handleQuestionStatus(questionIdx, 0)
                                }
                                handleTimestamps(questionIdx, 1)
                                setQuestionIdx(Math.max(questionIdx - 1, 0))
                            }}>Prev</button>
                            <button className="px-4 py-1 mr-2 bg-white border-2 border-slate-300 font-bold rounded-lg" onClick={() => {
                                if(questionStatus[questionIdx] != 2){
                                    if (selectedAnswers[questionIdx] != -1) handleQuestionStatus(questionIdx, 3)
                                    else handleQuestionStatus(questionIdx, 0)
                                }
                                handleTimestamps(questionIdx, 1)
                                setQuestionIdx(Math.min(questionIdx + 1, quiz.questions.length - 1))
                            }}>Next</button>
                        </div>
                        <button className="px-4 py-1 mr-2 bg-green-600 text-white font-bold rounded-lg" onClick={handleSubmit}>End Test</button>
                    </div>
                </>
            )}
        </div>
    )
}