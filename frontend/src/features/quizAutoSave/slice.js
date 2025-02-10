import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    qIdx: 0,
    sAnswers:{},
    qStatus: {},
    timeRem: -1,
    timestamps:{}
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
            state.timestamps = {}
        },
        setTimestamps(state, action){
            state.timestamps = {...action.payload.timestamps}
        },
    },
})

export const {setAnswer, setStatus, setQIdx, setTime, resetState, setTimestamps} = slice.actions

export default slice.reducer;