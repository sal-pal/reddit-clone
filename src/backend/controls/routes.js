const express = require('express')
const router = express.Router()
const db = require('../../../src/backend/models/db.js')
const passport = require('./authentication.js')

const expressSession = require('express-session')
const verifyAuth = require('../../../helper-functions/verifyAuth.js')
const bodyParser = require('body-parser')




//Used to protect routes against un-authenticated requests
router.use('/insertComment', verifyAuth)
router.use('/insertPost', verifyAuth)



router.post('/login',  (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if (err)   return next(err)
        if (!user) return res.sendStatus(400)
        req.logIn(user, function(err) {
            if (err) return next(err); 
            return res.end()
        })
    })(req, res, next)
})

router.post('/signup', (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
        if (err)   return next(err)
        if (!user) return res.sendStatus(400)
        req.logIn(user, function(err) {
            if (err) return next(err); 
            return res.end()
        })
    })(req, res, next)
})

router.post('/insertComment', (req, res) => {
    db.insert('comment', req.body, (err) => {
        if (err) return res.sendStatus(500)
        return res.sendStatus(200)
    })
})

router.post('/insertPost', (req, res) => {
    db.insert('post', req.body, (err) => {
        if (!err) res.sendStatus(200)
    })
})

router.get('/getAllPosts', (req, res) => {
    db.getAllPosts((result) => {
        res.json(result)
    })
})

router.get('/getCommentsByPost/:parent', (req, res) => {
    const parent = req.params.parent
    db.getCommentsByPost(parent, (err, result) => {
        if (!err) return res.json(result)
        if (err.message === 'No comments found') return res.sendStatus(400)
        res.sendStatus(500)
    })
})




module.exports = router
 