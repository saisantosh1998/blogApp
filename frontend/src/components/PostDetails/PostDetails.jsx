import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MyContext } from "../MyContext/MyContext";
import {
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress, // Import CircularProgress for the loading spinner
} from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";

const PostDetails = () => {
  const { postId } = useParams();
  const { isAuthenticated } = useContext(MyContext);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://blogapp-blmh.onrender.com/api/posts/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPost(response.data);
        setLoading(false); // Set loading to false once post data is fetched
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId, token]);

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
      setComment("");
      // Reload the post to display the updated comments
      const response = await axios.get(
        `https://blogapp-blmh.onrender.com/api/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPost(response.data);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(
        `https://blogapp-blmh.onrender.com/api/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/home');
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleConfirmDelete = () => {
    setShowConfirmation(false);
    handleDeletePost();
  };

  const publicImages = [
    "../image1.jpg",
    "../image2.jpg",
    "../image3.jpg",
    "../image4.jpg",
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * publicImages.length);
    return publicImages[randomIndex];
  };

  return (
    <div>
      {loading ? ( // Render loading spinner if loading state is true
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <CircularProgress />
        </div>
      ) : post ? ( // Render post details if post data is available
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={10}>
            <Card
              sx={{
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                margin: "2rem 0 5rem 0",
                position: "relative", // Position relative for absolute positioning of button
              }}
            >
              <CardMedia
                component="img"
                height="auto"
                sx={{
                  height: "20rem",
                  objectFit: "contain",
                }}
                image={post.image || getRandomImage()}
                alt={post.title}
              />
              <CardContent>
                <Typography variant="h2" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {post.content}
                </Typography>
                <Typography variant="h4" gutterBottom>
                  Comments
                </Typography>
                {post.comments.map((comment) => (
                  <Stack
                    key={comment._id}
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ marginBottom: "1rem" }}
                  >
                    <Avatar
                      sx={{ bgcolor: "var(--green)", marginRight: "10px" }}
                    >
                      {comment.author.username &&
                        comment.author.username[0].toUpperCase()}
                    </Avatar>
                    <Typography
                      sx={{
                        color: "black",
                        textAlign: "center",
                      }}
                    >
                      {comment.author.username}
                    </Typography>
                    <Typography variant="body2">{comment.content}</Typography>
                  </Stack>
                ))}
                {isAuthenticated && post.author._id === userId && (
                  <CustomButton
                    onClick={() => setShowConfirmation(true)}
                    styles={{
                      position: "absolute",
                      backgroundColor: "red",
                      color: "white",
                      bottom: "10px",
                      right: "10px",
                    }}
                  >
                    Delete Post
                  </CustomButton>
                )}
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
                      style={{ marginBottom: "1rem" }}
                    />
                    <CustomButton styles={{backgroundColor: "var(--green)", color: "white"}} onClick={handleSubmitComment}>
                      Submit Comment
                    </CustomButton>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h3" align="center">Post not found</Typography>
      )}
      <Dialog
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton styles={{ backgroundColor: "red", color: "white" }} onClick={() => setShowConfirmation(false)} color="primary">
            Cancel
          </CustomButton>
          <CustomButton styles={{backgroundColor: "var(--green)", color: "white"}} onClick={handleConfirmDelete} color="primary" autoFocus>
            Delete
          </CustomButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostDetails;
