const mongoose = require('mongoose')
const request = require('supertest')
const express = require('express')
const app = express()
const router = require('../src/controls/routes.js')
const passport = require('passport')

const bodyParser = require('body-parser')
const expressSession = require('express-session')

const makeComments = require('../helper-functions/factory.js').makeComments
const makePosts = require('../helper-functions/factory.js').makePosts
const Comment = require('../src/models/Comment.js')
const Post = require('../src/models/Post.js')
const insert = require('../src/models/db.js').insert

const url = "mongodb://user1:password1@ds155091.mlab.com:55091/redditmock"  
mongoose.connect(url)




app.use(bodyParser())
app.use(expressSession({secret: 'aSecretKey'}))
app.use(passport.initialize())
app.use(passport.session())



app.use('/api', router)
const server = app.listen(3000)


describe('Routes', () => {
    //Preparing mock comment for /getCommentsByPost
    const singleComment = makeComments(1)
    const parent = singleComment.parent
    before(done => {   
        insertMockData(singleComment)
        //Retrieving an authenticated cookie in order to make requests to protected routes
        request(server)
            .post('/api/login')
            .type('form')
            .send({username: 'valid username'})
            .send({password: 'valid password'})
            .then((res) => {
                cookie = res.header['set-cookie']
                done()
            })
    })
    it('Responses from /login should have 200 status if sending valid credentials', (done) => {
        request(server)
            .post('/api/login')
            .type('form')
            .send({username: 'valid username'})
            .send({password: 'valid password'})
            .expect(200, done)
    })
    it('Responses from /login should have 400 status if sending invalid credentials', (done) => {
        request(server)
            .post('/api/login')
            .type('form')
            .send({username: 'invalid username'})
            .send({password: 'invalid password'})
            .expect(400, done)
    })
    it('Responses from /insertComment should have 200 status after sending authenticated cookie', (done) => {
        request(server)
            .post('/api/insertComment')
            .set('Content-Type', 'application/json')
            .set('Cookie', cookie)
            .send(makeComments(1))
            .expect(200, done)            
    })
    it('Responses from /insertComment should have 401 status after not sending cookie', (done) => {
        request(server)
            .post('/api/insertComment')
            .set('Content-Type', 'application/json')
            .send(makeComments(1))
            .expect(401, done)            
    })
    it('Responses from /insertPost should have 200 status after sending authenticated cookie', (done) => {
        request(server)
            .post('/api/insertPost')
            .set('Content-Type', 'application/json')
            .set('Cookie', cookie)
            .send(makePosts(1))
            .set('Cookie', cookie)
            .expect(200, done)
    })
    it('Responses from /insertPost should have 401 status after not sending cookie', (done) => {
        request(server)
            .post('/api/insertPost')
            .set('Content-Type', 'application/json')
            .send(makePosts(1))
            .expect(401, done)            
    })
    it('Responses from /getAllPosts should have 200 status and a payload', (done) => {
        request(server)
            .get('/api/getAllPosts')
            .expect(200)
            .expect(hasResBody)
            .end(done)
    })
    it('Responses from /getCommentsByPost should have 200 status and a payload', (done) => {
        request(server)
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

function insertMockData (singleComment) {
    insert('comment', singleComment, err => {
        if (err) {throw err} 
    })
    const allPosts = makePosts(4)
    insert('post', allPosts)
    setTimeout(() => {}, 4000)    
}