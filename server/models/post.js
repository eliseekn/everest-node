const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    slug: {
        type: String
    },

    content: {
        type: String,
        required: true
    },

    image: {
        type: String
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

module.exports = mongoose.model('Post', schema)