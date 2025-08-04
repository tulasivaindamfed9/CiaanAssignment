const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js');
const auth = require('../middlewares/auth.js');

// GET /api/posts - Get all posts
router.get('/', postController.getAllPosts);

// POST /api/posts - Create a new post (protected)
router.post('/', auth.protect, postController.createPost);

module.exports = router;