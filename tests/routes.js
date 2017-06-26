const mongoose = require('mongoose')
const request = require('supertest')
const express = require('express')
const app = express()
const router = require('../src/controls/routes.js')

const makeComments = require('../helper-functions/factory.js').makeComments
const makePosts = require('../helper-functions/factory.js').makePosts
const Comment = require('../src/models/Comment.js')
const Post = require('../src/models/Post.js')

const url = "mongodb://user1:password1@ds155091.mlab.com:55091/redditmock"  
mongoose.connect(url)




app.use('/api', router)


describe('API', () => {
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
            .expect(checkResBody)
            .end(done)
    })
    it('/getCommentsByPost', (done) => {
        request(app)
            .get('/api/getCommentsByPost')
            .expect(200)
            .expect(checkResBody)
            .end(done)
    })
    after(done => {
        Comment.remove({})
            .then(() => Post.remove({}))
            .then(() => done())
    })
})




function checkResBody(res) {
    const respBodyEmpty = Object.keys(res.body).length === 0 && res.body.constructor === Object
    if (respBodyEmpty) {
        throw new Error('Response body needs to contain data')
    }
}