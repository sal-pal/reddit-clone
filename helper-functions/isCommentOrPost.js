/**
        Determines if an object is either a post or comment
        
            -Output: A boolean 
            -Input:
                a) modelName (string)
                b) inputObj (Object instance)
                
            Error Handling:
                -Throws an error if modelName not assigned either of the strings 'comment' or 'post'
**/





module.exports = (modelName, inputObj) => {
    
    if (modelName !== 'post' && modelName !== 'comment') {
        throw new Error("Need to pass either 'comment' or 'post' for modelName")
    }
    
    if (modelName === 'post') {
        
        const postHasTitle = inputObj.hasOwnProperty('title')
        const postHasAuthor = inputObj.hasOwnProperty('author')
        const postHasId = inputObj.hasOwnProperty('id')
        const postHasTimestamp = inputObj.hasOwnProperty('timestamp')
        const inputIsPost = (postHasTitle && postHasAuthor && postHasId && postHasTimestamp)
        
        if (inputIsPost) {
            
            const titleIsString = (typeof inputObj.title === 'string')
            const authorIsString = (typeof inputObj.author === 'string')
            const idIsString = (typeof inputObj.id === 'string')
            const timestampIsString = (typeof inputObj.timestamp === 'string')
            const propsAreCorrectTypes = (titleIsString && authorIsString && idIsString && timestampIsString)
            
            if (propsAreCorrectTypes) return true
            else return false
        }
        
        else {return false}
    }
    
    else if (modelName === 'comment') {
        
        const commentHasAuthor = inputObj.hasOwnProperty('author')
        const commentHasParent = inputObj.hasOwnProperty('parent')
        const commentHasComment = inputObj.hasOwnProperty('comment')
        const commentHasTimestamp = inputObj.hasOwnProperty('timestamp')
        const inputIsComment = (commentHasAuthor && commentHasParent && commentHasComment && commentHasTimestamp)
        
        if (inputIsComment) {
            
            const authorIsString = (typeof inputObj.author === 'string')
            const parentIsString = (typeof inputObj.parent === 'string')
            const commentIsString = (typeof inputObj.comment === 'string')
            const timestampIsString = (typeof inputObj.timestamp === 'string')
            const propsAreCorrectTypes = (authorIsString && parentIsString && commentIsString && timestampIsString)
            
            if (propsAreCorrectTypes) return true
            else return false
        }
        
        else return false   
    }
}