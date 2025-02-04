import { combineReducers } from "redux";
import getQuizReducer from "../features/getQuiz/slice"
import quizAutoSaveReducer from "../features/quizAutoSave/slice"

const rootReducer = combineReducers({
    getQuiz: getQuizReducer,
    quizAutoSave: quizAutoSaveReducer,
})

export default rootReducer;