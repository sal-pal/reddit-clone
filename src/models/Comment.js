const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId



const schema = new mongoose.Schema({
    author: {
        type: ObjectId, 
        required: true
    },
    parent: {
        type: ObjectId, 
        required: true
    },
    comment: {
        type: String, 
        required: true
    }
})


schema.statics.getByPost = function(id) {
    return this.find({ parent: id }).populate('author -parent', '-_id username')
}


module.exports = mongoose.model("Comment", schema)