import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import renderIf from 'render-if'
import reddit from './redditImg.png'
    
const Post = require('./Post.js')
const Comment = require('./Comment.js')
const Login = require('./Login.js')
const Signup = require('./Signup.js')

const findObjByKeyValPair = require('../../helper-functions/findObjByKeyValPair.js')
const getObjVals = require('../../helper-functions/getObjVals.js')
const request = require('superagent')


    
    
    

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {homePgRndrd: true, 
                      postPgRndrd: false,
                      signupRndrd: false,
                      loginRndrd: true,
                      postObjects: "", 
                      targetPost: "", 
                      postList: [], 
                      comntList: [], 
                      comntCntnrRndrd: false, 
                      activeUser: "",
                      comntSubmitTxt: "",
                      postSubmitTxt: ""
        }
    }

    
    componentDidMount() {
        //Enables navigating back to home page from post page
        window.onpopstate = function () {
            this.setState({homePgRndrd: true, postPgRndrd: false, commentList: [], comntCntrRndrd: false})
        }.bind(this)
        
        const preparePostList = function(err, res) {
            const posts = getObjVals(res.body)
            const postList = posts.map(post => {
                return <Post 
                    title={post.title} 
                    author={post.author} 
                    id={post.id} 
                    titleHighlighted={true} 
                    onClick={this.clickPostHndlr.bind(this)} 
                />
            })
            this.setState({postList: postList, postObjects: res.body})
        }
        
        request
            .get("http://localhost:5000/api/getAllPosts")
            .end(preparePostList.bind(this))
    }
    
    clickPostHndlr(e) {
        //Navigate to post page and render the post just clicked on
        const targetPostID = e.target.attributes.getNamedItem('id').value
        const targetPost = findObjByKeyValPair(this.state.postObjects, ['id', targetPostID])
        this.setState({targetPost: targetPost, homePgRndrd: false, postPgRndrd: true})
        
        //Load all the comments associated with the post just clicked on
        const loadComments = function (err, res) {
            if (res.status === 200) {
                
                const resBody = res.body
                try {getObjVals(resBody)}
                catch(err) {
                    const haveOneComment = (err.message === "All values of the input object need to be Object() instances")
                    if (haveOneComment) {
                        const comment = res.body
                        const commentComp = <Comment  
                            author={comment.author} 
                            body={comment.comment} 
                        />
                        return this.setState({commentList: [commentComp], comntCntrRndrd: true})
                    }
                }
                const comments = getObjVals(resBody)
                const commentList = comments.map(comment => {
                    return <Comment  
                        author={comment.author} 
                        body={comment.comment} 
                    />
                })
                return this.setState({commentList: commentList, comntCntrRndrd: true})
            }    
        }            
          
        request
            .get("http://localhost:5000/api/getCommentsByPost/" + targetPostID)
            .end(loadComments.bind(this))
    }
    
    loginReqHndlr(credentials) {     
        const callback = function (err, res) {
            if (err) {
                if (err.message === 'Bad Request') return alert('Incorrect username or password')
                return alert('Sorry, an error occured with the server')
            } 
            const username = credentials.username
            const thnkYouMsg = () => alert('Thank you for logging in!')
            const newStateData = {loginRndrd: false, activeUser: username}
            if (res.status == 200) this.setState(newStateData, thnkYouMsg)
        }
        
        request
            .post("http://localhost:5000/api/login")
            .send('username=' + credentials.username)
            .send('password=' + credentials.password)
            .end(callback.bind(this))
    }
    
    signupReqHndlr(credentials) {
        const username = credentials.username
        const password = credentials.password
        const verifyPassword = credentials.verifyPassword
        
        if (password !== verifyPassword) {
            return alert('Passwords do not match')
        }
        
        
        const callback = function (err, res) {
            if (err) {
                if (err.message === 'Bad Request') return alert('Username is already in use')
                return alert('Sorry, an error occured with the server')
            } 
            const thnkYouMsg = () => alert('Thank you for signing up!')
            const newStateData = {signupRndrd: false, activeUser: username}
            if (res.status == 200) this.setState(newStateData, thnkYouMsg)
        }
        
        request
            .post("http://localhost:5000/api/signup")
            .send('username=' + username)
            .send('password=' + password)
            .end(callback.bind(this))
    }
    
    comntTxtChngeHndlr(e) {
        const text = e.target.value
        this.setState({comntSubmitTxt: text})
    }
    
    comntSubmitHndlr() {
        if (!this.state.activeUser) return alert('Please signup or login before making comments')
        if (!this.state.comntSubmitTxt) return alert('Comment needs to contain text')
        
        const comment = {
            author: this.state.activeUser,
            parent: this.state.targetPost.id,
            comment: this.state.comntSubmitTxt
        }
        
        const callback = function(err, res) {
            if (res.status == 200) {
                const commentComp = <Comment  
                    author={comment.author} 
                    body={comment.comment} 
                />
                const commentList = this.state.commentList
                commentList.unshift(commentComp)
                this.setState({commentList: commentList, comntCntrRndrd: true})
            }
        }
        
        
        
        request
            .post("http://localhost:5000/api/insertComment")
            .send(comment)
            .end(callback.bind(this))
    }
    
    postTxtChngeHndlr(e) {
        const text = e.target.value
        this.setState({postSubmitTxt: text})
    }
    
    postSubmitHndlr() {
        if (!this.state.activeUser) return alert('Please signup or login before making posts')
        if (!this.state.postSubmitTxt) return alert('Post needs to contain text')
        
        const post = {
            title: this.state.postSubmitTxt,
            author: this.state.activeUser
        }
      
        const loadPost = function(err, res) {
            if (res.status == 200) {
                const postComp = <Post  
                    title={post.title}
                    author={post.author}
                    titleHighlighted={true}
                    onClick={this.clickPostHndlr.bind(this)} 
                />
                const postList = this.state.postList
                postList.unshift(postComp)
                this.setState({postList: postList})
            }
        }
        
        
        
        request
            .post("http://localhost:5000/api/insertPost")
            .send(post)
            .end(loadPost.bind(this))
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
        
        const signupMsgContainerStyling = {
            position: 'absolute',
            right: '0px',
            bottom: '0px',
            backgroundColor: '#EFF7FF',
            padding: '4px',
            lineHeight: '12px',
            borderTopLeftRadius: '7px',
            color: '#808080',
            font: 'small verdana',
        }
        
        const signupLinkStyling = {
            font: 'small verdana',
            textDecoration: 'none'
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
        
        const commentTextBoxStyling = {
            width: '500px',
            height: '100px',
            marginLeft: '1%'
        }
        
        const commentSubmissionBttnStyling = {
            display: 'block',
            marginLeft: '1%',
            marginBottom: '1%',
            marginTop: '.5%'
        }
        
        const postTxtBoxStyling = {
            width: '220px',
            height: '40px'       
        }
        
        const postSubmitBttnStyling = {
            display: 'block',
            marginBottom: '3%',
            marginTop: '.5%'
        }
        
        return (
            <div className="App" style={bannerStyling}>
                {renderIf(this.state.loginRndrd) (
                    <div>
                        <span style={signupMsgContainerStyling}> 
                            Want to join?&nbsp;
                            <a href="#" style={signupLinkStyling} onClick={() => this.setState({signupRndrd: true, loginRndrd: false})}> 
                                Signup 
                            </a>
                            &nbsp;in seconds
                        </span>
                        <Login onSubmit={this.loginReqHndlr.bind(this)}/>
                    </div>
                )}
                
                {renderIf(this.state.signupRndrd) (
                    <Signup onSignupRequest={this.signupReqHndlr.bind(this)} />
                )}
                
                <img src={require('./redditImg.png')} style={redditImgStyling} />
                
                {renderIf(this.state.homePgRndrd) (
                    <div className="postWrapper" style={wrapperStyling}>       
                        <textarea style={postTxtBoxStyling} onChange={this.postTxtChngeHndlr.bind(this)}/> 
                        <button style={postSubmitBttnStyling} onClick={this.postSubmitHndlr.bind(this)}> submit post </button>
                        {this.state.postList}
                    </div>  
                )}
                
                {renderIf(this.state.postPgRndrd) (
                    <div className="postPage" style={wrapperStyling}> 
                        <Post title={this.state.targetPost.title} author={this.state.targetPost.author} />
                        <p style={commentHeader}> Comments </p>
                    
                        <textarea style={commentTextBoxStyling} onChange={this.comntTxtChngeHndlr.bind(this)}/> 
                        <button style={commentSubmissionBttnStyling} onClick={this.comntSubmitHndlr.bind(this)}> save </button>
                    
                        {renderIf(this.state.comntCntrRndrd) (
                            <div style={commentContainerStyling}>
                                {this.state.commentList}
                            </div>                        
                        )}
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
