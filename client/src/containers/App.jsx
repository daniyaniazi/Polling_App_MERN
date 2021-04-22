import React, { Component } from "react";
import { Provider } from "react-redux";
import api from '../services/api'
import { store } from "../store";
import { setCurrentUser, addError, setToken } from "../store/actions";
import decode from "jwt-decode";


if (localStorage.jwttoken) {
    setToken(localStorage.jwttoken);
    try {
        store.dispatch(setCurrentUser(decode(localStorage.jwttoken)))
    } catch (error) {
        store.dispatch(setCurrentUser({}))
        store.dispatch(addError(error))
    }
}
const App = () => <Provider store={store}>
    <div>App works</div>
</Provider>

export default App;