import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CardMedia,
  CircularProgress, // Import CircularProgress for the loading spinner
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const { filterMyPosts } = location.state || {};

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true); // Set loading to true before fetching posts
        let url = "https://blogapp-blmh.onrender.com/api/posts";
        if (filterMyPosts) {
          url += `?userId=${userId}`; 
        }
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
        setLoading(false); // Set loading to false once posts are fetched
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [userId, token, filterMyPosts]);

  const publicImages = [
    '/image1.jpg',
    '/image2.jpg',
    '/image3.jpg',
    '/image4.jpg',
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * publicImages.length);
    return publicImages[randomIndex];
  };

  return (
    <Box sx={{ textAlign: "center", width: "95vw", margin: "10px" }}>
      <Typography variant="h4" gutterBottom>
        {userId ? "My Posts" : "Posts"}
      </Typography>
      {loading ? ( // Render loading spinner if loading state is true
        <CircularProgress style={{ margin: "50px" }} />
      ) : (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} md={4} key={post._id}>
              <Card
                onClick={() => navigate(`/post/${post._id}`)}
                sx={{
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                  cursor: "pointer",
                }}
              >
                <CardMedia>
                  <img
                    component="img"
                    src={post.image || getRandomImage()}
                    alt={post.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "10px 10px 0 0",
                    }}
                  />
                </CardMedia>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{ marginTop: "10px" }}
                  >
                    {post.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Home;
