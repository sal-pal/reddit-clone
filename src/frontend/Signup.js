import React, { Component } from 'react'
const renderIf = require('render-if')


class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {username: "", password: "", verifyPassword: ""}
    }

    updateUsername(e) {
        const value = e.target.value
        this.setState({username: value})
    }
    
    updatePassword(e) {
        const value = e.target.value
        this.setState({password: value})
    }
    
    updateVerifyPassword(e) {
        const value = e.target.value
        this.setState({verifyPassword: value})
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
                <input type="text" placeholder="choose a username" style={usernameStyling} onChange={this.updateUsername.bind(this)}/>
                <input type="password" placeholder="password" style={passwordStyling} onChange={this.updatePassword.bind(this)}/>
                <input type="password" placeholder="verify password" style={passwordStyling} onChange={this.updateVerifyPassword.bind(this)}/>
                <button type="submit" style={signupBttnStylying} onClick={() => this.props.onSignupRequest(this.state)}> signup </button>
            </div>
        );
    }
}

module.exports = Signup