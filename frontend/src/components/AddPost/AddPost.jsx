import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField} from '@mui/material';
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
  });
  const [errors, setErrors] = useState({
    title: false,
    content: false,
  });

  const onClose = () => {
    setIsOpen(false);
    navigate('/home');
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

    // Check if title and content are not empty
    if (!postData.title.trim() || !postData.content.trim()) {
      setErrors({
        title: !postData.title.trim(),
        content: !postData.content.trim(),
      });
      return;
    }

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
            label={
              <>
                Title<span style={{ color: 'red' }}>*</span>
              </>
            }
            name="title"
            value={postData.title}
            onChange={handleChange}
            margin="normal"
            error={errors.title}
            helperText={errors.title && 'Title is required'}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label={
              <>
                Content<span style={{ color: 'red' }}>*</span>
              </>
            }
            name="content"
            value={postData.content}
            onChange={handleChange}
            margin="normal"
            error={errors.content}
            helperText={errors.content && 'Content is required'}
          />
          <CustomButton type="submit" styles={{ marginTop: '1rem', backgroundColor: 'var(--green)', color: 'white' }}>Add Post</CustomButton>
          <CustomButton onClick={onClose} styles={{ marginTop: '1rem', marginLeft: '1rem', backgroundColor: 'red', color: 'white' }}>Close</CustomButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPost;
