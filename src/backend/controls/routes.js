const express = require('express')
const router = express.Router()
const db = require('../../../src/backend/models/db.js')
const passport = require('./authentication.js')

const expressSession = require('express-session')
const verifyAuth = require('../../../helper-functions/verifyAuth.js')
const bodyParser = require('body-parser')
const winston = require('winston')



//Configure logger
winston.add(winston.transports.File, { filename: 'log.txt' })
winston.level = 'error'


//Create protected routes
router.post('/comments', verifyAuth)
router.post('/posts', verifyAuth)






router.post('/login',  (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if (err) {
            const logMsg = JSON.stringify({endpoint: 'POST /login', errorName: err.name, errMsg: err.message})
            winston.log('error', logMsg)          
            return res.sendStatus(500)
        }  
        if (!user) return res.sendStatus(400)
        
        req.logIn(user, function(err) {
            if (err) {
                const logMsg = JSON.stringify({endpoint: 'POST /login', errorName: err.name, errMsg: err.message})
                winston.log('error', logMsg)      
                return res.sendStatus(500)
            } 
            return res.end()
        })
    })(req, res, next)
})

router.post('/signup', (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
        if (err) {
            const logMsg = JSON.stringify({endpoint: 'POST /signup', errorName: err.name, errMsg: err.message})
            winston.log('error', logMsg)  
            return res.sendStatus(500)
        }
        if (!user) return res.sendStatus(400)
        
        req.logIn(user, function(err) {
            if (err) {
                const logMsg = JSON.stringify({endpoint: 'POST /signup', errorName: err.name, errMsg: err.message})
                winston.log('error', logMsg) 
                return res.sendStatus(500)
            }
            return res.end()
        })
    })(req, res, next)
})

router.post('/comments', (req, res) => {
    db.insert('comment', req.body, (err) => {
        if (!err) return res.sendStatus(200)
        res.sendStatus(500)
        const logMsg = JSON.stringify({endpoint: 'POST /comments', errorName: err.name, errMsg: err.message})
        winston.log('error', logMsg)         
    })
})

router.post('/posts', (req, res) => {
    db.insert('post', req.body, (err) => {
        if (!err) return res.sendStatus(200)
        res.sendStatus(500)
        const logMsg = JSON.stringify({endpoint: 'POST /posts', errorName: err.name, errMsg: err.message})
        winston.log('error', logMsg) 
    })
})

router.get('/posts', (req, res) => {
    db.getAllPosts((err, result) => {
        if (!err) return res.json(result)
        res.sendStatus(500)
        const logMsg = JSON.stringify({endpoint: 'GET /posts', errorName: err.name, errMsg: err.message})
        winston.log('error', logMsg) 
    })
})

router.get('/comments/:id', (req, res) => {
    const id = req.params.id
    db.getCommentsByPost(id, (err, result) => {
        if (!err) return res.json(result)
        if (err.message === 'No comments found') return res.sendStatus(400)
        res.sendStatus(500)
        const logMsg = JSON.stringify({endpoint: 'GET /comments/:id', errorName: err.name, errMsg: err.message})
        winston.log('error', logMsg) 
    })
})




module.exports = router
 