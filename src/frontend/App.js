import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import renderIf from 'render-if'
import reddit from './redditImg.png'
const Post = require('./Post.js')
const Comment = require('./Comment.js')
const findObjByKeyValPair = require('../../helper-functions/findObjByKeyValPair.js')
const getObjVals = require('../../helper-functions/getObjVals.js')


    
    
    

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {homePageRendered: true, postPageRendered: false, postObjects: "", targetPost: "", postList: []}
    }
    
    componentDidMount() {
        //Enables navigating back to home page from post page
        window.onpopstate = function () {
            this.setState({homePageRendered: true, postPageRendered: false})
        }.bind(this)
        
        fetch("http://localhost:5000/api/getAllPosts")
            .then(body => body.json())
            .then(posts => {
                const postList = getObjVals(posts).map(post => {
                    return <Post 
                        title={post.title} 
                        author={post.author} 
                        id={post.id} 
                        titleHighlighted={true} 
                        onClick={this.clickHandler.bind(this)} 
                    />
                })
                this.setState({postList: postList, postObjects: posts})
            })
    }
    
    clickHandler(e) {
        //Navigate to post page and render the post just clicked on
        const targetPostID = e.target.attributes.getNamedItem('id').value
        const targetPost = findObjByKeyValPair(this.state.postObjects, ['id', targetPostID])
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
        
        const commentHeader = {
            fontSize: '15px',
            fontWeight: '200',
            color: '#4D5763',
            marginTop: '8%'
        }
        
        const commentContainerStyling = {
            marginLeft: '1%',
            marginRight: '18%',
            paddingLeft: '1%',            
            borderColor: '#e6eeff',
            borderStyle: 'solid',
            borderRadius: '5'
        }
        
        return (
            <div className="App" style={bannerStyling}>
                <img src={require('./redditImg.png')} style={redditImgStyling} />
                {renderIf(this.state.homePageRendered) (
                    <div className="postWrapper" style={wrapperStyling}>       
                        {this.state.postList}
                    </div>  
                )}
                
                {renderIf(this.state.postPageRendered) (
                    <div className="postPage" style={wrapperStyling}> 
                        <Post title={this.state.targetPost.title} author={this.state.targetPost.author} />
                        <p style={commentHeader}> Comments </p>
                        <div style={commentContainerStyling}>
                            <Comment author="srpalomino" body="sdafsdafasdfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" />
                            <Comment author="srpalomino" body="sdafsdafasdfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" />
                            <Comment author="srpalomino" body="sdafsdafasdfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" />
                        </div>
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
