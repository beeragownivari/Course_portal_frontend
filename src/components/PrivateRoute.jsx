import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CircularProgress, Box } from '@mui/material';

const PrivateRoute = ({ children, role }) => {
  const { user, loading, isAuthenticated, isAdmin, isStudent } = useAuth();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role) {
    if (role === 'ADMIN' && !isAdmin) {
      return <Navigate to="/dashboard/student" replace />;
    }
    if (role === 'STUDENT' && !isStudent) {
      return <Navigate to="/dashboard/admin" replace />;
    }
  }

  return children;
};

export default PrivateRoute; 