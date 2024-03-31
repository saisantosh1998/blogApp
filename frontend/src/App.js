import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack"; // Import SnackbarProvider
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AuthProvider from "./components/MyContext/MyContext";
import AddPost from "./components/AddPost/AddPost";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Navbar />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/register" exact element={<Register />} />
              <Route path="/upload" exact element={<AddPost />} />
              <Route path="/post/:postId" exact element={<PostDetails />} />
            </Routes>
            <Footer />
          </div>
        </SnackbarProvider>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
