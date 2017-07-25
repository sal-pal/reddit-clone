/**
        Reminder: Set timeout to 10000 when executing these tests
**/



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
    
    it("returns the user object if the user was successfully created", (done) => {
        createUser(credentials, (err, user) => {
            expect(user).to.have.property('username')
            expect(user).to.have.property('password')
            done()
        })
    })
    it("returns undefined if a user object in the db already contains the username provided by the client", (done) => {
        createUser(duplicateCredentials, (err, user) => {
            expect(user).to.be.undefined
            done()
        })
    })
    after((done) => {
        User.remove({}).then(() => done())
    })
})