// controllers/postController.js

const postService = require('../services/postService');

const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.postId);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user.id;
    const post = await postService.createPost({ title, content, authorId });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const postId = req.params.postId;
    const updatedPost = await postService.updatePost(postId, { title, content });
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    await postService.deletePost(postId);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    if (error.message === 'Post not found') {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(400).json({ error: error.message });
  }
};

module.exports={
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
}