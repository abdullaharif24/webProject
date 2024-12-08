import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Button, Divider, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // User state will hold the fetched profile data
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [error, setError] = useState(null); // Error state for handling fetch errors

  useEffect(() => {
    const email = localStorage.getItem("user"); // Retrieve email from local storage
    if (!email) {
      navigate("/"); // Redirect to login if no user is logged in
      return;
    }

    // Fetch user profile from the backend
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/seller/users/${email}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required for authentication
          },
        });
        setUser(response.data); // Set user data with API response
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to fetch user profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/"); // Redirect to login page
  };

  if (loading) {
    return (
      <Grid container justifyContent="center" style={{ minHeight: "100vh", padding: "20px" }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container justifyContent="center" style={{ minHeight: "100vh", padding: "20px" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid container justifyContent="center" style={{ minHeight: "100vh", padding: "20px" }}>
      <Grid item xs={12} sm={8} md={6}>
        <Card elevation={5}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              User Profile
            </Typography>
            <Divider />
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
              <Grid item xs={12}>
                <Typography variant="h6">Name</Typography>
                <Typography variant="body1">{user.name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Email</Typography>
                <Typography variant="body1">{user.email}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Phone</Typography>
                <Typography variant="body1">{user.phone || "N/A"}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Address</Typography>
                <Typography variant="body1">{user.address || "N/A"}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Seller Status</Typography>
                <Typography variant="body1" color="primary">
                  {user.isSeller ? "Registered as a Seller" : "Not Registered as a Seller"}
                </Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent="center" style={{ marginTop: "30px" }}>
              <Button variant="contained" color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
