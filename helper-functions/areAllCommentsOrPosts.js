const isCommentOrPost = require('./isCommentOrPost.js')
const getObjVals = require('./getObjVals.js')




function areAllCommentsOrPosts (modelName, inputObj) {
    
    if (modelName !== 'post' && modelName !== 'comment') {
        throw new TypeError("Need to pass either 'comment' or 'post' for modelName parameter")
    }
    
    const values = getObjVals(inputObj)
    for (var i=0; i < values.length; i++){
        var val = values[i]
        const isPost = isCommentOrPost(modelName, val)
        if (!isPost) {return false}
    }
    return true
}





module.exports = areAllCommentsOrPosts