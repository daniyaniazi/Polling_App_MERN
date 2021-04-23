import React from 'react'
import ErrorMessage from '../components/errorMessage'
import Poll from '../components/Poll'

const PollPage = () => {
    return (
        <div>
            <ErrorMessage />
            <Poll />
        </div>
    )
}

export default PollPage
