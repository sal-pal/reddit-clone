const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User.js')
const createUser = require('../models/db.js').createUser


//Configuring local authentication
passport.use('local-login', new LocalStrategy(
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


passport.use('local-signup', new LocalStrategy(
    (username, password, done) => {
        const credentials = {username: username, password: password}
        createUser(credentials, (err, user) => {
            if (err) return done(err)
            if (!user) {
                return done(null, false)
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




module.exports = passport