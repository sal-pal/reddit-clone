import React, { Component } from 'react'
const renderIf = require('render-if')


class Login extends Component {
    constructor(props) {
        super(props)
    }

    render() {        
        
        const containerStyling = {
            border: '1px solid #808080',
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
                <input type="text" placeholder="username" style={usernameStyling} />
                <input type="password" placeholder="password" style={passwordStyling} />
                
                {renderIf(this.props.loginFailed) (
                    <p style={errorMsgStyling}> Incorrect username or password </p>
                )}
            
                <button style={loginBttnStylying}> login </button>
            </div>
        );
    }
}

module.exports = Login