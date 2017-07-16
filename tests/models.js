const expect = require('chai').expect

const db = require('../src/models/db.js')
const getCommentsByPost = db.getCommentsByPost
const getAllPosts = db.getAllPosts
const insert = db.insert
const createUser = db.createUser

const makeComments = require('../helper-functions/factory.js').makeComments
const makePosts = require('../helper-functions/factory.js').makePosts
const getObjVals = require('../helper-functions/getObjVals')

const Post = require('../src/models/Post.js')
const Comment = require('../src/models/Comment.js')
const User = require('../src/models/User.js')

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const url = "mongodb://user1:password1@ds155091.mlab.com:55091/redditmock"  
mongoose.connect(url)






describe('createUser', () => {
    const credentials = {username: 'user1', password: 'password1'}
    before((done) => {
        duplicateCredentials = {username: 'username0', password: 'password0'}
        const user = new User(duplicateCredentials)
        user.save((err) => {
            if (err) throw err
            done()
        })
    }) 
    
    it("returns 'Success' if user successfully created", (done) => {
        createUser(credentials, (err, result) => {
            expect(result).to.equal('Success')
            done()
        })
    })
    it("returns 'Failure' if a user object in the db already contains the username provided by the client", (done) => {
        createUser(duplicateCredentials, (err, result) => {
            expect(result).to.equal('Failure')
            done()
        })
    })
    after((done) => {
        User.remove({}).then(() => done())
    })
})