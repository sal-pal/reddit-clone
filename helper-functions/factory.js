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
    
    
    if (amountToMk === 1) {
         return {
            title: faker.lorem.words(),
            body: faker.lorem.sentences(),
            author: ObjectId()
        }
    }
    
    if (amountToMk > 1) {
        var parent = {}
        var i = 0

        while (i < amountToMk) {
            parent[i] = {
                title: faker.lorem.words(),
                body: faker.lorem.sentences(),
                author: ObjectId()
            }
            i += 1
        }
        return parent       
    }
    
    throw new Error('Need to pass an int greater than 0 for amountToMk param')
    
    
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
    
    
    if (amountToMk === 1 & !customAttrs) {
        return {
            parent: ObjectId(),
            comment: faker.lorem.sentences(),
            author: ObjectId()
        }
    }
    
    if (amountToMk === 1 && customAttrs) {
        const comment = {
            parent: ObjectId(),
            comment: faker.lorem.sentences(),
            author: ObjectId()
        }
        const isArray = Array.isArray(customAttrs)
        if (!isArray) {
            throw TypeError('Need to pass an array for customAttrs parameter')
        }
        const propToChng = customAttrs[0]
        const newVal = customAttrs[1]
        comment[propToChng] = newVal
        
        return comment
    }
    
    //Prepping variables for creating multiple comments
    var parent = {}
    var i = 0
    
    
    if (amountToMk > 1 && !customAttrs) {
        while (i < amountToMk) {
            parent[i] = {
                parent: ObjectId(),
                comment: faker.lorem.sentences(),
                author: ObjectId()
            }
            i += 1
        }
        return parent        
    }
    
    if (amountToMk > 1 && customAttrs) {
        const isArray = Array.isArray(customAttrs)
        if (!isArray) {
            throw TypeError('Need to pass an array for customAttrs parameter')
        }        
        
        while (i < amountToMk) {
            var comment = {
                parent: ObjectId(),
                comment: faker.lorem.sentences(),
                author: ObjectId()
            }

            const propToChng = customAttrs[0]
            const newVal = customAttrs[1]
            comment[propToChng] = newVal
            
            parent[i] = comment
            i += 1
        }
        return parent 
    }
    
    
    throw new Error('Need to pass an int greater than 0 for amountToMk param')
  
}





