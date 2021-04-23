import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const middleware = [thunk];


const DEFAULT_STATE = {
    auth: { isAuthenticated: false },
    error: { message: null },
    polls: [],
    currentPoll: {

    },
};

export const store = createStore(
    rootReducer,
    DEFAULT_STATE,
    //middleare
    compose(
        //all middleware in one object
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f

    )
);
