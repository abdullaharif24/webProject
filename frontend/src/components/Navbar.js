import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ onMenuClick, isLoggedIn, userProfile, onLogout }) => {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        {/* Menu button, only visible if the user is logged in */}
        {isLoggedIn && (
          <IconButton color="inherit" edge="start" onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
        )}

        {/* Platform name */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Shopease Platform
        </Typography>

        {/* User profile or login prompt */}
        {isLoggedIn ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Typography variant="subtitle1">{userProfile?.name}</Typography>
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Typography variant="subtitle1">Please login</Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
    