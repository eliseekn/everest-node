const express = require('express')
const router = express.Router()
const post = require('../controllers/post')

router.route('/')
    .get(post.index)
    .post(post.create)
    .delete(post.deleteAll)

router.route('/:slug')
    .get(post.read)
    
router.route('/:id')
    .put(post.update)
    .delete(post.delete)

module.exports = router