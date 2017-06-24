var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
const insert = require('../models/db.js').insert




router.use(bodyParser.json())

router.post('/insertComment', (req, res) => {
    insert('comment', req.body, (err) => {
        if (!err) res.sendStatus(200)
    })
})




module.exports = router