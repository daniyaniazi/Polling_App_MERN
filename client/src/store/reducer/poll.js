import { SET_CURRENT_POLL, SET_POLLS } from '../actionTypes';

export const polls = (state = [], action) => {
    switch (action.type) {
        case SET_POLLS:
            return { polls: action.polls }
        default:
            return state;
    }
};

export const currentPoll = (state = {}, action) => {
    switch (action.type) {
        case SET_CURRENT_POLL:
            return { currentPoll: action.poll }
        default:
            return state;

    }
}