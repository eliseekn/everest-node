const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: new Date()
    },

    updatedAt: {
        type: Date,
        default: null
    }
})

module.exports = mongoose.model('Comment', schema)