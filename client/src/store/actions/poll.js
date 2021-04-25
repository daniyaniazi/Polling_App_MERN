import { SET_CURRENT_POLL, SET_POLLS } from '../actionTypes';
import { addError, removeError } from "./error";
import api from "../../services/api";


export const setPolls = polls => ({
    type: SET_POLLS,
    polls
})



export const setCurrentPoll = poll => ({
    type: SET_CURRENT_POLL,
    poll
})

export const getPolls = () => {
    return async dispatch => {
        try {
            api.setToken(localStorage.jwtToken);
            const polls = await api.call('get', `polls`)
            dispatch(setPolls(polls))
            dispatch(removeError())
        } catch (error) {
            const err = error
            dispatch(addError(err))
        }
    }
}

export const getUserPolls = () => {
    return async dispatch => {
        try {

            api.setToken(localStorage.jwtToken);
            const polls = await api.call('get', `polls/user`)
            dispatch(setPolls(polls))
            dispatch(removeError())
        } catch (error) {
            console.log("ERROR: ", error.response.data)
            const err = error.response.data
            dispatch(addError(err.message))
        }
    }
}


export const createPoll = (data) => {
    return async dispatch => {
        try {
            const poll = await api.call('post', `polls`, data)
            dispatch(setCurrentPoll(poll))
            dispatch(removeError())
        } catch (error) {
            const err = error.response.data
            dispatch(addError(err.message))
        }
    }
}


export const getCurrentPoll = (path) => {
    return async dispatch => {
        try {
            const poll = await api.call('get', `polls/${path}`)
            dispatch(setCurrentPoll(poll))
            dispatch(removeError())
        } catch (error) {
            const err = error
            dispatch(addError(err))
        }
    }
}

export const vote = (path, data) => {
    return async dispatch => {
        try {
            console.log(path, data)
            const poll = await api.call('post', `polls/${path}`, data)
            dispatch(setCurrentPoll(poll))
            dispatch(removeError())
        } catch (error) {
            const err = error.response.data
            dispatch(addError(err.message))
        }
    }
}

export const deletePoll = (path) => {
    return async dispatch => {
        try {
            const poll = await api.call('delete', `polls/${path}`)
            dispatch(setCurrentPoll({}))
            dispatch(removeError())
        } catch (error) {
            const err = error.response.data
            dispatch(addError(err.message))
        }
    }
}