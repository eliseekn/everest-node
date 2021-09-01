const db = require('../models')
const slugify = require('../service/slugify')
const fileUpload = require('../service/file-upload')

exports.index = (req, res) => {
    db.Post.find()
        .then(posts => {
            const limit = parseInt(req.query.limit)
            const totalPages = Math.ceil(posts.length / limit)

            let page = parseInt(req.query.page)

            if (!page) {
                page = 1
            }

            if (page > totalPages) {
                page = totalPages
            }

            res.json({
                'page': page,
                'totalPages': totalPages,
                'items': posts.slice((page * limit) - limit, page * limit)
            })
        })
        .catch(err => res.send(err))
}

exports.read = (req, res) => {
    db.Post.findOne({slug: req.params.slug})
        .then(post => res.json(post))
        .catch(err => res.send(err))
}

exports.create = (req, res) => {
    const fileName = fileUpload(req, res, `${__dirname}/../public/uploads`)

    db.Post.create({
        title: req.body.title,
        slug: slugify(req.body.title),
        content: req.body.content,
        image: fileName
    })
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