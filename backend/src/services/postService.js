// services/postService.js

const Post = require("../models/Post");

const getAllPosts = async () => {
  try {
    const posts = await Post.find().populate("author").populate({
      path: 'comments',
      populate: {
        path: 'author',
        select: '-_id username email'
      }
    });
    return posts;
  } catch (error) {
    throw error;
  }
};

const getPostById = async (postId) => {
  try {
    const post = await Post.findById(postId)
      .populate("author")
      .populate("comments");
      if(!post) {
        throw new Error("Post not found").statusCode(404);
      }
    return post;
  } catch (error) {
    throw error;
  }
};

const createPost = async ({ title, content, authorId, image}) => {
  try {
    const post = new Post({ title, content, author: authorId, image});
    await post.save();
    return post;
  } catch (error) {
    throw error;
  }
};

const updatePost = async (postId, newData) => {
  try {
    const post = await Post.findByIdAndUpdate(postId, newData, { new: true });
    return post;
  } catch (error) {
    throw error;
  }
};

const deletePost = async (postId) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    await Post.findByIdAndDelete(postId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
