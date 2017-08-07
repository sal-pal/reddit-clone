import React, { Component } from 'react'
const renderIf = require('render-if')


class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {username: "", password: ""}
    }

    render() {        
        
        return (
            <div className="container" >
                <h4> CREATE A NEW ACCOUNT </h4>
                <input type="text" placeholder="choose a username" />
                <input type="password" placeholder="password" />
                <input type="password" placeholder="verify password" />
                <button type="submit" tabindex="2" > SIGN UP </button>
            </div>
        );
    }
}

module.exports = Signup