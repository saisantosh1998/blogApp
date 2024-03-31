import React, { useContext, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext/MyContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useContext(MyContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

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
        "https://blogapp-blmh.onrender.com/api/auth/login",
        formData
      );
      const { token, userId, username } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      login();
      enqueueSnackbar(response.data.message || "Login successful", {
        variant: "success",
      });
      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Login failed", { variant: "error" });
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
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
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
              Login
            </CustomButton>
            <br></br>
            <span>
              Don't have an account?{" "}
              <Link
                style={{ textDecoration: "none", color: "var(--green)" }}
                to="/register"
              >
                Register
              </Link>
            </span>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
