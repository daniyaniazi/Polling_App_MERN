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
            const polls = await api.call('get', `polls`)
            console.log("polls getpolls : ", polls)
            dispatch(setPolls(polls))
            dispatch(removeError())
        } catch (error) {
            console.log("Poll Error", error)
            const err = error
            dispatch(addError(err))
        }
    }
}

export const getUserPolls = () => {
    return async dispatch => {
        try {
            const polls = await api.call('get', `polls/user`)
            dispatch(setPolls(polls))
            dispatch(removeError())
        } catch (error) {
            console.log("user Poll Error", error)
            const err = error
            dispatch(addError(err))
        }
    }
}


export const craetePolls = (data) => {
    return async dispatch => {
        try {
            const poll = await api.call('post', `polls`, data)
            dispatch(setCurrentPoll(poll))
            dispatch(removeError())
        } catch (error) {
            console.log("craetePolls", error.response.data)
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
            console.log("getCurrentPoll", error.response.data)
            const err = error.response.data
            dispatch(addError(err.message))
        }
    }
}

export const vote = (path, data) => {
    return async dispatch => {
        try {
            const poll = await api.call('get', `polls/${path}`, data)
            dispatch(setCurrentPoll(poll))
            dispatch(removeError())
        } catch (error) {
            console.log("vote", error.response.data)
            const err = error.response.data
            dispatch(addError(err.message))
        }
    }
}