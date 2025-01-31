import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: [],
    loading: false,
    error: ""
}

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        
    }
})