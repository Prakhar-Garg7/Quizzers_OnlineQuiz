import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTime } from '../src/features/quizAutoSave/slice';

export const useCountdownTimer = (initialTime, onTimeEnd) => {
    const dispatch = useDispatch();
    const {timeRem} = useSelector((state) => state.quizAutoSave)
    const [timeLeft, setTimeLeft] = useState((timeRem == -1) ? initialTime : timeRem);
    const timerRef = useRef(null);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeEnd();
            return;
        }

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        dispatch(setTime({time: timeLeft}))

        return () => clearInterval(timerRef.current);
    }, [timeLeft]);

    return {timeLeft};
};
