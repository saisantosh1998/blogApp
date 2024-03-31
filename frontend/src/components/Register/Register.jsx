import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Container,
} from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";
import axios from "axios";
import { useSnackbar } from "notistack"; 
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { enqueueSnackbar } = useSnackbar(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://blogapp-blmh.onrender.com/api/auth/register",
        formData
      );
      enqueueSnackbar(response.data.message || "Registration successful", {
        variant: "success",
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Registration failed", { variant: "error" });
      }
    }
  };

  return (
    <Container
      maxWidth="md"
      style={{ margin: "auto", marginRight: 0, maxWidth: "500px" }}
    >
      <Card
        sx={{ borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
      >
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
            />
            <CustomButton
              styles={{ backgroundColor: "var(--green)", color: "white" }}
              type="submit"
            >
              Register
            </CustomButton>
            <br></br>
            <span>
              Already have an account?{" "}
              <Link
                style={{ textDecoration: "none", color: "var(--green)" }}
                to="/login"
              >
                Login
              </Link>
            </span>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;
