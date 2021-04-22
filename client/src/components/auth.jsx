import React from "react";
import { connect } from "react-redux";
import { authUser, logout } from '../store/actions'

class Auth extends React.Component {
    constructor(props) {
        super(props)
            username: '',
            password: ''
        }

    }
    handleChange = (e) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value })
    }
    handleSubmit = (e) => {
        const { username, password } = this.state
        e.preventDefault();
        console.log(username, password)
        const { authType } = this.props
        this.props.authUser(authType || 'login', { username, password })
    }
    render() {

        const { username, password } = this.state;
        return <div>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" value={username} name="username" onChange={this.handleChange} />
                <label htmlFor="password">Password</label>
                <input type="password" value={password} name="password" onChange={this.handleChange} />

                <button type='submit'>Submit</button>
            </form>
        </div>
    }
}

export default connect(() => ({}), { authUser, logout })(Auth);