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
    before(done => {   
        request(server)
            .post('/api/login')
            .type('form')
            .send({username: 'srpalo'})
            .send({password: 'secretpassword'})
            .then((res) => {
                cookie = res.header['set-cookie'][0]
                done()
            })
    })     
    it('/api/insertComment', (done) => {
        request(server)
            .post('/api/insertComment')
            .set('Content-Type', 'application/json')
            .set('Set-Cookie', cookie)
            .send(makeComments(1))
            .then((req, res) => {
                console.log(res)
                done()
            })            
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
