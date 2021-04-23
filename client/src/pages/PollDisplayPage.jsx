import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Poll from '../components/Poll';
import ErrorMessage from '../components/errorMessage';
// { match, getPoll, poll }



class PollPage extends Component {
    async componentDidMount() {
        const id = this.props.match.params.id;
        await this.props.getPoll(id);
        console.log(this.props)
    }
    render() {
        return (
            <div>

                <ErrorMessage />
                <Poll />
            </div>
        );
    }
};

export default withRouter(PollPage);