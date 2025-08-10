import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Grid
} from '@mui/material';
import { People as PeopleIcon } from '@mui/icons-material';
import api from '../services/api'; // Your existing API service

const EnrollmentsPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enrollmentsRes, statsRes] = await Promise.all([
          api.get('/api/enrollments'), // Fetch enrollment list
          api.get('/api/stats')        // Fetch stats like in Home
        ]);

        setEnrollments(enrollmentsRes.data);
        setTotalUsers(statsRes.data.totalStudents || 0); // Same value as home page
      } catch (error) {
        console.error('Error fetching enrollments or stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ py: 6, background: '#f9f9f9', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Page Title */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }}
        >
          <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} />
          Enrollments
        </Typography>

        {/* Total Users Card */}
        {!loading && (
          <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 2,
                }}
              >
                <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                  {totalUsers}+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Total Enrolled Users
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Loading State */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          /* Enrollments Table */
          <Paper sx={{ p: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: '#1976d2' }}>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Student Name</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Course Title</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Enrollment Date</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {enrollments.map((enrollment) => (
                  <TableRow key={enrollment.id} hover>
                    <TableCell>{enrollment.studentName}</TableCell>
                    <TableCell>{enrollment.courseTitle}</TableCell>
                    <TableCell>
                      {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{enrollment.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default EnrollmentsPage;
