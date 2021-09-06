const db = require('../models')

exports.indexAll = (req, res) => {
    db.Comment.find({postId: req.params.postId})
        .then(comments => res.json(comments))
        .catch(err => res.send(err))
}

exports.index = (req, res) => {
    db.Comment.find({postId: req.params.postId})
        .then(comments => {
            const limit = parseInt(req.query.limit ?? 5)
            const totalPages = Math.ceil(comments.length / limit)

            let page = parseInt(req.query.page ?? 1)

            if (!page) {
                page = 1
            }

            if (page > totalPages) {
                page = totalPages
            }

            res.json({
                'page': page,
                'totalPages': totalPages,
                'items': comments.slice((page * limit) - limit, page * limit)
            })
        })
        .catch(err => res.send(err))
}

exports.create = (req, res) => {
    db.Comment.create({
        postId: req.params.postId,
        author: req.body.author,
        content: req.body.content
    })
        .then(comment => res.json(comment))
        .catch(err => res.send(err))
}

exports.delete = (req, res) => {
    db.Comment.deleteOne({_id: req.params.id})
        .then(comment => res.json(comment))
        .catch(err => res.send(err))
}

exports.deleteAll = (req, res) => {
    db.Comment.deleteMany({ postId: req.params.postId })
        .then(comment => res.json(comment))
        .catch(err => res.send(err))
}

module.exports = exports