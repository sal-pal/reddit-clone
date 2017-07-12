const express = require('express')
const router = express.Router()
const db = require('../models/db.js')
const passport = require('./authentication.js')

const expressSession = require('express-session')
const verifyAuth = require('../../helper-functions/verifyAuth.js')
const bodyParser = require('body-parser')




//Used to protect routes against un-authenticated requests
router.use('/insertComment', verifyAuth)
router.use('/insertPost', verifyAuth)



router.post('/login', passport.authenticate('local'), (req, res) => res.end())

router.post('/insertComment', (req, res) => {
    db.insert('comment', req.body, (err) => {
        if (!err) res.sendStatus(200)
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
    db.getCommentsByPost(parent, (result) => {
        res.json(result)
    })
})




module.exports = router
 