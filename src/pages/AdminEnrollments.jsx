// src/pages/AdminEnrollments.jsx
import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Card, CardContent, CircularProgress, Alert } from "@mui/material";
import api from "../services/api";

const AdminEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await api.get("/api/admin/enrollments");
        setEnrollments(res.data);
        setErr("");
      } catch (e) {
        console.error(e);
        setErr("Failed to load enrollments");
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  if (loading) return <Box display="flex" justifyContent="center" mt={6}><CircularProgress /></Box>;
  if (err) return <Container sx={{ mt: 4 }}><Alert severity="error">{err}</Alert></Container>;

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>Enrollments</Typography>
      <Grid container spacing={3}>
        {enrollments.map((en) => (
          <Grid item xs={12} md={6} key={en.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Enrollment #{en.id}</Typography>
                <Typography variant="body2">Course ID: {en.courseId || "—"}</Typography>
                <Typography variant="body2">User ID: {en.userId || "—"}</Typography>
                <Typography variant="body2">Amount: {en.amount}</Typography>
                <Typography variant="body2">Payment ID: {en.paymentId}</Typography>
                <Typography variant="body2">Status: {en.status}</Typography>
                <Typography variant="caption">Created: {new Date(en.createdAt).toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminEnrollments;
