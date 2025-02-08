import { config } from "../../config"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

export const createQuiz = createAsyncThunk(
    'createQuiz/createQuiz',
    async (params, thunkAPI) => {
        try {
            const res = await axios.post(`${config.backend_url}/api/quiz/create`,
                params,
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
