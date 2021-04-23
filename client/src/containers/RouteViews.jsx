import React from 'react'
import { Switch, Route, withRouter } from "react-router-dom";
import AuthPage from '../pages/AuthPage';
import { connect } from "react-redux";
import store from "../store";
import PollPage from '../pages/PollPage';

const RouteViews = ({ auth }) => {
    console.log(auth)
    return (
        <Switch>
            <Route exact path='/login' render={
                () => <AuthPage authType={'login'} isAuthenticated={auth.isAuthenticated} />
            } />

            <Route exact path='/register' render={
                () => <AuthPage authType={'register'} isAuthenticated={auth.isAuthenticated} />
            } />

            <Route exact path='/polls' render={
                () => <PollPage />
            } />


        </Switch>
    )
}

export default withRouter(connect((store) =>
    ({ auth: store.auth })
)(RouteViews));


// <Auth authType={'login'} />
{/* <ErrorMessage /> */ }


//
// import ErrorMessage from "../components/errorMessage";