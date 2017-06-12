const faker = require('faker')
const factory = require('factory-girl').factory
const ObjectId = require('mongoose').Types.ObjectId
const Comment = require('../src/models/Comment.js')
const Post = require('../src/models/Post.js')



factory.define('Comment', Comment, {
    comment: () => faker.lorem.sentences(),
    author: () => ObjectId(),
    parent: ObjectId()
})


factory.define('Post', Post, {
    title: () => faker.lorem.words(),
    body: faker.lorem.sentences(),
    author: () => ObjectId()
})



module.exports = factory