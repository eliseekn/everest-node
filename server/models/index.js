const mongoose = require('mongoose')

mongoose.set('debug', true)
mongoose.connect("mongodb://localhost:3002/everest", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.Promise = Promise

module.exports.Post = require('./post')