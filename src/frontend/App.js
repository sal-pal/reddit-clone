import React, { Component } from 'react';
import ReactDOM from 'react-dom'
const Post = require('./Post.js')
import reddit from './redditImg.png'

    
    
    

class App extends Component {

    render() {
        const bannerStyling = {
            backgroundColor: '#cee3f8',
            border: 'solid #30b5b5',
            height: '15px',
            position: 'absolute',
            padding: '20px',
            borderWidth: 'thin',
            
            top: '0',
            right: '0',
            left: '0'
        }
        
        const postWrapperStyling = {
            marginLeft: '150px',
            marginTop: '100px'
        }
        
        return (
            <div className="App" style={bannerStyling}>
                <div className="postWrapper" style={postWrapperStyling}>       
                    <Post title="Title" author="SalPal"/>
                    <Post title="Title" author="SalPal"/>
                    <Post title="Title" author="SalPal"/>
                    <Post title="Title" author="SalPal"/>
                </div>
            </div>
        )
    }
}




function run() {
    ReactDOM.render(<App/>, document.getElementById('root'));
}

if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', run);
} 
else {
    window.attachEvent('onload', run);
}
