/**
        Given an object wrapper containing objects, this function will find the child object containing a 
        desired key-value pair.
        
            -Output: An object
            -Input: 
                a) An object wrapper
                b) An array whose first element is the desired key and whose second element is the desired 
                   value.    
**/



const getObjVals = require('./getObjVals.js')


module.exports = function (objWrapper, keyValPair) {
    //Check that passed an array
    if (!Array.isArray(keyValPair)) {
        throw new TypeError("Need to pass an array for keyValPair parameter")
    }
    
    //Check whether keyValPair's elements are not strings
    if ((typeof keyValPair[0]) !== 'string' && (typeof keyValPair[1]) !== 'string') {
        throw new TypeError("The array passed for keyValPair needs to contain only strings")
    }
    
    //Iterate until the object containing the desired key-value pair is found
    const objects = getObjVals(objWrapper)
    for (var i=0; i < objects.length; i++) {
        const obj = objects[i]
        const desiredKey = keyValPair[0]
        const desiredVal = keyValPair[1]
        if (obj[desiredKey] === desiredVal) {
            return obj
        }
    }
    
    throw new Error("None of the objects' keys were assigned your desired value")
}