const mongoose = require('mongoose')
const isValidObjectId = mongoose.Types.ObjectId.isValid
const isCommentOrPost = require('../../helper-functions/isCommentOrPost.js')
const Post = require('./Post.js')
const Comment = require('./Comment.js')





function insert (modelName, inputObj, callback) {

    if (typeof modelName !== 'string') {
        throw new TypeError('Need to pass string for modelName parameter')
    }
    
    if (modelName === 'post') {
        //Checking if inputObj is a single post
        if (isCommentOrPost('post', inputObj)) {
            //If is a single post, then insert it into the db
            const post = new Post(inputObj)
            post.save((err) => callback(err))
            
            
        }
    }
    
    else if (modelName === 'comment') {
        
    }
    
    else {
        throw new Error('Need to pass a valid model name')
    }
}




module.exports = insert