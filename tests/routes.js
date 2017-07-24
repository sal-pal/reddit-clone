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
    const singleComment = makeComments(1)
    const parent = singleComment.parent
    var credentials = {}
    before(done => {   
        prepareTestData(singleComment)
        //Make a request to login endpoint
        request(server)
            .post('/api/login')
            .type('form')
            .send({username: 'srpalo'})
            .send({password: 'secretpassword'})
            .then((res) => {
                cookie = res.header['set-cookie']
                done()
            })
    })
    it('Responses from /login should have 200 status if sending valid credentials', (done) => {
        request(server)
            .post('/api/login')
            .type('form')
            .send({username: 'srpalo'})
            .send({password: 'secretpassword'})
            .expect(200, done)
    })
    it('Responses from /login should have 400 status if sending invalid credentials', (done) => {
        request(server)
            .post('/api/login')
            .type('form')
            .send({username: 'invalid Username'})
            .send({password: 'invalid Password'})
            .expect(400, done)
    })
    it('/api/insertComment', (done) => {
        request(server)
            .post('/api/insertComment')
            .set('Content-Type', 'application/json')
            .send(makeComments(1))
            .query(token)
            .expect(200, done)            
    })
    it('/api/insertPost', (done) => {
        request(server)
            .post('/api/insertPost')
            .set('Content-Type', 'application/json')
            .send(makePosts(1))
            .query(token)
            .expect(200, done)
    })
    it('/api/getAllPosts', (done) => {
        request(server)
            .get('/api/getAllPosts')
            .expect(200)
            .expect(hasResBody)
            .end(done)
    })
    it('/api/getCommentsByPost', (done) => {
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

function prepareTestData (singleComment, done) {
    const callback = (err) => { if (err) {throw err} }
    insert('comment', singleComment, callback)

    const allPosts = makePosts(4)
    insert('post', allPosts)
    setTimeout(() => {}, 4000)    
}