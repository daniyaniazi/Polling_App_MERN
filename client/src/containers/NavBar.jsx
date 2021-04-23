import React from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import auth from '../store/reducer/auth';
import { logout } from "../store/actions";
const NavBar = ({ auth, logout }) => {

    if (!auth.isAuthenticated) {
        return (
            <div>
                <ul>
                    <li><Link to='/' >Home</Link></li>
                    <li>
                        <Link to='/register' >Register</Link></li>
                    <li><Link to='/login' >Login</Link></li>
                    <li><Link to='/polls' >Polls</Link></li>

                </ul>

            </div>
        )
    }
    else {
        return (<div>
            <ul>
                <li><Link to='/' >Home</Link></li>
                <li><Link to='/polls' >Polls</Link></li>
                <li>
                    <p>Logged in as {auth.user.username}</p>
                </li>
                <li>
                    <button onClick={logout}>Logout</button>
                </li>
            </ul>

        </div>)
    }
}

export default connect(store => ({ auth: store.auth }), { logout })(NavBar)
