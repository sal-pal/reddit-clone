import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import renderIf from 'render-if'
import reddit from './redditImg.png'
const Post = require('./Post.js')


    
    
    

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {homePageRendered: false, postPageRendered: true}
    }  
    
    
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
        
        const wrapperStyling = {
            marginLeft: '150px',
            marginTop: '100px'
        }
        
        return (
            <div className="App" style={bannerStyling}>
                {renderIf(this.state.homePageRendered) (
                    <div className="postWrapper" style={wrapperStyling}>       
                        <Post title="Title" author="SalPal"/>
                        <Post title="Title" author="SalPal"/>
                        <Post title="Title" author="SalPal"/>
                        <Post title="Title" author="SalPal"/>
                    </div>  
                )}
            
                {renderIf(this.state.postPageRendered) (
                    <div className="postPage" style={wrapperStyling}> 
                        <p>HelloWorld</p>
                    </div>
                )}
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
