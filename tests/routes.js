const request = require('supertest')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy





passport.use(new LocalStrategy(
    (username, password, done) => {
        console.log('Verify Called')
        done()
    }
))

app.use(bodyParser())
app.use(passport.initialize())
app.use(passport.session())


app.post('/login', passport.authenticate('local'), (req, res) => {
    console.log('Login route hit')
})

const server = app.listen(3000)

describe('Routes', () => {
    it('Responses from /login contain a cookie', () => {
        request(server)
            .post('/login')
            .type('form')
            .send({username: 'srpalo'})
            .send({password: 'secretpassword'})
    })
})