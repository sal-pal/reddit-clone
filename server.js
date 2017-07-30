const path = require("path")
const express = require("express")
const app = express()

app.use('/', express.static(path.join(__dirname, '/src/frontend/assets')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/frontend/assets/index.html'))
})

app.get('/app.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/frontend/assets/app.js'))
})



app.listen(process.env.PORT || 5000)