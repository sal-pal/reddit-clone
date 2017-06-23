const faker = require('faker')
const ObjectId = require('mongoose').Types.ObjectId




module.exports.makePosts = (amountToMk) => {
    /**
        Produces dumby posts for testing
        
            Input: amountToMk (number)
            Output:
                -A single post object
                -An object whose values are post objects
    **/
    
    
    if (amountToMk === 1) return createPost()
    
    if (amountToMk > 1) {
        var parent = {}
        var i = 0
        while (i < amountToMk) {
            parent[i] = createPost()
            i += 1
        }
        return parent       
    }
    
    throw new Error('Need to pass an int greater than 0 for amountToMk parameter')
}



module.exports.makeComments = (amountToMk, customAttrs) => {
    /**
        Produces dumby comments for testing, but can assign a custom value to one required property
        
            Input: 
                1) amountToMk (number)
                2) customAttrs (an array): the key value pair for the property you wish to change and the value you wish to assign to it.
                                           The first element (a string) is the key and the second element is the value.
            
            Output:
                -A single post object
                -An object whose values are post objects
    **/    
    
    const needOneCommentWithNoCustomization = (amountToMk === 1 & !customAttrs)
    if (needOneCommentWithNoCustomization) return createComment()
    
    
    const needOneCommentWithCustomization = (amountToMk === 1 && customAttrs)
    if (needOneCommentWithCustomization) {
        const comment = createComment()
        try {
            const customComment = assignNewValToProp(comment, customAttrs)
        }
        catch(err) {
            throw new TypeError('Need to pass an array for customAttrs parameter')
        }
        return customComment
    }
    
    //Prepping variables for creating multiple comments
    var parent = {}
    var i = 0
    
    
    const needMultCommentsWithNoCustomization = (amountToMk > 1 && !customAttrs)
    if (needMultCommentsWithNoCustomization) {
        while (i < amountToMk) {
            parent[i] = createComment()
            i += 1
        }
        return parent        
    }
    
    const needMultCommentsWithCustomization = (amountToMk > 1 && customAttrs)
    if (needMultCommentsWithCustomization) { 
        while (i < amountToMk) {
            var comment = createComment()
            try {
                const customComment = assignNewValToProp(comment, customAttrs)
                parent[i] = customComment
                i += 1
            }
            catch(err) {
                throw new TypeError('Need to pass an array for customAttrs parameter')
            }            
        }
        return parent 
    }
    
    
    throw new Error('Need to pass an int greater than 0 for amountToMk param')
  
}







function createPost() {
    return {
        title: faker.lorem.words(),
        body: faker.lorem.sentences(),
        author: ObjectId()
    }
}

function createComment() {
    return {
        parent: ObjectId(),
        comment: faker.lorem.sentences(),
        author: ObjectId()
    }
}

function assignNewValToProp (obj, keyValPair) {
    const isArray = Array.isArray(keyValPair)
    if (!isArray) {
        throw TypeError('Need to pass an array for keyValPair parameter')
    }
    const propToChng = keyValPair[0]
    const newVal = keyValPair[1]
    obj[propToChng] = newVal
    return obj
}