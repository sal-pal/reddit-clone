const mongoose = require('mongoose')
const request = require('supertest')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const url = "mongodb://user1:password1@ds155091.mlab.com:55091/redditmock"  
mongoose.connect(url)




passport.use(new LocalStrategy(
    (username, password, done) => {
        console.log('Verify Called')
        User.findOne({username: username}, (err, user) => {
            if (err) return done(err)
            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }
            if (user.password !== password) {
                return done(null, false, { message: 'Incorrect password.' })
            }
            return done(null, user)
        })
    }
))

app.use(bodyParser.json())
app.use(passport.initialize())



app.post('/login', passport.authenticate('local', {failureFlash: 'Invalid username or password.'}))

describe('Routes', () => {
    it('Responses from /login contain a cookie', (done) => {
        request(app)
            .post('/login')
            .send({username: 'Sal', password: 'Pal'})
            .expect((res) => {
                console.log(res.body)
                done()
            })
    })
})