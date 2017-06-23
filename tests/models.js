const expect = require('chai').expect

const db = require('../src/models/db.js')
const getCommentsByPost = db.getCommentsByPost
const getAllPosts = db.getAllPosts
const insert = db.insert

const makeComments = require('../helper-functions/factory.js').makeComments
const makePosts = require('../helper-functions/factory.js').makePosts
const getObjVals = require('../helper-functions/getObjVals')

const Post = require('../src/models/Post.js')
const Comment = require('../src/models/Comment.js')

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const url = "mongodb://user1:password1@ds155091.mlab.com:55091/redditmock"  
mongoose.connect(url)






describe('getAllPosts', () => {
    const allPosts = makePosts(4)
    
    before(done => {   
        insert('post', allPosts)
        setTimeout(() => done(), 2000)
    })
    
    it('returns an object containing all the posts of our app', done => {
        getAllPosts(result => {
            const postsArr = getObjVals(allPosts)
            const sortedPostsArr = sortByProp(postsArr, 'title')
            const resultArr = getObjVals(result)
            const sortedResultArr = sortByProp(resultArr, 'title')
            
            expect(sortedResultArr).to.eql(sortedPostsArr)
            done()
        })
    })  
        
    after(done => {
        Post.remove({}).then(() => done())
    })
})


describe('getCommentsByPost', () => {
    const singleComment = makeComments(1)
    const customAttrs = ['parent', ObjectId()]
    const multipleComments = makeComments(3, customAttrs)
    
    before(done => { 
        const callback = (err) => { if (err) {throw err} }
        insert('comment', singleComment, callback)
        insert('comment', multipleComments)
        setTimeout(() => done(), 2000)
    })     
    
    it('returns an object representing a single comment if only one comment associated with post', done => {
        const parent = singleComment.parent
        getCommentsByPost(parent, results => {
            expect(results).to.eql(singleComment)
            done()
        })
    })
    
    it('returns an object containing multiple comments asssociated with a post', done => {
        const parent = customAttrs[1]
        getCommentsByPost(parent, result => {
            const commentsArr = getObjVals(multipleComments)
            const sortedCommentsArr = sortByProp(commentsArr, 'comment')
            const resultArr = getObjVals(result)
            const sortedResultArr = sortByProp(resultArr, 'comment')
            
            expect(sortedResultArr).to.eql(sortedCommentsArr)
            done()
        })
    })
    
    after(done => {
        Comment.remove({}).then(() => done())
    })
    
})
         

describe('insert', () => {
    const post = makePosts(1)
    const comment = makeComments(1)
    
    it('stores a new post in the db', done => {
        insert('post', post, err => {
            if (err) throw err
            
            Post.findOne(post, '-_id -__v', {lean: true}, (err, result) => {
                if (err) throw err
                expect(result).to.eql(post)
                done()
            })
        })
    })
    it('stores a new comment in the db', done => {
        insert('comment', comment, err => {
            if (err) throw err
            
            Comment.findOne(comment, (err, result) => {
                if (err) throw err
                expect(result.author).to.eql(comment.author)
                expect(result.comment).to.eql(comment.comment)
                expect(result.parent).to.eql(comment.parent)
                done()
            })
        })        
    })
    
    after(done => {
        Comment.remove({})
            .then(() => Post.remove({}))
            .then(() => done())
    })
})








function sortByProp (arr, prop) {
    arr.sort((a, b) => {
        if (a[prop] < b[prop]) return -1
        if (a[prop] > b[prop]) return 1
        return 0
    })
}