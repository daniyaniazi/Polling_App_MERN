import React, { Fragment } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from "../store";
import { setCurrentUser, addError, setToken } from "../store/actions";
import decode from "jwt-decode";
import RouteViews from "./RouteViews";
import NavBar from "./NavBar";
import '../styles/style.css'

if (localStorage.jwtToken) {
    setToken(localStorage.jwtToken);
    try {
        store.dispatch(setCurrentUser(decode(localStorage.jwtToken)))
    } catch (error) {
        store.dispatch(setCurrentUser({}))
        store.dispatch(addError(error))
    }
}
const App = () => (<Provider store={store}>
    {
        console.log(store)
    }
    <Router>
        <Fragment>
            <NavBar />
            <RouteViews />
        </Fragment>
    </Router>
</Provider>)

export default App;