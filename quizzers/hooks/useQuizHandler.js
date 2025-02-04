import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { fetchQuiz } from '../src/features/getQuiz/api';
import { setAnswer, setQIdx, setStatus } from '../src/features/quizAutoSave/slice';

export function useQuizHandler(quizId) {
    const dispatch = useDispatch()
    const { quizzes, loading, error } = useSelector((state) => state.getQuiz)
    const [quiz, setQuiz] = useState(null);
    const [question, setQuestion] = useState(null);
    const [questionIdx, setQuestionIdx] = useState(0)
    const [statusCountArr, setStatusCountArr] = useState(new Array(5).fill(0))
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [questionStatus, setQuestionStatus] = useState({});
    const { qIdx, sAnswers, qStatus } = useSelector((state) => state.quizAutoSave)

    const handleSelectedAnswers = (qIdx, nVal) => {
        const newSelectedAnswers = { ...selectedAnswers, [qIdx]: nVal };
        setSelectedAnswers(newSelectedAnswers);
        dispatch(setAnswer({ newAnswers: newSelectedAnswers }))
    }

    const handleQuestionStatus = (qIdx, nVal) => {
        const newStatus = { ...questionStatus, [qIdx]: nVal };
        setQuestionStatus(newStatus);
        dispatch(setStatus({ newStatus }))
        let countArr = new Array(5).fill(0)
        for (const [idx, status] of Object.entries(newStatus)) {
            if (status == 4) continue
            countArr[status]++;
        }
        let sum = 0
        for (let i = 0; i < 4; i++) sum += countArr[i]
        countArr[4] = quiz.questions.length - sum
        setStatusCountArr(countArr)
    }

    useEffect(() => {
        if (quizId && quizzes && quizzes[quizId]) {
            setQuiz(quizzes[quizId]);
        } else {
            if (quizId && !quizzes[quizId]) {
                dispatch(fetchQuiz(quizId));
            }
        }
    }, [quizId, quizzes, dispatch]);

    useEffect(() => {
        if (quiz && quiz.questions) {
            if (Object.entries(qStatus).length == 0) {
                setQuestion(quiz.questions[questionIdx]);

                setSelectedAnswers(prev => {
                    const newSelectedAnswers = {};
                    for (let i = 0; i < quiz.questions.length; i++) {
                        newSelectedAnswers[i] = -1;
                    }

                    setAnswer({ newAnswers: newSelectedAnswers })

                    return newSelectedAnswers;
                });

                setQuestionStatus(prev => {
                    const newStatus = {};
                    for (let i = 0; i < quiz.questions.length; i++) {
                        newStatus[i] = 4;
                    }
                    newStatus[0] = 0;

                    setStatus(newStatus)

                    return newStatus;
                });

                setStatusCountArr(prev => prev.map((val, i) => (i === 0 ? 1 : 0)));
                setStatusCountArr(prev => prev.map((val, i) => (i === 4 ? (quiz.questions.length - 1) : val)));
            } else {
                setQuestion(quiz.questions[qIdx]);
                setSelectedAnswers(sAnswers);
                setQuestionStatus(qStatus);

                let countArr = new Array(5).fill(0)
                for (const [idx, status] of Object.entries(qStatus)) {
                    if (status == 4) continue
                    countArr[status]++;
                }
                let sum = 0
                for (let i = 0; i < 4; i++) sum += countArr[i]
                countArr[4] = quiz.questions.length - sum
                setStatusCountArr(countArr)
            }
        }
    }, [quiz]);

    useEffect(() => {
        if (quiz && quiz.questions) {
            setQuestion(quiz.questions[questionIdx]);
            dispatch(setQIdx({ qIdx: questionIdx }))
            if (questionStatus[questionIdx] == 4) {
                const newStatus = {}
                for (let i = 0; i < quiz.questions.length; i++) {
                    if (i == questionIdx) newStatus[i] = 0
                    else newStatus[i] = questionStatus[i]
                }
                setQuestionStatus(newStatus)
                dispatch(setStatus({ newStatus }))

                let countArr = new Array(5).fill(0)
                for (const [idx, status] of Object.entries(newStatus)) {
                    if (status == 4) continue
                    countArr[status]++;
                }
                let sum = 0
                for (let i = 0; i < 4; i++) sum += countArr[i]
                countArr[4] = quiz.questions.length - sum
                setStatusCountArr(countArr)
            }
        }
    }, [questionIdx]);

    return {
        loading,
        error,
        quiz,
        setQuiz,
        questionIdx,
        setQuestionIdx,
        question,
        setQuestion,
        questionStatus,
        statusCountArr,
        selectedAnswers,
        handleSelectedAnswers,
        handleQuestionStatus,
    }
}
