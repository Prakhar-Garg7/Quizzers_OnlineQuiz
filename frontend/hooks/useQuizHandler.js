import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchQuiz } from '../src/features/getQuiz/api';
import { setAnswer, setQIdx, setStatus, setTimestamps as setSliceTimestamps } from '../src/features/quizAutoSave/slice';
import { getQuizReport } from '../src/features/getQuizReport/api';

export default function useQuizHandler(quizId) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { quizzes, loading, error } = useSelector((state) => state.getQuiz)
    const [quiz, setQuiz] = useState(null);
    const [question, setQuestion] = useState(null);
    const [questionIdx, setQuestionIdx] = useState(0)
    const [statusCountArr, setStatusCountArr] = useState(new Array(5).fill(0))
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [questionStatus, setQuestionStatus] = useState({});
    const [timestamps, setTimestamps] = useState({});
    const { qIdx, sAnswers, qStatus, timestamps: quizAutoSaveTimestamps } = useSelector((state) => state.quizAutoSave)

    const handleSelectedAnswers = (qIdx, nVal) => {
        const newSelectedAnswers = { ...selectedAnswers, [qIdx]: nVal };
        setSelectedAnswers(newSelectedAnswers);
        dispatch(setAnswer({ newAnswers: newSelectedAnswers }))
    }

    const handleSubmit = () => {
        const newSelectedAnswers = new Array(quiz.questions.length).fill(-1)
        for(let i = 0; i < quiz.questions.length; i++) {
            newSelectedAnswers[i] = selectedAnswers[i];
        }
        const newTimeStamps = new Array(quiz.questions.length).fill(0)
        for(let i = 0; i < quiz.questions.length; i++) {
            newTimeStamps[i] = timestamps[i].timeSpent;
        }
        dispatch(getQuizReport({userAnswers: newSelectedAnswers, timeSpent: newTimeStamps}))
        navigate(`/report/${quizId}`);
    }

    const handleTimestamps = (qIdx, flag) => {
        const currTime = Date.now();
        const newTimestamps = { ...timestamps };

        if (flag == 1) {
            const timeDelayed = Math.max(0, currTime - (newTimestamps[qIdx].prevTime));
            newTimestamps[qIdx] = {
                ...newTimestamps[qIdx],
                timeSpent: newTimestamps[qIdx].timeSpent + timeDelayed,
                prevTime: currTime
            };
        } else {
            newTimestamps[qIdx] = {
                ...newTimestamps[qIdx],
                prevTime: currTime
            };
        }
    
        setTimestamps(newTimestamps);
        dispatch(setSliceTimestamps({timestamps: newTimestamps}))
    };

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

                let newTimestamps = {};
                const currTime = Date.now()
                for (let i = 0; i < quiz.questions.length; i++) newTimestamps[i] = {
                    prevTime: currTime,
                    timeSpent: 0
                }

                setTimestamps(newTimestamps)

                dispatch(setSliceTimestamps({timestamps: newTimestamps}))

                setStatusCountArr(prev => prev.map((val, i) => (i === 0 ? 1 : 0)));
                setStatusCountArr(prev => prev.map((val, i) => (i === 4 ? (quiz.questions.length - 1) : val)));
            } else {
                setQuestion(quiz.questions[qIdx]);
                setSelectedAnswers(sAnswers);
                setQuestionStatus(qStatus);
                setTimestamps(quizAutoSaveTimestamps)

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
            handleTimestamps(questionIdx, 0)
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
        handleTimestamps,
        handleSubmit
    }
}
