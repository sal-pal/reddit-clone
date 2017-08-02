import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import renderIf from 'render-if'
import reddit from './redditImg.png'
const Post = require('./Post.js')
const findObjByKeyValPair = require('../../helper-functions/findObjByKeyValPair.js')


    
    
    

class App extends Component {
    constructor(props) {
        super(props)
        const allPosts = { 
            '0': 
                { title: 'ipsum maiores perspiciatis',
                 author: 'consequatur est consequuntur',
                 id: '597fadc7b702770f9181db58' },
            '1': 
                { title: 'dolorem nisi ut',
                 author: 'aut dolorem neque',
                 id: '597fadc7b702770f9181db5a' },
            '2': 
                { title: 'natus eligendi pariatur',
                 author: 'quis qui soluta',
                 id: '597fadc7b702770f9181db59' },
            '3': 
                { title: 'quibusdam quia eaque',
                 author: 'consectetur perferendis ea',
                 id: '597fadc7b702770f9181db5b' } 
        }

        this.state = {homePageRendered: true, postPageRendered: false, allPosts: allPosts, targetPost: ""}
    }
    
    componentDidMount() {
        //Enables navigating back to home page from post page
        window.onpopstate = function () {
            this.setState({homePageRendered: true, postPageRendered: false})
        }.bind(this)
    }
    
    clickHandler(e) {
        const targetPostID = e.target.attributes.getNamedItem('id').value
        const targetPost = findObjByKeyValPair(this.state.allPosts, ['id', targetPostID])
        this.setState({targetPost: targetPost, homePageRendered: false, postPageRendered: true})
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
        
        const redditImgStyling = {
            position: 'absolute',
            top: '5px',
            left: '160px'
        }
        
        const wrapperStyling = {
            marginLeft: '150px',
            marginTop: '100px'
        }
        
        return (
            <div className="App" style={bannerStyling}>
                <img src={require('./redditImg.png')} style={redditImgStyling} />
                {renderIf(this.state.homePageRendered) (
                    <div className="postWrapper" style={wrapperStyling}>       
                        <Post title="Title" author="SalPal" onClick={this.clickHandler.bind(this)} id='597fadc7b702770f9181db58'/>
                    </div>  
                )}
                
                {renderIf(this.state.postPageRendered) (
                    <div className="postPage" style={wrapperStyling}> 
                        <Post title={this.state.targetPost.title} author={this.state.targetPost.author} />
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
