const request = require('supertest')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../src/models/User.js')
const expressSession = require('express-session')
const router = require('../src/controls/routes.js')

const Comment = require('../src/models/Comment.js')
const Post = require('../src/models/Post.js')
const insert = require('../src/models/db.js').insert
const makeComments = require('../helper-functions/factory.js').makeComments
const makePosts = require('../helper-functions/factory.js').makePosts

const mongoose = require('mongoose')
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
            .post('/login')
            .type('form')
            .send({username: 'srpalo'})
            .send({password: 'secretpassword'})
            .then((res) => {
                cookie = res.header['set-cookie'][0]
                done()
            })
    })     
    it('Responses from /login contain a cookie', (done) => {
        request(server)
            .post('/login')
            .type('form')
            .send({username: 'srpalo'})
            .send({password: 'secretpassword'})
            .expect(200)
            .then((res) => {
                const cookie = res.header['set-cookie'][0]
                if (!cookie) {
                    throw new Error('Authentication Failed: response did not contain a cookie')
                }
                done()
            })   
    })
    it('/api/insertComment', (done) => {
        request(server)
            .post('/insertComment')
            .set('Content-Type', 'application/json')
            .send(makeComments(1))
            .query(cookie)
            .expect(200, done)            
    })
    it('/api/insertPost', (done) => {
        request(server)
            .post('/insertPost')
            .set('Content-Type', 'application/json')
            .send(makePosts(1))
            .query(cookie)
            .expect(200, done)
    })
    after(done => {
        Comment.remove({})
            .then(() => Post.remove({}))
            .then(() => done())
    })    
})




function prepareTestData (singleComment, done) {
    const callback = (err) => { if (err) {throw err} }
    insert('comment', singleComment, callback)

    const allPosts = makePosts(4)
    insert('post', allPosts)
    setTimeout(() => {}, 4000)    
}
