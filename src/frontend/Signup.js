import React, { Component } from 'react'
const renderIf = require('render-if')


class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {username: "", password: ""}
    }

    render() {        
        
        const containerStyling = {
            border: '1px solid #999',
            backgroundColor: '#F8FBFD',
            position: 'absolute',
            right: '.25%',
            top: '65px',
            width: '12%',
            paddingBottom: '3px'
        }        
        
        const usernameStyling = {
            border: "1px solid #999",
            width: '170px',
            margin: '8px auto',
            display: 'block'
        }
        
        const passwordStyling = {
            border: "1px solid #999",
            width: '170px',
            margin: '5px auto',
            display: 'block'
        }
        
        const signupBttnStylying = {
            display: 'block',
            margin: '5px auto'
        }        
        
        const errorMsgStyling = {
            fontSize: '12px',
            color: 'red',
            margin: 'auto',
            width: '70%',
            marginTop: '8px'
            
        }        
        
        return (
            <div className="container" style={containerStyling}>
                <input type="text" placeholder="choose a username" style={usernameStyling}/>
                <input type="password" placeholder="password" style={passwordStyling}/>
                <input type="password" placeholder="verify password" style={passwordStyling}/>
                <button type="submit" style={signupBttnStylying}> signup </button>
            </div>
        );
    }
}

module.exports = Signup