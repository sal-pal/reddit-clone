const mongoose = require('mongoose')
const request = require('supertest')
const express = require('express')
const app = express()
const router = require('../src/controls/routes.js')
const apiRouter = router.apiRouter
const loginHandler = router.loginHandler

const makeComments = require('../helper-functions/factory.js').makeComments
const makePosts = require('../helper-functions/factory.js').makePosts
const Comment = require('../src/models/Comment.js')
const Post = require('../src/models/Post.js')
const insert = require('../src/models/db.js').insert

const url = "mongodb://user1:password1@ds155091.mlab.com:55091/redditmock"  
mongoose.connect(url)



app.post('/login', loginHandler)
app.use('/api', apiRouter)


describe('Routes', () => {
    const singleComment = makeComments(1)
    const parent = singleComment.parent
    var token = undefined
    var credentials = {}
    before(done => {   
        prepareTestData(singleComment)
        //Make a request to login endpoint
        request(app)
            .post('/login')
            .send(credentials)
            .expect((res) => {
                console.log("Gathering the token")
                token = {access_token: res.body.token}
                done()
            })
    })
    it('Responses from /login contain a cookie', (done) => {
        request(app)
            .post('/login')
            .send(credentials)
            .expect(200)
            .expect((res) => {
                if (!res.body.token) {
                    throw new Error('Authentication Failed: response did not contain a cookie')
                }
                done()
            })
    })
    it('/api/insertComment', (done) => {
        request(app)
            .post('/api/insertComment')
            .set('Content-Type', 'application/json')
            .send(makeComments(1))
            .query(token)
            .expect(200, done)            
    })
    it('/api/insertPost', (done) => {
        request(app)
            .post('/api/insertPost')
            .set('Content-Type', 'application/json')
            .send(makePosts(1))
            .query(token)
            .expect(200, done)
    })
    it('/api/getAllPosts', (done) => {
        request(app)
            .get('/api/getAllPosts')
            .expect(200)
            .expect(hasResBody)
            .end(done)
    })
    it('/api/getCommentsByPost', (done) => {
        request(app)
            .get('/api/getCommentsByPost/' + parent)
            .expect(200)
            .expect(hasResBody)
            .end(done)
    })
    after(done => {
        Comment.remove({})
            .then(() => Post.remove({}))
            .then(() => done())
    })
})




function hasResBody(res) {
    const respBodyEmpty = Object.keys(res.body).length === 0 && res.body.constructor === Object
    if (respBodyEmpty) {
        throw new Error('Response body needs to contain data')
    }
}

function prepareTestData (singleComment, done) {
    const callback = (err) => { if (err) {throw err} }
    insert('comment', singleComment, callback)

    const allPosts = makePosts(4)
    insert('post', allPosts)
    setTimeout(() => {}, 4000)    
}