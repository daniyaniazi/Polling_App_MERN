import React from 'react'
import { connect } from 'react-redux'
import store from "../store";
import { vote, deletePoll } from "../store/actions";
import { Pie, Doughnut } from "react-chartjs-2";
import auth from '../store/reducer/auth';
import { Redirect } from "react-router-dom";

const color = () => {
    //6 digit hex Value
    return '#' + Math.random().toString(16).slice(2, 8)
}
const Poll = ({ poll, vote, auth, deletePoll }) => {

    const answers =
        poll.options &&
        poll.options.map(option => (
            <button
                onClick={() => vote(poll._id, { answer: option.option })}
                className="button"
                key={option._id}>
                {option.option}
            </button>
        ));

    const data = poll.options && {
        labels: poll.options.map(option => option.option),
        datasets: [
            {
                label: poll.question,
                backgroundColor: poll.options.map(option => color()),
                borderColor: '#323643',
                data: poll.options.map(option => option.votes),
            },
        ],
    };

    const handleAuthor = () => {
        if (poll.user._id) {
            if (poll.user._id === auth.user.id) {
                console.log("case 1 of 1")
                return true
            }
            if (poll.user._id === auth.user._id) {
                console.log("case 1 of 2")
                return true
            }
        }
        else {
            if (poll.user) {
                if (poll.user === auth.user._id) {
                    console.log("case 2 of 1")
                    return true
                }
                if (poll.user === auth.user.id) {
                    console.log("case 2 of 2")
                    return true
                }
            }
            else {
                console.log("No true")
            }
        }
    }

    return (

        <div className="votePoll">
            {auth.isAuthenticated && poll.options && handleAuthor() && (<button className='Delbutton' onClick={async () => {
                await deletePoll(poll._id)
                return (window.location = '/')
            }}>Delete Poll</button>)}
            <div className="Vote">
                <h3 className="poll-title">{poll.question}</h3>
                <div className="buttons_center">{answers}</div></div>
            <div className="Chart">{poll.options && <Doughnut data={data} />}</div>


        </div>
    );
};

export default connect(
    store => ({
        auth: store.auth,
        poll: store.currentPoll,
    }),
    { vote, deletePoll },
)(Poll);