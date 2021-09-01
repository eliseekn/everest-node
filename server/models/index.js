const mongoose = require('mongoose')

mongoose.set('debug', true)
mongoose.connect("mongodb://localhost:3002/everest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
mongoose.Promise = Promise

module.exports.Post = require('./post')