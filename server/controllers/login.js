const db = require('../models')
const bcrypt = require('bcrypt')

exports.authenticate = (req, res) => {
    db.User.findOne({email: req.body.email})
        .then(user => {
            if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
                res.status(400)
            }

            res.json(user)
        })
        .catch(err => res.send(err))
}

module.exports = exports