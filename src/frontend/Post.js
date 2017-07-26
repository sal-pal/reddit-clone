/**
        Props:
            1) title
            2) user who submitted the post
            4) Body
            
        State:
            1) timeSincePosted
            
        -When press share button, a tiny share component appears.
         Thus, should make a separate componnent for sharing url
         
        -When press comment button, a share component appears
**/


import React, { Component } from 'react'

class Post extends Component {
  render() {
    return (
      <div className="Post">
        <h1>Hello World!</h1>
      </div>
    );
  }
}

module.exports = Post
