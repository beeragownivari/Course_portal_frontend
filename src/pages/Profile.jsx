// src/pages/Profile.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Box, Typography, Avatar, Paper } from '@mui/material';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          No user data available. Please log in.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: 350,
          textAlign: 'center',
          borderRadius: 3,
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: 'primary.main',
            mx: 'auto',
            mb: 2,
            fontSize: 32,
          }}
        >
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </Avatar>
        <Typography variant="h5" gutterBottom>
          {user.name || 'User Name'}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Email:</strong> {user.email || 'N/A'}
        </Typography>
        {user.role && (
          <Typography variant="body1">
            <strong>Role:</strong> {user.role}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Profile;
