const express = require('express')
const router = express.Router()
const db = require('../../../src/backend/models/db.js')
const passport = require('./authentication.js')

const expressSession = require('express-session')
const verifyAuth = require('../../../helper-functions/verifyAuth.js')
const bodyParser = require('body-parser')
const winston = require('winston')


//Configuring logger
winston.add(winston.transports.File, { filename: 'log.txt' });
winston.level = 'error';






router.post('/login',  (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if (err) {
            const logMsg = JSON.stringify({routeName: 'login', errorName: err.name, errMsg: err.message})
            winston.log('error', logMsg)          
            return res.sendStatus(500)
        }  
        if (!user) return res.sendStatus(400)
        
        req.logIn(user, function(err) {
            if (err) {
                const logMsg = JSON.stringify({routeName: 'login', errorName: err.name, errMsg: err.message})
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
            const logMsg = JSON.stringify({routeName: 'signup', errorName: err.name, errMsg: err.message})
            winston.log('error', logMsg)  
            return res.sendStatus(500)
        }
        if (!user) return res.sendStatus(400)
        
        req.logIn(user, function(err) {
            if (err) {
                const logMsg = JSON.stringify({routeName: 'signup', errorName: err.name, errMsg: err.message})
                winston.log('error', logMsg) 
                return res.sendStatus(500)
            }
            return res.end()
        })
    })(req, res, next)
})

router.post('/insertComment', (req, res) => {
    db.insert('comment', req.body, (err) => {
        if (!err) return res.sendStatus(200)
        res.sendStatus(500)
        const logMsg = JSON.stringify({routeName: 'insertComment', errorName: err.name, errMsg: err.message})
        winston.log('error', logMsg)         
    })
})

router.post('/insertPost', (req, res) => {
    db.insert('post', req.body, (err) => {
        if (!err) return res.sendStatus(200)
        res.sendStatus(500)
        const logMsg = JSON.stringify({routeName: 'insertPost', errorName: err.name, errMsg: err.message})
        winston.log('error', logMsg) 
    })
})

router.get('/getAllPosts', (req, res) => {
    db.getAllPosts((err, result) => {
        if (!err) return res.json(result)
        res.sendStatus(500)
        const logMsg = JSON.stringify({routeName: 'getAllPosts', errorName: err.name, errMsg: err.message})
        winston.log('error', logMsg) 
    })
})

router.get('/getCommentsByPost/:parent', (req, res) => {
    const parent = req.params.parent
    db.getCommentsByPost(parent, (err, result) => {
        if (!err) return res.json(result)
        if (err.message === 'No comments found') return res.sendStatus(400)
        res.sendStatus(500)
        const logMsg = JSON.stringify({routeName: 'getCommentsByPost', errorName: err.name, errMsg: err.message})
        winston.log('error', logMsg) 
    })
})




module.exports = router
 