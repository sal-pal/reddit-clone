const mongoose = require('mongoose')
const isValidObjectId = mongoose.Types.ObjectId.isValid

const Post = require('./Post.js')
const Comment = require('./Comment.js')

const isCommentOrPost = require('../../helper-functions/isCommentOrPost.js')
const areAllCommentsOrPosts = require('../../helper-functions/areAllCommentsOrPosts.js')
const getObjVals = require('../../helper-functions/getObjVals.js')







function insert (modelName, inputObj, callback) {

    if (modelName !== 'post' && modelName !== 'comment') {
        throw new TypeError("Need to pass either 'comment' or 'post' for modelName parameter")
    }  
    
    if (modelName === 'post') {
        //Insert inputObj into the db if it is a post
        if (isCommentOrPost('post', inputObj)) {
            const post = new Post(inputObj)
            post.save((err) => callback(err))
        }
        //If inputObj's values are all posts, then insert all values into the db
        else if (areAllCommentsOrPosts('post', inputObj)) {
            const values = getObjVals(inputObj)
            for (var i=0; i < values.length; i++){
                var val = values[i]
                const post = new Post(val)
                post.save()
            }
        }
        else {
            throw new TypeError('Need to pass correct object type for inputObj parameter')  
        }
    }
    
    else if (modelName === 'comment') {
        //Insert inputObj into the db if it is a comment
        if (isCommentOrPost('comment', inputObj)) {
            const comment = new Comment(inputObj)
            comment.save((err) => callback(err))
        }
        //If inputObj's values are all comments, then insert all values into the db
        else if (areAllCommentsOrPosts('post', inputObj)) {
            const values = getObjVals(inputObj)
            for (var i=0; i < values.length; i++){
                var val = values[i]
                const comment = new Comment(val)
                comment.save()
            }
        }
        else {
            throw new TypeError('Need to pass correct object type for inputObj parameter')  
        }
    }
}




module.exports = insert