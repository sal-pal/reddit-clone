const path = require("path")
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const router = require('./src/backend/controls/routes.js')

const url = "mongodb://user1:password1@ds155091.mlab.com:55091/redditmock"  
mongoose.connect(url)


app.use('/api', router)

app.use('/', express.static(path.join(__dirname, '/src/frontend/assets')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/frontend/assets/index.html'))
})

app.get('/app.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/frontend/assets/app.js'))
})



app.listen(process.env.PORT || 5000)