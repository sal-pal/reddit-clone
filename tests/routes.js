const request = require('supertest')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../src/models/User.js')
const expressSession = require('express-session')
const router = require('../src/controls/routes.js')

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
    it('Responses from /login contain a cookie', (done) => {
        request(server)
            .post('/api/login')
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
})
