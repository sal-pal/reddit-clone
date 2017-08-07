import React, { Component } from 'react'
const renderIf = require('render-if')


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {username: "", password: ""}
    }
    
    clickHandler() {
        this.props.onSubmit(this.state)
    }
    
    updateUsername(e) {
        const value = e.target.value
        this.setState({username: value})
    }
    
    updatePassword(e) {
        const value = e.target.value
        this.setState({password: value})
    }

    render() {        
        
        const containerStyling = {
            border: '1px solid #999',
            position: 'absolute',
            right: '.25%',
            top: '65px',
            paddingBottom: '3px'
        }
        
        const loginBttnStylying = {
            display: 'block',
            marginTop: '2%',
            marginLeft: '40%'
        }
        
        const usernameStyling = {
            border: "1px solid #999",
            width: '141px',
            margin: "5px 0px 0px 5px"
        }
        
        const passwordStyling = {
            border: "1px solid #999",
            width: '141px',
            margin: "5px 5px 0px 5px"
        }
        
        const errorMsgStyling = {
            fontSize: '12px',
            color: 'red',
            margin: 'auto',
            width: '70%',
            marginTop: '8px'
            
        }
        
        return (
            <div className="container" style={containerStyling} >
                <input type="text" placeholder="username" onChange={this.updateUsername.bind(this)} style={usernameStyling} />
                <input type="password" placeholder="password" onChange={this.updatePassword.bind(this)} style={passwordStyling} />
                
                {renderIf(this.props.loginFailed) (
                    <p style={errorMsgStyling}> Incorrect username or password </p>
                )}
            
                <button style={loginBttnStylying} onClick={this.clickHandler.bind(this)}> login </button>
            </div>
        );
    }
}

module.exports = Login