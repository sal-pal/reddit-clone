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
passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) { // callback with email and password from our form

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    console.log("Verify called")
    User.findOne({ 'local.email' :  email }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err)
            return done(err);

        // if no user is found, return the message
        if (!user)
            return done(null, false); // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (!user.validPassword(password))
            return done(null, false); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        return done(null, user);
    });

}));


//Configuring app to have sessions 
passport.serializeUser((user, done) => {
    done(null, user.id)
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


app.post('/api/login', passport.authenticate('local-login'));
app.post('/api/insertComment', (req, res) => {
    console.log("Logged in: " + req.isAuthenticated())
    res.end();
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
                cookie = res.header['set-cookie'][0]
                console.log("Login response status: " + res.status)
                done()
            })
    })     
    it('/api/insertComment', (done) => {
        request(server)
            .post('/api/insertComment')
            .set('Content-Type', 'application/json')
            .set('Set-Cookie', cookie)
            .then((req, res) => {
                done()
            })            
    })    
})