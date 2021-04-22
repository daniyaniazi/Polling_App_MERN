import React, { Component } from "react";
import api from '../services/api'


class App extends Component {

    //function run mmediiately after compoent mount
    async componentDidMount() {
        const result = await api.call('post', "auth/login", {
            username: 'username',
            password: "password"
        })

        console.log("res:", result)
    }
    render() {
        return <div>App works here</div>
    }
}
export default App;