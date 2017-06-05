const faker = require('faker')
const factory = require('factory-girl').factory
const ObjectId = require('mongoose').Types.ObjectId
const Comment = require('../src/models/Comment.js')



factory.define('comment', Comment, {
    comment: () => faker.lorem.sentences(),
    author: () => ObjectId(),
    parent: ObjectId()
})