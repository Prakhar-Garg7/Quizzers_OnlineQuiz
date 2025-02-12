import { config } from "../../config"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

export const getQuizReport = createAsyncThunk(
    'getQuizReport/getQuizReport',
    async (params, thunkAPI) => {
        try {
            const {userAnswers, timeSpent} = params;
            const res = await axios.get(`${config.backend_url}/api/quiz/evaluate/${params.id}`,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                },{
                    userAnswers,
                    timeSpent
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
