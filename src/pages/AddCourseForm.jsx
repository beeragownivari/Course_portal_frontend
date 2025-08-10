import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Alert,
  MenuItem,
  Box,
  Switch,
  FormControlLabel
} from '@mui/material';
import api from '../services/api';

const initialState = {
  title: '',
  description: '',
  instructor: '',
  category: '',
  duration: '',
  price: '',
  difficulty: 'BEGINNER',
  thumbnail: '',
  curriculum: '',
  requirements: '',
  active: true
};

const AddCourseForm = ({ onClose }) => {
  const [course, setCourse] = useState(initialState);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...course,
        duration: course.duration ? parseInt(course.duration, 10) : null,
        price: course.price ? Number(course.price) : null,
        curriculum: course.curriculum
          ? course.curriculum.split('\n').map((item) => item.trim()).filter(Boolean)
          : [],
        requirements: course.requirements
          ? course.requirements.split('\n').map((item) => item.trim()).filter(Boolean)
          : []
      };

      await api.post('/api/courses', payload);
      setMessage('✅ Course added successfully!');
      setCourse(initialState);

      setTimeout(() => {
        setMessage('');
        if (onClose) onClose();
      }, 1400);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to add course');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add New Course
      </Typography>

      {message && (
        <Alert
          severity={message.includes('✅') ? 'success' : 'error'}
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          name="title"
          value={course.title}
          onChange={handleChange}
          label="Title"
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <TextField
          name="description"
          value={course.description}
          onChange={handleChange}
          label="Description"
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          name="instructor"
          value={course.instructor}
          onChange={handleChange}
          label="Instructor"
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <TextField
          name="category"
          value={course.category}
          onChange={handleChange}
          label="Category"
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <TextField
          name="duration"
          value={course.duration}
          onChange={handleChange}
          label="Duration (hours)"
          type="number"
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <TextField
          name="price"
          value={course.price}
          onChange={handleChange}
          label="Price"
          type="number"
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <TextField
          select
          name="difficulty"
          value={course.difficulty}
          onChange={handleChange}
          label="Difficulty"
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="BEGINNER">Beginner</MenuItem>
          <MenuItem value="INTERMEDIATE">Intermediate</MenuItem>
          <MenuItem value="ADVANCED">Advanced</MenuItem>
        </TextField>
        <TextField
          name="thumbnail"
          value={course.thumbnail}
          onChange={handleChange}
          label="Thumbnail URL (optional)"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          name="curriculum"
          value={course.curriculum}
          onChange={handleChange}
          label="Curriculum (one item per line)"
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
        <TextField
          name="requirements"
          value={course.requirements}
          onChange={handleChange}
          label="Requirements (one item per line)"
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={course.active}
              onChange={(e) =>
                setCourse((prev) => ({ ...prev, active: e.target.checked }))
              }
              name="active"
              color="primary"
            />
          }
          label="Active"
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Adding...' : 'Add Course'}
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              if (onClose) onClose();
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default AddCourseForm;
