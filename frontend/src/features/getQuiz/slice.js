import { createSlice } from "@reduxjs/toolkit";
import { fetchAllQuizzes, fetchQuiz, fetchTeacherQuizzes } from "./api";

const initialState = {
    quizzes: {},
    loading: false,
    error: null,
    quizzesByTeacher:{}
}

const slice = createSlice({
    name: 'getQuiz',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllQuizzes.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAllQuizzes.fulfilled, (state, action) => {
                state.loading = false
                state.quizzes = action.payload.quizzes.reduce((acc, quiz) => {
                    acc[quiz._id] = quiz
                    return acc
                }, {})
                state.error = null
            })
            .addCase(fetchAllQuizzes.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchQuiz.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchQuiz.fulfilled, (state, action) => {
                state.loading = false
                const quizId = action.payload.quizFetched._id;
                const quiz = action.payload.quizFetched;
                state.quizzes[quizId] = quiz

                state.error = null
            })
            .addCase(fetchQuiz.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchTeacherQuizzes.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchTeacherQuizzes.fulfilled, (state, action) => {
                state.loading = false;

                const { email, quizzes: quizzes1 } = action.payload;
                state.quizzesByTeacher = {
                    ...state.quizzesByTeacher,
                    [email]: quizzes1
                };
                state.error = null;
            })            
            .addCase(fetchTeacherQuizzes.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default slice.reducer;