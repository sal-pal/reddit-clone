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
        //Inserting credentials into db for sign up to fail, then logging in to retrieve a cookie
        duplicateCredentials = {username: 'username0', password: 'password0'}
        const user = new User(duplicateCredentials)
        user.save((err) => {
            if (err) throw err
            request(server)
                .post('/api/login')
                .type('form')
                .send({username: duplicateCredentials.username})
                .send({password: "sdfa"})
                .then((res) => {
                    cookie = res.header['set-cookie'][0]
                    console.log(cookie)
                    done()
                })        
        })        
    })     
    it('/api/insertComment', (done) => {
        request(server)
            .post('/api/insertComment')
            .set('Content-Type', 'application/json')
            .set('Set-Cookie', cookie)
            .send(makeComments(1))
            .then((req, res) => {
                done()
            })            
    })
    it('responses from /api/signup should have a response status of 200 if sending credentials not already contained in db', (done) => {
        request(server)
            .post('/api/signup')
            .type('form')
            .send({username: 'user'})
            .send({password: 'password'})
            .expect(200)
            .then((res) => {
                cookie = res.header['set-cookie'][0]
                
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
