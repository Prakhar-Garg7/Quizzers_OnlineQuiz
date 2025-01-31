import { combineReducers } from "redux";
import quizReducer from "../features/quiz/slice"

const rootReducer = combineReducers({
    quiz: quizReducer
})

export default rootReducer;