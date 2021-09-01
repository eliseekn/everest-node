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

    created_at: {
        type: Date,
        default: Date.now
    },

    updated_at: {
        type: Date,
        default: null
    }
})

module.exports = mongoose.model('Post', schema)