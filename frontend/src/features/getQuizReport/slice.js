import { createSlice } from "@reduxjs/toolkit";
import { getQuizReport } from "./api";

const initialState = {
    score: 0,
    maxScore: 0,
    error: null,
    markedAnswers:[],
    correctAnswers: [],
    timeSpent:[],
    loading: false
}

const slice = createSlice({
    name: 'getQuizReport',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getQuizReport.pending, (state) => {
                state.loading = true
            })
            .addCase(getQuizReport.fulfilled, (state, action) => {
                Object.assign(state, { loading: false, error: null, ...action.payload.report });
            })            
            .addCase(getQuizReport.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default slice.reducer;