import React, { Component } from 'react';
const Post = require("./Post.js")
import logo from './logo.svg';
const redditImg = require('./redditImg.png')
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header" >
            <img className='redditImg' src={redditImg}/>
        </div>
      </div>
    );
  }
}

export default App;
