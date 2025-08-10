import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, Paper } from '@mui/material';

const EditCourseForm = ({ courseId, onClose }) => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    // Add other course fields as needed
  });

  useEffect(() => {
    // Fetch course data by ID and set it to the state
    const fetchCourseData = async () => {
      try {
        // For demonstration purposes, let's assume the API endpoint is /api/courses/:id
        const response = await fetch(`/api/courses/${courseId}`);
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourseData();
  }, [courseId]);

  const handleInputChange = (event) => {
    setCourseData({ ...courseData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // For demonstration purposes, let's assume the API endpoint is /api/courses/:id
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData),
      });
      if (response.ok) {
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        Edit Course
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <label>Course Title:</label>
            <input
              type="text"
              name="title"
              value={courseData.title}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </Grid>
          <Grid item xs={12}>
            <label>Course Description:</label>
            <textarea
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </Grid>
          {/* Add other course fields as needed */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Save Changes
            </Button>
            <Button variant="outlined" onClick={onClose} style={{ marginLeft: '1rem' }}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EditCourseForm;