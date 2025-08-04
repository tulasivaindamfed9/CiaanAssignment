const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const auth = require('../middlewares/auth.js');

router.get('/me', auth.protect, userController.getMe);
router.get('/:id', userController.getUser);
router.get('/:id/posts', userController.getUserPosts);
router.patch('/update', auth.protect, userController.updateUser);

module.exports = router;