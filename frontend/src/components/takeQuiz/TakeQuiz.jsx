import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import useQuizHandler from "../../../hooks/useQuizHandler";
import { useCountdownTimer } from "../../../hooks/useCountdownTimer";
import QuizTop from "./QuizTop";
import QuestionPanel from "./QuestionPanel";
import NavigationPanel from "./NavigationPanel";
import LoadingPage from "../LoadingPage/LoadingPage";
import ErrorPage from "../ErrorPage/ErrorPage";

export default function TakeQuiz() {
    const { quizId } = useParams()

    const {
        loading,
        error,
        quiz,
        setQuiz,
        questionIdx,
        setQuestionIdx,
        question,
        selectedAnswers,
        questionStatus,
        statusCountArr,
        handleSelectedAnswers,
        handleQuestionStatus,
        handleTimestamps,
        handleSubmit
    } = useQuizHandler(quizId);

    const {
        timeLeft
    } = useCountdownTimer(60000, handleSubmit);

    if (loading) return <LoadingPage />
    if (error) {
        return <ErrorPage />
    }

    return (
        <>
            {quiz && quiz.questions && Object.keys(questionStatus).length > 0 &&
                (
                    <div>
                        <QuizTop title={quiz.title} timeLeft={timeLeft} />
                        <div className="flex h-auto">
                            <QuestionPanel
                                {...{ quiz, question, questionIdx, setQuestionIdx, selectedAnswers, handleSelectedAnswers, handleQuestionStatus, questionStatus, statusCountArr, handleTimestamps, handleSubmit }}
                            />
                            <NavigationPanel {...{ questionStatus, statusCountArr, quiz, questionIdx, setQuestionIdx, handleQuestionStatus, selectedAnswers, handleTimestamps }} />
                        </div>
                    </div>
                )
            }
        </>
    )
}