import React from 'react'
import ErrorMessage from '../components/errorMessage'
import Polls from '../components/Polls'

const HomePage = (props) => {
    return (
        <div>
            <ErrorMessage />
            <Polls {...props} />
        </div>
    )
}

export default HomePage
