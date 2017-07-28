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
        
        return (
            <div className="App" style={bannerStyling}>
                <Post />
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
