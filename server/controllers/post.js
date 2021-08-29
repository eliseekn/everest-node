const db = require('../models')

exports.index = (req, res) => {
    db.Post.find()
        .then(post => res.json(post))
        .catch(err => res.send(err))
}

exports.read = (req, res) => {
    db.Post.findOne({_id: req.params.id})
        .then(post => res.json(post))
        .catch(err => res.send(err))
}

exports.create = (req, res) => {
    db.Post.create(req.body)
        .then(post => res.json(post))
        .catch(err => res.send(err))
}

exports.update = (req, res) => {
    db.Post.findOneAndUpdate({_id: req.params.id}, req.body)
        .then(post => res.json(post))
        .catch(err => res.send(err))
}

exports.delete = (req, res) => {
    db.Post.deleteOne({_id: req.params.id})
        .then(post => res.json(post))
        .catch(err => res.send(err))
}

exports.deleteAll = (req, res) => {
    db.Post.deleteAll()
        .then(post => res.json(post))
        .catch(err => res.send(err))
}

module.exports = exports