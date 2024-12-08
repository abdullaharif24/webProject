import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerified, setIsVerified] = useState(localStorage.getItem("isVerified") === "true");
  const navigate = useNavigate();

  // Handle the signup process
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Sending the data to the backend API
      const response = await fetch("http://localhost:5000/seller/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsVerificationSent(true);
        setError(null);
        localStorage.setItem("user", email);
        localStorage.setItem("isVerified", "false");
        alert("Verification email has been sent. Please check your inbox.");
      } else {
        setError(data.message || "Failed to register. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  // Handle email verification process
  const handleVerifyEmail = () => {
    localStorage.setItem("isVerified", "true");
    setIsVerified(true);
    alert("Email verified successfully!");
    navigate("/");
  };

  if (isVerified) {
    navigate("/");
    return null;
  }

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
      <Card elevation={3} style={{ maxWidth: 400, padding: "20px" }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Create Your Account
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
            Start your journey with Shopease today!
          </Typography>
          {error && (
            <Typography color="error" align="center" gutterBottom>
              {error}
            </Typography>
          )}
          {!isVerificationSent ? (
            <>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSignup}
                style={{ marginTop: "16px" }}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6" align="center" color="textSecondary" gutterBottom>
                A verification email has been sent to {email}. Please check your inbox and verify your email.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleVerifyEmail}
                style={{ marginTop: "16px" }}
              >
                Verify Email
              </Button>
            </>
          )}
          <Button
            variant="text"
            color="secondary"
            fullWidth
            onClick={() => navigate("/")}
            style={{ marginTop: "8px" }}
          >
            Already have an account? Login
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Signup;
