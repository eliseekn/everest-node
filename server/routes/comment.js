const express = require('express')
const router = express.Router()
const comment = require('../controllers/comment')

router.route('/:postId')
    .get(comment.index)
    .post(comment.create)

router.get('/all/:postId', comment.indexAll)
router.delete('/:id', comment.delete)

module.exports = router