import { useSelector } from "react-redux";

export default function useQuizReport(quizId){
    const {score, maxScore, error, markedAnswers, timeSpent, loading} = useSelector((state) => state.getQuizReport)
}