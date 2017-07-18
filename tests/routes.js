const request = require('supertest')
const express = require('express')
const app = express()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const expressSession = require('express-session')

const mongoose = require('mongoose')
const url = "mongodb://user1:password1@ds155091.mlab.com:55091/redditmock"  
mongoose.connect(url)





//Configuring local authentication
passport.use(new LocalStrategy(
    (username, password, done) => {
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


//Configuring app to have sessions 
passport.serializeUser((user, done) => {
    done(null, user._id)
})
passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
    done(err, user)
  })
})

app.use(expressSession({secret: 'aSecretKey'}))
app.use(passport.initialize())
app.use(passport.session())


app.post('/api/login', passport.authenticate('local'), (req, res) => res.end())

const server = app.listen(3000)



request(server)
    .post('/api/login')
    .type('form')
    .send({username: "sasd"})
    .send({password: "sdfa"})
    .then((res) => {
        cookie = res.header['set-cookie'][0]
        console.log(res.status)
        console.log(cookie)
    })  