import { createSlice } from "@reduxjs/toolkit";
import { uploadImage } from "./api";

const initialState = {
    urls:{},
    loading: false,
    error: null,
}

const slice = createSlice({
    name: 'uploadImage',
    initialState,
    reducers: {
        deleteImage(state, action){
            const {qIdx} = action.payload
            state.urls[qIdx] = ""
        },
        resetUploadImageState(state, action){
            state.urls = {}
            state.error = null
            state.loading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadImage.pending, (state) => {
                state.loading = true
            })
            .addCase(uploadImage.fulfilled, (state, action) => {
                state.loading = false
                state.urls[action.payload.qIdx] = action.payload.imageUrl;
                state.error = null
            })
            .addCase(uploadImage.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const {deleteImage, resetUploadImageState} = slice.actions

export default slice.reducer;