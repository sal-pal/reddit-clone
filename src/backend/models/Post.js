const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId 


const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}) 

module.exports = mongoose.model('Post', schema)