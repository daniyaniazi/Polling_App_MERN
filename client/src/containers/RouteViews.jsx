import React from 'react'
import { Switch, Route, withRouter } from "react-router-dom";
import AuthPage from '../pages/AuthPage';
import { connect } from "react-redux";
import store from "../store";
import HomePage from '../pages/HomePage';
import { getCurrentPoll } from '../store/actions';
import PollDisplayPage from '../pages/PollDisplayPage';
import CreatePollPgae from '../pages/CreatePoll';

const RouteViews = ({ getCurrentPoll, auth }) => (
    <main className="container">
        <Switch>
            <Route exact path="/" render={props => <HomePage {...props} />} />
            <Route
                exact
                path="/login"
                render={() => (
                    <AuthPage authType="login" isAuthenticated={auth.isAuthenticated} />
                )}
            />
            <Route
                exact
                path="/register"
                render={() => (
                    <AuthPage
                        authType="register"
                        isAuthenticated={auth.isAuthenticated}
                    />
                )}
            />
            <Route
                exact
                path="/poll/new"
                render={() => (
                    <CreatePollPgae
                        isAuthenticated={auth.isAuthenticated}
                    />
                )}
            />
            <Route
                exact
                path="/poll/:id"
                render={props => (
                    <PollDisplayPage getPoll={id => getCurrentPoll(id)} {...props} />
                )}
            />

        </Switch>
    </main>
);

export default withRouter(
    connect(
        store => ({
            auth: store.auth,
        }),
        { getCurrentPoll },
    )(RouteViews),
);