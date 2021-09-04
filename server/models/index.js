require('dotenv').config();
const mongoose = require('mongoose')

mongoose.set('debug', true)

mongoose.connect(process.env.MONGODB_SERVER_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

mongoose.Promise = Promise

module.exports.Post = require('./post')
module.exports.Comment = require('./comment')
module.exports.User = require('./user')