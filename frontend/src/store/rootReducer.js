import { combineReducers } from "redux";
import getQuizReducer from "../features/getQuiz/slice"
import quizAutoSaveReducer from "../features/quizAutoSave/slice"
import uploadImageReducer from "../features/uploadImage/slice"
import createQuizReducer from "../features/createQuiz/slice"
import createQuizAutoSaveReducer from "../features/createQuizAutoSave/slice"
import getQuizReportReducer from "../features/getQuizReport/slice"
import userSlice from "../features/userSlice/slice";

const rootReducer = combineReducers({
    getQuiz: getQuizReducer,
    quizAutoSave: quizAutoSaveReducer,
    uploadImage: uploadImageReducer,
    createQuiz: createQuizReducer,
    createQuizAutoSave: createQuizAutoSaveReducer,
    getQuizReport: getQuizReportReducer,
    user:userSlice
})

export default rootReducer;