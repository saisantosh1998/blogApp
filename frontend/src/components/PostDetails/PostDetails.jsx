import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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
} from "@mui/material";

const PostDetails = () => {
  const { postId } = useParams();
  const { isAuthenticated } = useContext(MyContext);
  const token = localStorage.getItem("token");
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

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

  return (
    <div>
      {post && (
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={10}>
            <Card
              sx={{
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                margin: "2rem 0",
              }}
            >
              <CardMedia
                component="img"
                height="auto"
                sx={{
                  height: "20rem",
                  objectFit: "contain",
                }}
                image={post.image || "../default.svg"}
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
                        marginRight: "10px",
                        textAlign: "center",
                      }}
                    >
                      {comment.author.username}
                    </Typography>
                    <Typography variant="body2">{comment.content}</Typography>
                  </Stack>
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
                      style={{ marginBottom: "1rem" }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmitComment}
                    >
                      Submit Comment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default PostDetails;
