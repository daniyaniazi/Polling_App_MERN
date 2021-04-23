import React from 'react'
import { Redirect } from "react-router-dom";
import CreatePoll from '../components/CreatePoll';
import ErrorMessage from "../components/errorMessage";

const CreatePollPgae = ({ isAuthenticated }) => {
    if (!isAuthenticated) return <Redirect to='/login' />
    return (
        <div>
            <ErrorMessage />
            <CreatePoll />
        </div>
    )
}

export default CreatePollPgae
