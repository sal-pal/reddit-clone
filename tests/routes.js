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
    before(done => {   
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
    it('Responses from /signup should have 200 status and an authenticated cookie', (done) => {
        request(server)
            .post('/api/signup')
            .type('form')
            .send({username: 'newUser'})
            .send({password: 'newPassword'})
            .expect(200)
            .then(res => {
                const signupCookie = res.headers['set-cookie']
                request(server)
                    .post('/api/insertPost')
                    .set('Content-Type', 'application/json')
                    .set('Cookie', signupCookie)
                    .send(makePosts(1))
                    .expect(200, done)  
            })
    })
    it("Responses from /signup should have 400 status if sending a signed up user's credentials. The response's cookie should also be unauthenticated", (done) => {
        request(server)
            .post('/api/signup')
            .type('form')
            .send({username: 'valid username'})
            .send({password: 'valid password'})
            .expect(400)
            .then(res => {
                const signupCookie = res.headers['set-cookie']
                request(server)
                    .post('/api/insertPost')
                    .set('Content-Type', 'application/json')
                    .set('Cookie', signupCookie)
                    .send(makePosts(1))
                    .expect(401, done)  
            })
    })
})