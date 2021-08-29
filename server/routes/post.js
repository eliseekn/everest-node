const express = require('express')
const router = express.Router()
const post = require('../controllers/post')

router.route('/')
    .get(post.index)
    .post(post.create)
    .delete(post.deleteAll)

router.route('/:id')
    .get(post.read)
    .put(post.update)
    .delete(post.delete)

module.exports = router