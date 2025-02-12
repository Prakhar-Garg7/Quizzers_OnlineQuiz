import { config } from "../../config"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

export const fetchAllQuizzes = createAsyncThunk(
    'getQuiz/fetchAllQuizzes',
    async (params, thunkAPI) => {
        try {
            const res = await axios.get(`${config.backend_url}/api/quiz/get`,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            )
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.response?.data || error.message || "Something went wrong"
            );
        }
    }
)

export const fetchQuiz = createAsyncThunk(
    'getQuiz/fetchQuiz',
    async (params, thunkAPI) => {
        try {
            const res = await axios.get(`${config.backend_url}/api/quiz/get/${params.quizId}`,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            )
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const fetchTeacherQuizzes = createAsyncThunk(
    'getQuiz/fetchTeacherQuizzes',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(`${config.backend_url}/api/quiz/teacher`,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            )
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.response?.data || error.message || "Something went wrong"
            );
        }
    }
);