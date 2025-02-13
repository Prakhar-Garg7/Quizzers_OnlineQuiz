import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeacherQuizzes } from "../../features/getQuiz/api";
import LoadingPage from "../LoadingPage/LoadingPage";
import ErrorPage from "../ErrorPage/ErrorPage";

export default function TeacherProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [teacherQuizzes, setTeacherQuizzes] = useState([]);

    const { quizzesByTeacher, error, loading } = useSelector((state) => state.getQuiz);
    const { email } = useSelector((state) => state.user);

    useEffect(() => {
        if(!quizzesByTeacher || !email || !quizzesByTeacher[email]) dispatch(fetchTeacherQuizzes());
    }, [dispatch]);

    useEffect(() => {
        if (quizzesByTeacher && email) {
            setTeacherQuizzes(quizzesByTeacher[email])
        }
    }, [quizzesByTeacher, email]);

    // const handleQuizClick = (quizId) => {
    //     navigate(`/takequiz/${quizId}`);
    // };

    if (loading) {
        return <LoadingPage />;
    }

    if (error) {
        return <ErrorPage />;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Teacher Profile</h1>
            <p className="text-lg text-center text-gray-700">Welcome, Teacher {email}</p>
            
            <h2 className="text-2xl font-semibold mt-8">Your Quizzes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                {teacherQuizzes.length > 0 ? (
                    teacherQuizzes.map((quiz) => (
                        <div
                            key={quiz._id}
                            className="p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition"
                            // onClick={() => handleQuizClick(quiz.id)}
                        >
                            <h3 className="text-xl font-semibold">{quiz.title}</h3>
                            <p className="text-gray-600">{quiz.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No quizzes created yet.</p>
                )}
            </div>
        </div>
    );
}
