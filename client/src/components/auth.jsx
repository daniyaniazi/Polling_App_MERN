import React from "react";
import { connect } from "react-redux";
import { authUser, logout } from '../store/actions'


class Auth extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            username: '',
            password: '',

        }

    }
    handleChange = (e) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value })
    }
    handleSubmit = async (e) => {
        const { username, password } = this.state
        e.preventDefault();
        const { authType } = this.props

        const response = await this.props.authUser(authType || 'login', { username, password })
        // return (window.location = '/')
    }
    render() {

        const { username, password, } = this.state;
        return <div className="Auth">

            <div className="Form">

                <h2>{this.props.authType === 'register' ? "Sign Up" :
                    "Sign In"}</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="option">
                        <label htmlFor="username">Username</label>
                        <input type="text" autoComplete="off" value={username} name="username" onChange={this.handleChange} />

                    </div>
                    <div className="option">
                        <label htmlFor="password">Password</label>
                        <input type="password" autoComplete="off" value={password} name="password" onChange={this.handleChange} />
                    </div>
                    <button className="button" type='submit'>{this.props.authType}</button>
                </form>
            </div>
        </div>
    }
}

export default connect(() => ({}), { authUser, logout })(Auth);