// routes/postRoutes.js

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/', authenticateToken, postController.createPost);
router.get('/', authenticateToken, postController.getAllPosts);
router.get('/:postId', authenticateToken, postController.getPostById);
router.put('/:postId', authenticateToken, postController.updatePost);
router.delete('/:postId', authenticateToken, postController.deletePost);

// Comments CRUD
router.post('/:postId/comments', authenticateToken, commentController.createComment);
router.get('/:postId/comments', authenticateToken, commentController.getCommentsForPost);
router.delete('/:postId/comments/:commentId', authenticateToken, commentController.deleteComment);

module.exports = router;
