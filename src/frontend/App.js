import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import reddit from './redditImg.png'

    
    
    
class Post extends Component {
    constructor(props) {
        super(props)
    }  
    
    render() {
        return (
          <div className="Post">
            <h1>Hello World!</h1>
          </div>
        );
    }
}    
    
    

class App extends Component {
    render() {
        return (
            <div className="App">
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
