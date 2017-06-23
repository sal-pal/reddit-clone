/**
        Determines if an object is either a post or comment
        
            -Output: A boolean 
            -Input:
                a) modelName (string)
                b) inputObj (Object instance)
                
            Error Handling:
                -Throws an error if modelName not assigned either of the strings 'comment' or 'post'
**/



const isValidObjectId = require('mongoose').Types.ObjectId.isValid




module.exports = (modelName, inputObj) => {
    
    if (modelName !== 'post' && modelName !== 'comment') {
        throw new Error("Need to pass either 'comment' or 'post' for modelName")
    }
    
    if (modelName === 'post') {
        
        const postHasTitle = inputObj.hasOwnProperty('title')
        const postHasBody = inputObj.hasOwnProperty('body')
        const postHasAuthor = inputObj.hasOwnProperty('author')
        const inputIsPost = (postHasTitle && postHasBody && postHasAuthor)
        
        if (inputIsPost) {
            
            const titleIsString = (typeof inputObj.title === 'string')
            const bodyIsString = (typeof inputObj.body === 'string')
            const authorIsObjectId = isValidObjectId (inputObj.author)
            const propsAreCorrectTypes = (titleIsString && bodyIsString && authorIsObjectId)
            
            if (propsAreCorrectTypes) return true
            else return false
        }
        
        else {return false}
    }
    
    else if (modelName === 'comment') {
        
        const commentHasAuthor = inputObj.hasOwnProperty('author')
        const commentHasParent = inputObj.hasOwnProperty('parent')
        const commentHasComment = inputObj.hasOwnProperty('comment')
        const inputIsComment = (commentHasAuthor && commentHasParent && commentHasComment)
        
        if (inputIsComment) {
            
            const authorIsObjectId = isValidObjectId (inputObj.author)
            const parentIsObjectId = isValidObjectId (inputObj.parent)
            const commentIsString = (typeof inputObj.comment === 'string')
            const propsAreCorrectTypes = (authorIsObjectId && parentIsObjectId && commentIsString)
            
            if (propsAreCorrectTypes) return true
            else return false
        }
        
        else return false   
    }
}