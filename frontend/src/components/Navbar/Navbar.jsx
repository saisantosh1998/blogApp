import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import { Stack } from "@mui/material";
import { MyContext } from "../MyContext/MyContext";

const Navbar = () => {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const { logout } = useContext(MyContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    logout();
    window.location.href = "/login";
  };
  const handleMyPosts = () => {
    navigate("/", { state: { filterMyPosts: true } });
  };

  return (
    <AppBar sx={{ backgroundColor: "var(--white)" }} position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link style={{ textDecoration: "none" }} to="/">
          <Typography sx={{ color: "black" }} variant="h6" component="div">
            AppBlog
          </Typography>
        </Link>
        <div>
          {username && (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography
                sx={{
                  color: "black",
                  marginRight: "10px",
                  textAlign: "center",
                }}
                onClick={handleMyPosts}
                style={{ cursor: "pointer" }}
              >
                My Posts
              </Typography>
              <CustomButton
                styles={{ backgroundColor: "var(--green)", color: "white" }}
                onClick={() => navigate("/upload", {state:{open:true,token}})}
              >
                upload
              </CustomButton>
              <Avatar sx={{ bgcolor: "var(--green)", marginRight: "10px" }}>
                {username[0].toUpperCase()}
              </Avatar>
              <Typography
                sx={{
                  color: "black",
                  marginRight: "10px",
                  textAlign: "center",
                }}
              >
                {username}
              </Typography>
              <CustomButton
                styles={{ backgroundColor: "red", color: "white" }}
                onClick={handleLogout}
              >
                Logout
              </CustomButton>
            </Stack>
          )}
          {!username && (
            <>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <CustomButton
                  styles={{ marginRight: "10px", color: "var(--green)" }}
                >
                  Login
                </CustomButton>
              </Link>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <CustomButton
                  styles={{ backgroundColor: "var(--green)", color: "white" }}
                >
                  Register
                </CustomButton>
              </Link>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
