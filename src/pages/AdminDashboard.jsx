import React from 'react';
import {
  School as SchoolIcon,
  People as PeopleIcon,
  TrendingUp as TrendingIcon,
  Payment as PaymentIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

import MenuBookIcon from '@mui/icons-material/MenuBook'; // ✅ Replaces the invalid 'Course' icon

import { Button, Grid, Typography, Paper } from '@mui/material';

const AdminDashboard = () => {
  const features = [
    { title: 'Manage Courses', icon: <SchoolIcon />, color: '#1976d2' },
    { title: 'Manage Users', icon: <PeopleIcon />, color: '#388e3c' },
    { title: 'View Enrollments', icon: <MenuBookIcon />, color: '#f57c00' }, // ✅ Fixed
    { title: 'Analytics', icon: <TrendingIcon />, color: '#7b1fa2' },
    { title: 'Payments', icon: <PaymentIcon />, color: '#d32f2f' },
    { title: 'Add Course', icon: <AddIcon />, color: '#0288d1' },
    { title: 'Edit Course', icon: <EditIcon />, color: '#c2185b' },
    { title: 'Admin Profile', icon: <PersonIcon />, color: '#512da8' },
  ];

  return (
    <div style={{ padding: '2rem', background: '#f9f9f9', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Paper elevation={3} style={{ padding: '1.5rem', textAlign: 'center' }}>
              <Button
                variant="contained"
                startIcon={feature.icon}
                fullWidth
                style={{
                  backgroundColor: feature.color,
                  color: '#fff',
                  fontWeight: 'bold',
                  padding: '0.75rem 1rem',
                }}
              >
                {feature.title}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AdminDashboard;
