import { combineReducers } from "redux";
//error reducer
import error from './error'
import auth from './auth'
import { polls, currentPoll } from './poll'

export default combineReducers({
    error, auth, polls, currentPoll
})