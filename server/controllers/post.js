const db = require('../models')
const fs = require('fs')
const slugify = require('../service/slugify')
const fileUpload = require('../service/file-upload')

exports.index = (req, res) => {
    db.Post.find()
        .then(posts => {
            const limit = parseInt(req.query.limit ?? 5)
            const totalPages = Math.ceil(posts.length / limit)

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

exports.readById = (req, res) => {
    db.Post.findOne({_id: req.params.id})
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
    db.Post.findOneAndUpdate({ _id: req.params.id }, {
        title: req.body.title,
        slug: slugify(req.body.title),
        content: req.body.content,
        updatedAt: new Date()
    })
        .then(post => res.json(post))
        .catch(err => res.send(err))
}

exports.delete = (req, res) => {
    db.Post.findOne({ _id: req.params.id })
        .then(post => {
            try {
                fs.unlinkSync(`${__dirname}/../public/uploads/${post.image}`)
            } catch (err) {
                res.send(err)
            }

            db.Post.deleteOne({ _id: post._id })
                .then(post => {
                    db.Comment.deleteMany({postId: post._id})
                        .then(() => res.json(post))
                        .catch(err => res.send(err))
                })
        })
        .catch(err => res.send(err))
}

exports.deleteAll = (req, res) => {
    db.Post.deleteMany()
        .then(post => res.json(post))
        .catch(err => res.send(err))
}

module.exports = exports