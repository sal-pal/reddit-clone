const mongoose = require('mongoose')
const request = require('supertest')
const express = require('express')
const app = express()
const router = require('../src/backend/controls/routes.js')
const passport = require('passport')

const bodyParser = require('body-parser')
const expressSession = require('express-session')

const makeComments = require('../helper-functions/factory.js').makeComments
const makePosts = require('../helper-functions/factory.js').makePosts
const insert = require('../src/backend/models/db.js').insert
const createUser = require('../src/backend/models/db.js').createUser

const Comment = require('../src/backend/models/Comment.js')
const Post = require('../src/backend/models/Post.js')
const User = require('../src/backend/models/User.js')


const url = "mongodb://user1:password1@ds155091.mlab.com:55091/redditmock"  
mongoose.connect(url)




app.use(bodyParser())
app.use(expressSession({secret: 'aSecretKey'}))
app.use(passport.initialize())
app.use(passport.session())



app.use('/api', router)
const server = app.listen(3000)


describe('Routes', () => {
    //Creates mock data
    const validCredentials = {username: 'valid username', password: 'valid password'}
    const singleComment = makeComments(1)
    const parent = singleComment.parent
    before(done => {   
        insertAllMockData(singleComment, validCredentials, (err, user) => {
            const userNotInsertedInDb = !user
            if (err) throw err
            if (userNotInsertedInDb) throw new Error("The credentials you passed are already in use")
            
            //Retrieves an authenticated cookie in order to make requests to protected routes
            request(server)
                .post('/api/login')
                .type('form')
                .send({username: validCredentials.username})
                .send({password: validCredentials.password})
                .then((res) => {
                    cookie = res.header['set-cookie']
                    done()
                })
            })
    })   
    it('Responses from /login should have 200 status if sending valid credentials', (done) => {
        request(server)
            .post('/api/login')
            .type('form')
            .send({username: validCredentials.username})
            .send({password: validCredentials.password})
            .expect(200, done)
    })

    after(done => {
        Comment.remove({})
            .then(() => Post.remove({}))
            .then(() => User.remove({}))
            .then(() => done())
            
    })
})






function hasResBody(res) {
    const respBodyEmpty = Object.keys(res.body).length === 0 && res.body.constructor === Object
    if (respBodyEmpty) {
        throw new Error('Response body needs to contain data')
    }
}

function insertAllMockData (singleComment, validCredentials, callback) {
    insert('comment', singleComment, err => {
        if (err) {throw err} 
    })
    insert('post', makePosts(4))
    setTimeout(() => {}, 4000)
    
    createUser(validCredentials, callback)
}