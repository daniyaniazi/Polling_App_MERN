import React, { Fragment } from 'react'
import { Component } from 'react';
import { connect } from "react-redux";
import store from "../store";
import { getPolls, getUserPolls, getCurrentPoll } from "../store/actions";
import auth from '../store/reducer/auth';



class Polls extends Component {
    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this)
    }
    async componentDidMount() {

        const { getPolls } = this.props
        await getPolls()
    }

    async handleSelect(id) {
        const { getCurrentPoll } = this.props
        await getCurrentPoll(id)
    }

    render() {
        const { auth, getPolls, getUserPolls } = this.props
        const polls = this.props.polls.map(poll => (
            <li onClick={
                () => this.handleSelect(poll._id)

            }
                key={poll._id}>{poll.question}</li>
        ))

        return (

            <Fragment>
                {auth.isAuthenticated && (
                    <div>
                        <button onClick={getPolls}>All Polls</button>
                        <button onClick={getUserPolls}>My Polls</button>
                    </div>
                )}
                {polls}</Fragment>
        )
    }

}

export default connect(store => ({
    auth: store.auth,
    polls: store.polls
}), { getPolls, getUserPolls, getCurrentPoll })(Polls)
