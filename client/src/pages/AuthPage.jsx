import React from 'react'
import { Redirect } from "react-router-dom";
import Auth from '../components/auth';
import ErrorMessage from '../components/errorMessage';

const AuthPage = ({ authType, isAuthenticated }) => {

    if (isAuthenticated) return <Redirect to='/' />
    return (
        <div>
            <ErrorMessage />
            <Auth authType={authType} />
        </div>
    )
}

export default AuthPage
