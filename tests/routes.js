const request = require('supertest')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const expressSession = require('express-session')
const User = require('../src/models/User.js')


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



app.use(bodyParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressSession({secret: 'aSecretKey'}))
app.use(passport.initialize())
app.use(passport.session())


app.post('/api/login',  function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err)   return next(err)
    if (!user) return res.redirect('/login'); 
    req.logIn(user, function(err) {
      if (err) return next(err); 
      return res.end()
    });
  })(req, res, next);
})
app.post('/api/insertComment', (req, res) => {
    console.log(req.isAuthenticated())
    res.end()
})




const server = app.listen(3000)


describe('Routes', () => {
    before(done => {   
        //Logging in the user
        request(server)
            .post('/api/login')
            .type('form')
            .send({username: 'srpalo'})
            .send({password: 'secretpassword'})
            .then((res) => {
                cookie = res.header['set-cookie']
                done()
            })
    })     
    it('/api/insertComment', (done) => {
        request(server)
            .post('/api/insertComment')
            .set('Cookie', cookie)
            .then((req, res) => {
                done()
            })            
    })    
})