import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuiz } from "../src/features/getQuiz/api";

export default function useQuizReport(quizId) {
    const dispatch = useDispatch()
    const { quizzes, loading, error } = useSelector((state) => state.getQuiz)
    const [quiz, setQuiz] = useState(null)
    useEffect(() => {
        if (quizId && quizzes && quizzes[quizId]) {
            setQuiz(quizzes[quizId]);
        } else {
            if (quizId && !quizzes[quizId]) {
                dispatch(fetchQuiz(quizId));
            }
        }
    }, [quizId, quizzes, dispatch])

    return {
        quiz
    }
}