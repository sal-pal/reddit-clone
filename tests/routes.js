const request = require('supertest')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy





passport.use(new LocalStrategy(
    (username, password, done) => console.log('Verify Called')
))

app.use(bodyParser.json())
app.use(passport.initialize())


app.post('/login', passport.authenticate('local', {failureFlash: 'Invalid username or password.'}))

describe('Routes', () => {
    it('Responses from /login contain a cookie', (done) => {
        request(app)
            .post('/login')
            .type('form')
            .send({username: 'srpalo'})
            .send({password: 'secretpassword'})
        done()
    })
})