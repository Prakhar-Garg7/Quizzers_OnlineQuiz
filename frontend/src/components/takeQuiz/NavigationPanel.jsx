import LoadingPage from "../LoadingPage/LoadingPage";

export default function NavigationPanel(props) {
    const { questionStatus, statusCountArr, quiz, questionIdx, setQuestionIdx, handleQuestionStatus, selectedAnswers, handleTimestamps } = props;

    const statusList = [
        { label: "Not Answered", border: "border-red-700", bg: "bg-red-300" },
        { label: "Marked for Review", border: "border-blue-800", bg: "bg-blue-200" },
        { label: "Answered & Marked for Review", border: "border-blue-800", bg: "bg-blue-400" },
        { label: "Answered", border: "border-green-700", bg: "bg-green-400" },
        { label: "Not Visited", border: "border-slate-700", bg: "bg-slate-200" }
    ];
    
    return (
        <div className="w-[30%] h-auto py-10 px-7">
            {statusList.map((status, idx) => (
                <div key={idx} className="mb-2">
                    <span className={`px-3 border-2 ${status.border} mr-2 rounded-md ${status.bg}`}>{statusCountArr[idx]}</span>
                    <span>{status.label}</span>
                </div>
            ))}
            {quiz && quiz.questions && (
                <div className="w-full h-auto mt-5">
                    {quiz.questions.map((_, qIdx) => (
                        <button
                            key={qIdx}
                            onClick={() => {
                                if (questionStatus[questionIdx] != 2) {
                                    if (selectedAnswers[questionIdx] != -1) handleQuestionStatus(questionIdx, 3)
                                    else handleQuestionStatus(questionIdx, 0)
                                }
                                handleTimestamps(questionIdx, 1)
                                setQuestionIdx(qIdx)
                            }}
                            className={`px-3 border-2 mr-2 rounded-md ${statusList[questionStatus[qIdx]].border} ${statusList[questionStatus[qIdx]].bg}`}
                        >
                            {qIdx + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
