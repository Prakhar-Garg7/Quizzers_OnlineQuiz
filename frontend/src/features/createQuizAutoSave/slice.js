import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizTitle: "",
    quizDescription: "",
    startTime: "",
    duration: "",
    questions: []
}

const slice = createSlice({
    name: 'createQuizAutoSave',
    initialState,
    reducers: {
        setTitle(state, action) {
            state.quizTitle = action.payload.quizTitle
        },
        setDescription(state, action) {
            state.quizDescription = action.payload.quizDescription
        },
        setStartTime(state, action) {
            state.startTime = action.payload.startTime
        },
        setDuration(state, action) {
            state.duration = action.payload.duration
        },
        setQuestions(state, action) {
            state.questions = [...action.payload.questions]
        },
        resetState(state, action) {
            state.quizTitle = ""    
            state.quizDescription = ""    
            state.startTime = ""    
            state.duration = ""    
            state.questions = []
        }
    },
})

export const { setTitle, setDescription, setStartTime, setDuration, setQuestions, resetState } = slice.actions

export default slice.reducer;