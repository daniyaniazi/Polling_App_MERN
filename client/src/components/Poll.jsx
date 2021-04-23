import React from 'react'
import { connect } from 'react-redux'
import store from "../store";
import { vote } from "../store/actions";
import { Pie, Doughnut } from "react-chartjs-2";

const color = () => {
    //6 digit hex Value
    return '#' + Math.random().toString(16).slice(2, 8)
}
const Poll = ({ poll, vote }) => {

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

    return (

        <div>
            <h3 className="poll-title">{poll.question}</h3>
            <div className="buttons_center">{answers}</div>
            {poll.options && <Doughnut data={data} />}
        </div>
    );
};

export default connect(
    store => ({
        poll: store.currentPoll,
    }),
    { vote },
)(Poll);