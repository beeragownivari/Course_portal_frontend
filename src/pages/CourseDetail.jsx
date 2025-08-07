import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  CheckCircle as CheckIcon,
  School as SchoolIcon,
  Star as StarIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrolling, setEnrolling] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await api.get(`/api/courses/${id}`);
      setCourse(response.data);
      setError('');
    } catch (error) {
      setError('Failed to load course details.');
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/course/${id}` } } });
      return;
    }

    setEnrolling(true);
    try {
      // Simulate payment process
      setShowPaymentDialog(true);
    } catch (error) {
      console.error('Error enrolling:', error);
    } finally {
      setEnrolling(false);
    }
  };

  const handlePaymentSubmit = async () => {
    setEnrolling(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response = await api.post('/api/enrollments', {
        courseId: id,
        paymentMethod: 'card',
        amount: course.price,
      });

      if (response.data.success) {
        setShowPaymentDialog(false);
        navigate('/dashboard/student');
      }
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !course) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error">
          {error || 'Course not found'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        {/* Course Content */}
        <Grid item xs={12} lg={8}>
          <Card elevation={2}>
            <CardMedia
              component="img"
              height="400"
              image={course.thumbnail || 'https://via.placeholder.com/800x400'}
              alt={course.title}
            />
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box>
                  <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {course.title}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    by {course.instructor}
                  </Typography>
                </Box>
                <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                  ${course.price}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <Chip
                  label={course.category}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label={course.difficulty}
                  color={
                    course.difficulty === 'Beginner'
                      ? 'success'
                      : course.difficulty === 'Intermediate'
                      ? 'warning'
                      : 'error'
                  }
                />
                <Chip
                  icon={<TimeIcon />}
                  label={`${course.duration} hours`}
                  variant="outlined"
                />
                <Chip
                  icon={<PersonIcon />}
                  label={`${course.enrolledStudents || 0} students enrolled`}
                  variant="outlined"
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Course Description
              </Typography>
              <Typography variant="body1" paragraph>
                {course.description}
              </Typography>

              {course.curriculum && course.curriculum.length > 0 && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
                    What you'll learn
                  </Typography>
                  <List>
                    {course.curriculum.map((item, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon>
                          <CheckIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}

              {course.requirements && course.requirements.length > 0 && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
                    Requirements
                  </Typography>
                  <List>
                    {course.requirements.map((requirement, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon>
                          <SchoolIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={requirement} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Enrollment Card */}
        <Grid item xs={12} lg={4}>
          <Card elevation={3} sx={{ position: 'sticky', top: 20 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                ${course.price}
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<PaymentIcon />}
                  onClick={handleEnroll}
                  disabled={enrolling}
                  sx={{ py: 1.5, fontSize: '1.1rem', fontWeight: 'bold' }}
                >
                  {enrolling ? <CircularProgress size={24} /> : 'Enroll Now'}
                </Button>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  This course includes:
                </Typography>
                <List dense>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon>
                      <CheckIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Full lifetime access" />
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon>
                      <CheckIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Access on mobile and TV" />
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon>
                      <CheckIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Certificate of completion" />
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon>
                      <CheckIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="30-Day Money-Back Guarantee" />
                  </ListItem>
                </List>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Need help? Contact our support team
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onClose={() => setShowPaymentDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Complete Payment</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Please enter your payment details to enroll in "{course.title}"
          </Typography>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Card Number"
              value={paymentData.cardNumber}
              onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
              sx={{ mb: 2 }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Expiry Date"
                  placeholder="MM/YY"
                  value={paymentData.expiryDate}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, expiryDate: e.target.value }))}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="CVV"
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, cvv: e.target.value }))}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPaymentDialog(false)}>Cancel</Button>
          <Button
            onClick={handlePaymentSubmit}
            variant="contained"
            disabled={enrolling}
          >
            {enrolling ? <CircularProgress size={20} /> : `Pay $${course.price}`}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CourseDetail; 