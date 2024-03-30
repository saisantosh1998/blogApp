import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MyContext } from '../MyContext/MyContext';
import { Typography, Button, TextField } from '@mui/material';

const PostDetails = () => {
  const { postId } = useParams();
  const { isAuthenticated, token } = useContext(MyContext);
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://blogapp-blmh.onrender.com/api/posts/${postId}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async () => {
    try {
      await axios.post(
        `https://blogapp-blmh.onrender.com/api/posts/${postId}/comments`,
        { content: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Clear the comment input after successful submission
      setComment('');
      // Reload the post to display the updated comments
      const response = await axios.get(`https://blogapp-blmh.onrender.com/api/posts/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div>
      {post && (
        <div>
          <Typography variant="h2">{post.title}</Typography>
          {post.image && <img src={post.image} alt={post.title} style={{ maxWidth: '100%', height: 'auto' }} />}
          <Typography variant="body1">{post.content}</Typography>
          <Typography variant="h4">Comments</Typography>
          {post.comments.map((comment) => (
            <Typography key={comment._id} variant="body2">{comment.content}</Typography>
          ))}
          {isAuthenticated && (
            <div>
              <TextField
                label="Add a comment"
                value={comment}
                onChange={handleCommentChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                style={{ marginBottom: '1rem' }}
              />
              <Button variant="contained" color="primary" onClick={handleSubmitComment}>
                Submit Comment
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostDetails;
