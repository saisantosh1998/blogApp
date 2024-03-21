const Post = require("../models/Post");
const Comment = require("../models/Comment");

const createComment = async ({ content, postId, authorId }) => {
  try {
    const comment = new Comment({ content, author: authorId });
    await comment.save();
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    post.comments.push(comment);
    await post.save();
    return comment;
  } catch (error) {
    throw error;
  }
};

const getCommentsForPost = async (postId) => {
  try {
    const post = await Post.findById(postId).populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: '-_id username email'
        }
      });
    if (!post) {
      throw new Error("Post not found");
    }
    return post.comments;
  } catch (error) {
    throw error;
  }
};

const deleteComment = async (postId, commentId) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    const comment = post.comments.find(comment => comment._id.toString() === commentId);
    if (!comment) {
      throw new Error('Comment not found');
    }
    post.comments.pull(commentId);
    await post.save();
  } catch (error) {
    throw error;
  }
};

module.exports = { createComment, getCommentsForPost, deleteComment };
