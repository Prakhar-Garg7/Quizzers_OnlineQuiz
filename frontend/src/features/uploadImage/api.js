import { config } from "../../config"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

export const uploadImage = createAsyncThunk(
    'uploadImage/uploadImage',
    async (params, thunkAPI) => {
        try {
            const formData = {
                image: params.file
            }
            const res = await axios.post(`${config.backend_url}/api/upload/upload`, formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            )

            res.data.qIdx = params.qIdx
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.response?.data || error.message || "Something went wrong"
            );
        }
    }
)