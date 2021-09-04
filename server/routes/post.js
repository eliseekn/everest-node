const express = require('express')
const router = express.Router()
const post = require('../controllers/post')

router.route('/')
    .get(post.index)
    .post(post.create)
    .delete(post.deleteAll)

router.get('/:slug', post.read)    
router.get('/id/:id', post.readById)
    
router.route('/:id')
    .put(post.update)
    .delete(post.delete)

module.exports = router