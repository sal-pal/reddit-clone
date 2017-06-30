const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require('../models/db.js')
const passport = require('passport')
const expressSession = require('express-session')
const verifyAuth = require('../../helper-functions/verifyAuth.js')




router.use(bodyParser.json())
router.use(expressSession({secret: 'aSecretKey'}))
router.use(passport.initialize())
router.use(passport.session())

//Used to protect routes against un-authenticated requests
router.use('/insertComment', verifyAuth)
router.use('/insertPost', verifyAuth)



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


module.exports.loginHandler = (req, res) => {
    
}


module.exports.apiRouter = router
 