import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Grid, CssBaseline } from "@mui/material";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import ProductManagement from "./pages/ProductManagement";
import OrderManagement from "./pages/OrderManagement";
import InventoryTracking from "./pages/InventoryTracking";
import SalesAnalytics from "./pages/SalesAnalytics";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";

import { AppProvider } from "./context/AppContext";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks user authentication
  const [sidebarOpen, setSidebarOpen] = useState(false); // Tracks sidebar visibility
  const [userProfile, setUserProfile] = useState(null); // Stores the logged-in user's profile

  // Toggle sidebar visibility
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle user login
  const handleLogin = (profile) => {
    setIsLoggedIn(true);
    setUserProfile(profile); // Save the logged-in user's profile
  };

  // Handle user logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    setSidebarOpen(false);
  };

  return (
    <AppProvider>
      <Router>
        <CssBaseline />
        {/* Navbar */}
        <Navbar
          onMenuClick={handleSidebarToggle}
          isLoggedIn={isLoggedIn}
          userProfile={userProfile}
          onLogout={handleLogout}
        />

        <Grid container>
          {/* Sidebar only visible when logged in */}
          {isLoggedIn && (
            <Grid item xs={2}>
              <Sidebar open={sidebarOpen} onClose={handleSidebarToggle} />
            </Grid>
          )}

          {/* Main content area */}
          <Grid item xs={isLoggedIn ? 10 : 12} style={{ padding: "20px" }}>
            <Routes>
              <Route path="/" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profilepage" element={<ProfilePage />} />
              <Route path="/products" element={<ProductManagement />} />
              <Route path="/orders" element={<OrderManagement />} />
              <Route path="/inventory" element={<InventoryTracking />} />
              <Route path="/analytics" element={<SalesAnalytics />} />
            </Routes>
          </Grid>
        </Grid>
      </Router>
    </AppProvider>
  );
};

export default App;
