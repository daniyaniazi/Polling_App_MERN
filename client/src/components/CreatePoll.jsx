import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { createPoll } from '../store/actions';

class CreatePoll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            options: ['', ''],
            added: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    addAnswer() {
        this.setState({ options: [...this.state.options, ''] });
    }

    handleAnswer(e, index) {
        const options = [...this.state.options];
        options[index] = e.target.value;
        this.setState({ options });
    }

    async handleSubmit(e) {
        e.preventDefault();
        await this.props.createPoll(this.state);
        this.setState({
            added: true
        })
        this.setState({
            question: '',
            options: ['', ''],
        })


    }

    render() {
        const options = this.state.options.map((option, i) => (
            <div className="option" key={i}>
                <label className="form-label">option</label>
                <input
                    className="form-input"
                    type="text"
                    value={option}
                    key={i}
                    onChange={e => this.handleAnswer(e, i)}
                />
            </div>
        ));

        return (
            <Fragment>
                {this.state.added && <div className={this.state.added ? "success" : "noError"}>
                    <h2 className="success"> Your Question Has been Posted</h2></div>}

                <div className="Form">
                    <form className="form" onSubmit={this.handleSubmit}>
                        <label className="form-label" htmlFor="question">
                            question
        </label>
                        <input
                            className="form-input"
                            type="text"
                            name="question"
                            value={this.state.question}
                            onChange={this.handleChange}
                        />
                        <div className="Options">{options}</div>
                        <div className="buttons_center">
                            <button className="button" type="button" onClick={this.addAnswer}>
                                Add options
          </button>
                            <button className="button" type="submit">
                                Submit
          </button>
                        </div>

                    </form>
                </div>
            </Fragment>
        );
    }
}

export default connect(() => ({}), { createPoll })(CreatePoll);