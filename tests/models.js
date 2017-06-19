const expect = require('chai').expect
const insert = require('../src/models/db.js').insert
const makeComments = require('../helper-functions/factory.js').makeComments
const makePosts = require('../helper-functions/factory.js').makePosts

const Post = require('../src/models/Post.js')
const Comment = require('../src/models/Comment.js')

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const url = "mongodb://user1:password1@ds155091.mlab.com:55091/redditmock"  
mongoose.connect(url)




describe('getAllPosts', () => {
    const posts = makePosts(4)
    
    before(done => {   
        insert('post', posts)
        setTimeout(() => done(), 2000)
    })
    
    after(done => {
        Post.remove({}).then(() => done())
    })
    
    it('returns an object containing all the posts of our app', () => {
        
    })  
    it('throws an error if a error arises in querying the database')
})


describe('getCommentsByPost', () => {
    
    before((done) => {
        const singleComment = makeComments(1)
        const customAttrs = ['parent', ObjectId()]
        const multipleComments = makeComments(3, customAttrs)
        
        const callback = (err) => { if (err) {throw err} }
        insert('comment', singleComment, callback)
        insert('comment', multipleComments)
        
        setTimeout(() => done(), 2000)
    })     
    
    after(done => {
        Comment.remove({}).then(() => done())
    })
    
    it('returns a string if no comments are found in the database')
    it('returns an object representing a single comment if only one comment associated with post')
    it('returns an object containing multiple comments asssociated with a post')
    it('throws an error if a error arises in querying the database')    
})
