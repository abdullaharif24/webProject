import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Create the payload
    const payload = {
      email: email,
      password: password,
    };

    try {
      // Send the login request to the API endpoint
      const response = await fetch("http://localhost:5000/seller/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Convert the payload to JSON
      });

      if (!response.ok) {
        // If the response is not okay (e.g., invalid credentials), throw an error
        throw new Error("Invalid email or password.");
      }

      // Parse the response if login is successful
      const data = await response.json();
      
      if (data.token) {
        // Store the token in localStorage for future authenticated requests
        localStorage.setItem("authToken", data.token);

        // Optionally, set the token in the header for future requests
        // Example: You can attach this token to your API headers if needed.

        // You might want to fetch the user profile or set some global state
        const userProfile = {
          token: data.token,
        };

        onLogin(userProfile); // Pass the token or user profile to the parent component
        navigate("/profilepage"); // Redirect to profile page
      } else {
        setError("Login failed. No token received.");
      }
    } catch (err) {
      setError(err.message); // Set the error message if any
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh", backgroundColor: "#f7f7f7" }}
    >
      <Box
        sx={{
          padding: "32px",
          borderRadius: "8px",
          backgroundColor: "white",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
          Welcome Back
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center" color="textSecondary">
          Login to your account
        </Typography>

        {error && (
          <Typography color="error" sx={{ textAlign: "center", marginBottom: "16px" }}>
            {error}
          </Typography>
        )}

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: "16px" }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: "16px" }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{
            padding: "10px",
            fontWeight: "bold",
            textTransform: "none",
            marginBottom: "16px",
          }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={handleSignupRedirect}
          sx={{
            padding: "10px",
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          Don't have an account? Sign Up
        </Button>
      </Box>
    </Grid>
  );
};

export default Login;
