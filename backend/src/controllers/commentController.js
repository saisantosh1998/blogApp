const commentService = require("../services/commentService");

const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const authorId = req.user.id;
    const comment = await commentService.createComment({
      content,
      postId,
      authorId,
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCommentsForPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await commentService.getCommentsForPost(postId);
    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    await commentService.deleteComment(postId, commentId);
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    if (error.message === "Post not found") {
      return res.status(404).json({ error: "Post not found" });
    }
    if (error.message === "Comment not found") {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  createComment,
  getCommentsForPost,
  deleteComment,
};
