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
    
    if (typeof modelName !== 'string') {
        throw new TypeError('Need to pass string for modelName parameter')
    }
    
    if (modelName === 'post') {
        
        const inputHasTitle = inputObj.hasOwnProperty('title')
        const inputHasBody = inputObj.hasOwnProperty('body')
        const inputHasAuthor = inputObj.hasOwnProperty('author')
        
        if (inputHasTitle && inputHasBody && inputHasAuthor) {
            
            const titleIsString = (typeof inputObj.title === 'string')
            const bodyIsString = (typeof inputObj.body === 'string')
            const authorIsObjectId = isValidObjectId (inputObj.author)
            
            if (titleIsString && bodyIsString && authorIsObjectId) {
                return true
            }
            else {return false}
        }
        
        else {return false}
    }
    
    else if (modelName === 'comment') {
        
        const inputHasAuthor = inputObj.hasOwnProperty('author')
        const inputHasParent = inputObj.hasOwnProperty('parent')
        const inputHasComment = inputObj.hasOwnProperty('comment')
        
        if (inputHasAuthor && inputHasParent && inputHasComment) {
            
            const authorIsObjectId = isValidObjectId (inputObj.author)
            const parentIsObjectId = isValidObjectId (inputObj.parent)
            const commentIsString = (typeof inputObj.comment === 'string')
            
            if (authorIsObjectId && parentIsObjectId && commentIsString) {
                return true
            }
            else {return false}
        }
        
        else {return false}    
    }
    
    else {throw new Error("Need to pass either 'comment' or 'post' for modelName")}
}