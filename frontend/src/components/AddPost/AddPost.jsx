import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomButton from '../CustomButton/CustomButton'; // Import your custom button component

const AddPost = () => {
  const location = useLocation();
  const { open, token} = location.state;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(open);
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    image: '',
  });
  
  const onClose = () => {
    setIsOpen(false);
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://blogapp-blmh.onrender.com/api/posts',
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onClose();
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Add New Post</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={postData.title}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Content"
            name="content"
            value={postData.content}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={postData.image}
            onChange={handleChange}
            margin="normal"
          />
          <CustomButton type="submit" styles={{ marginTop: '1rem',backgroundColor: 'var(--green)', color: 'white' }}>Add Post</CustomButton>
          <CustomButton onClick={onClose} styles={{ marginTop: '1rem',marginLeft: '1rem',backgroundColor: 'red', color: 'white' }}>Close</CustomButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPost;
