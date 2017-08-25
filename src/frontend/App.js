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
const ID = require('../../helper-functions/ID.js')
const request = require('superagent')


    
    
    

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {homePgRndrd: true, 
                      postPgRndrd: false,
                      signupRndrd: false,
                      loginRndrd: true,
                      postArr: "", 
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
        const preparePostList = function(err, res) {
            const postArr = getObjVals(res.body)
            postArr.reverse()
            const postList = postArr.map(post => {
                return <Post 
                    title={post.title} 
                    author={post.author} 
                    id={post.id} 
                    titleHighlighted={true} 
                    onClick={this.clickPostHndlr.bind(this)} 
                />
            })
            this.setState({postList: postList, postArr: postArr})
        }
        
        request
            .get("http://localhost:5000/api/posts")
            .end(preparePostList.bind(this))
    }
    
    clickPostHndlr(e) {
        //Navigate to post page and render the post just clicked on
        const targetPostID = e.target.attributes.getNamedItem('id').value
        const targetPost = findObjByKeyValPair(this.state.postArr, ['id', targetPostID])
        this.setState({targetPost: targetPost, homePgRndrd: false, postPgRndrd: true})
        
        //Load all the comnts associated with the post just clicked on
        const loadComments = function (err, res) {
            if (res.status === 200) {
                
                const resBody = res.body
                try {getObjVals(resBody)}
                catch(err) {
                    const haveOneComment = (err.message === "All values of the input object need to be Object() instances")
                    if (haveOneComment) {
                        const comnt = res.body
                        const comntComp = <Comment  
                            author={comnt.author} 
                            body={comnt.comment} 
                        />
                        return this.setState({comntList: [comntComp], comntCntrRndrd: true})
                    }
                }
                const comnts = getObjVals(resBody)
                comnts.reverse()
                const comntList = comnts.map(comnt => {
                    return <Comment  
                        author={comnt.author} 
                        body={comnt.comment} 
                    />
                })
                return this.setState({comntList: comntList, comntCntrRndrd: true})
            }    
        }            
          
        request
            .get("http://localhost:5000/api/comments/" + targetPostID)
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
            const newState = {loginRndrd: false, activeUser: username}
            if (res.status == 200) this.setState(newState, thnkYouMsg)
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
        
        const comnt = {
            author: this.state.activeUser,
            parent: this.state.targetPost.id,
            comment: this.state.comntSubmitTxt
        }
        
        const callback = function(err, res) {
            if (res.status == 200) {
                const comntComp = <Comment  
                    author={comnt.author} 
                    body={comnt.comment} 
                />
                const comntList = this.state.comntList
                comntList.unshift(comntComp)
                this.setState({comntList: comntList, comntCntrRndrd: true})
            }
        }
              
        request
            .post("http://localhost:5000/api/comments")
            .send(comnt)
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
            author: this.state.activeUser,
            id: ID(),
            timestamp: Date.now()
        }
      
        const loadPost = function(err, res) {
            if (res.status == 200) {
                const postComp = <Post  
                    title={post.title}
                    author={post.author}
                    id={post.id}
                    titleHighlighted={true}
                    onClick={this.clickPostHndlr.bind(this)} 
                />
                
                //Updated state.postList & state.postArr separately since updating them together caused an error
                const postList = this.state.postList
                postList.unshift(postComp)
                this.setState({postList: postList})
                
                var postArr = this.state.postArr
                postArr.push(post)
                this.setState({postArr: postArr}, () => console.log(this.state.postArr[postArr.length-1].timestamp))
            }
        }
        
        request
            .post("http://localhost:5000/api/posts")
            .send(post)
            .end(loadPost.bind(this))
    }
    
    backBttnClickHndlr() {
        this.setState({homePgRndrd: true, postPgRndrd: false, comntList: [], comntCntrRndrd: false})
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
        
        const comntHeader = {
            fontSize: '15px',
            fontWeight: '200',
            color: '#4D5763',
            marginTop: '8%'
        }
        
        const comntContainerStyling = {
            marginLeft: '1%',
            marginRight: '18%',
            paddingLeft: '1%',            
            borderColor: '#e6eeff',
            borderStyle: 'solid',
            borderRadius: '5'
        }
        
        const comntTextBoxStyling = {
            width: '500px',
            height: '100px',
            marginLeft: '1%'
        }
        
        const comntSubmissionBttnStyling = {
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
        
        const backBttnStyling = {
            position: 'absolute',
            top: '75px',
            left: '165px'
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
                        <button style={backBttnStyling} onClick={this.backBttnClickHndlr.bind(this)}> Back </button>
                        <Post title={this.state.targetPost.title} author={this.state.targetPost.author} />
                        <p style={comntHeader}> Comments </p>
                    
                        <textarea style={comntTextBoxStyling} onChange={this.comntTxtChngeHndlr.bind(this)}/> 
                        <button style={comntSubmissionBttnStyling} onClick={this.comntSubmitHndlr.bind(this)}> save </button>
                    
                        {renderIf(this.state.comntCntrRndrd) (
                            <div style={comntContainerStyling}>
                                {this.state.comntList}
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
