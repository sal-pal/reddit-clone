const each = require('foreach')
const isCommentOrPost = require('./isCommentOrPost.js')




function areAllCommentsOrPosts (modelName, inputObj) {
    if (typeof modelName !== 'string') {
        throw new TypeError('Need to pass string for modelName parameter')
    }
    
    else if (modelName === 'post') {
        
    }
        
    else if (modelName === 'comment') {
        
    }
    
    else {
        throw new Error("Need to pass 'comment' or 'post' for modelName")
    }
}