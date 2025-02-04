import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    qIdx: 0,
    sAnswers:{},
    qStatus: {},
    timeRem: -1,
}

const slice = createSlice({
    name: 'quizAutoSave',
    initialState,
    reducers: {
        setAnswer(state, action){
            const {newAnswers} = action.payload
            state.sAnswers = newAnswers
        },
        setStatus(state, action){
            const {newStatus} = action.payload
            state.qStatus = newStatus
        },
        setQIdx(state, action){
            const {qIdx} = action.payload
            state.qIdx = qIdx
        },
        setTime(state, action){
            const {time} = action.payload
            state.timeRem = time
        },
        resetState(state, action){
            state.qIdx = 0
            state.sAnswers = {}
            state.qStatus = {}
            state.timeRem = -1
        }
    },
})

export const {setAnswer, setStatus, setQIdx, setTime, resetState} = slice.actions

export default slice.reducer;