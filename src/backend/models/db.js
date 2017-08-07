const mongooseStrategies = require('./mongooseStrategies.js')





module.exports.insert = function (modelName, inputObj, callback) {
    mongooseStrategies.insert(modelName, inputObj, callback)
}


module.exports.getAllPosts = function (callback) {
    mongooseStrategies.getAllPosts(callback)
}


module.exports.getCommentsByPost = function (objectId, callback) {
    mongooseStrategies.getCommentsByPost(objectId, callback)
}


module.exports.createUser = function (credentials, callback) {
    mongooseStrategies.createUser(credentials, callback)
}