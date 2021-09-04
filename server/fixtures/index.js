const bcrypt = require('bcrypt')
const db = require('../models')
let users = require('./user.json')

exports.load = () => {
    db.Post.deleteMany()
        .then(() => {})
    
    db.Comment.deleteMany()
        .then(() => {})

    db.User.deleteMany()
        .then(() => {
            users.map(user => {
                db.User.create({
                    email: user.email,
                    password: bcrypt.hashSync(user.password, 10)
                })
                    .catch(err => console.log(err))
            })
        })
}

module.exports = exports