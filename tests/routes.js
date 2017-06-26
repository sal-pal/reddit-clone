const mongoose = require('mongoose')
const request = require('supertest')
const express = require('express')
const app = express()
const router = require('../src/controls/routes.js')

const makeComments = require('../helper-functions/factory.js').makeComments
const makePosts = require('../helper-functions/factory.js').makePosts
const Comment = require('../src/models/Comment.js')
const Post = require('../src/models/Post.js')
const insert = require('../src/models/db.js').insert

const url = "mongodb://user1:password1@ds155091.mlab.com:55091/redditmock"  
mongoose.connect(url)




app.use('/api', router)


describe('API', () => {
    const singleComment = makeComments(1)
    const parent = singleComment.parent
    before(done => {   
        const callback = (err) => { if (err) {throw err} }
        insert('comment', singleComment, callback)
        
        const allPosts = makePosts(4)
        insert('post', allPosts)
        setTimeout(() => done(), 4000)
    })    
    it('/insertComment', (done) => {
        request(app)
            .post('/api/insertComment')
            .set('Content-Type', 'application/json')
            .send(makeComments(1))
            .expect(200, done)            
    })
    it('/insertPost', (done) => {
        request(app)
            .post('/api/insertPost')
            .set('Content-Type', 'application/json')
            .send(makePosts(1))
            .expect(200, done)
    })
    it('/getAllPosts', (done) => {
        request(app)
            .get('/api/getAllPosts')
            .expect(200)
            .expect(hasResBody)
            .end(done)
    })
    it('/getCommentsByPost', (done) => {
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