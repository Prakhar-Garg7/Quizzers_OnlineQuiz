import { createSlice } from "@reduxjs/toolkit";
import { createQuiz } from "./api";

const initialState = {
    loading: false,
    error: null,
}

const slice = createSlice({
    name: 'createQuiz',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createQuiz.pending, (state) => {
                state.loading = true
            })
            .addCase(createQuiz.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
            })
            .addCase(createQuiz.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default slice.reducer;