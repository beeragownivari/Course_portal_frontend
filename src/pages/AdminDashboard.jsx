import React, { useState } from 'react';
import {
  School as SchoolIcon,
  Payment as PaymentIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Button, Grid, Typography, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddCourseForm from './AddCourseForm';
import EditCourseForm from './EditCourseForm';

const AdminDashboard = () => {
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showEditCourse, setShowEditCourse] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const navigate = useNavigate();

  const features = [
    { 
      title: 'Manage Courses', 
      icon: <SchoolIcon />, 
      color: '#1976d2', 
      onClick: () => navigate('/admin/courses') 
    },
    { 
      title: 'View Enrollments', 
      icon: <MenuBookIcon />, 
      color: '#f57c00', 
      onClick: () => navigate('/admin/enrollments') 
    },
    // inside features array:
{ 
  title: 'Payments', 
  icon: <PaymentIcon />, 
  color: '#d32f2f',
  onClick: () => navigate('/admin/payments') 
},


    { 
      title: 'Add Course', 
      icon: <AddIcon />, 
      color: '#0288d1', 
      onClick: () => setShowAddCourse(true) 
    },
    { 
      title: 'Edit Course', 
      icon: <EditIcon />, 
      color: '#c2185b',
      onClick: () => {
        setCourseId(1); // For demonstration purposes, let's assume the course ID is 1
        setShowEditCourse(true);
      } 
    },
    { 
      title: 'Admin Profile', 
      icon: <PersonIcon />, 
      color: '#512da8', 
      onClick: () => navigate('/profile') 
    },
  ];

  return (
    <div style={{ padding: '2rem', background: '#f9f9f9', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Admin Dashboard
      </Typography>

      {!showAddCourse && !showEditCourse ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <Grid container spacing={3} justifyContent="center" maxWidth="md">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper elevation={3} style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    startIcon={feature.icon}
                    fullWidth
                    onClick={feature.onClick}
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
        </Box>
      ) : showAddCourse ? (
        <AddCourseForm onClose={() => setShowAddCourse(false)} />
      ) : (
        <EditCourseForm courseId={courseId} onClose={() => setShowEditCourse(false)} />
      )}
    </div>
  );
};

export default AdminDashboard;