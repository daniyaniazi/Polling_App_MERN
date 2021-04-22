import { combineReducers } from "redux";
//error reducer
import error from './error'
import auth from './auth'

export default combineReducers({
    error, auth
})