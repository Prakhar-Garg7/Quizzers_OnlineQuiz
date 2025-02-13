import { useParams } from "react-router-dom";
import useQuizReport from "../../../hooks/useQuizReport";
import { useSelector } from "react-redux";

export default function QuizReport() {
    const { quizId } = useParams()
    const { quiz } = useQuizReport(quizId)
    const { score,
        maxScore,
        error,
        markedAnswers,
        correctAnswers,
        timeSpent,
        loading } = useSelector((state) => state.getQuizReport)
    
    return(
        <>
            
        </>
    )
}