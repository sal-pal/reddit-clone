var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
const db = require('../models/db.js')
const passport = require('passport')



//Routes for the API
router.use(bodyParser.json())
router.use(passport.initialize())
router.use(passport.session())

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
 