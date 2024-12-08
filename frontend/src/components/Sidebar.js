import React from "react";
import { List, ListItem, ListItemText, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = ({ open, onClose }) => {
  return (
    <>
      {/* Overlay Backdrop */}
      {open && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: open ? 0 : "-250px", // slide in and out effect
          width: "250px",
          backgroundColor: "#1e1e1e",
          height: "100vh",
          transition: "left 0.3s ease", // smooth sliding transition
          zIndex: 2,
          color: "#fff",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#333",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Shopease Dashboard
        </Typography>
        <List>
          <ListItem button component={Link} to="/profilepage" onClick={onClose}>
            <ListItemText
              primary="Profile"
              sx={{ color: "#fff", "&:hover": { color: "#4caf50" } }}
            />
          </ListItem>
          <ListItem button component={Link} to="/products" onClick={onClose}>
            <ListItemText
              primary="Product Management"
              sx={{ color: "#fff", "&:hover": { color: "#4caf50" } }}
            />
          </ListItem>
          <ListItem button component={Link} to="/orders" onClick={onClose}>
            <ListItemText
              primary="Order Management"
              sx={{ color: "#fff", "&:hover": { color: "#4caf50" } }}
            />
          </ListItem>
          <ListItem button component={Link} to="/inventory" onClick={onClose}>
            <ListItemText
              primary="Inventory Tracking"
              sx={{ color: "#fff", "&:hover": { color: "#4caf50" } }}
            />
          </ListItem>
          <ListItem button component={Link} to="/analytics" onClick={onClose}>
            <ListItemText
              primary="Sales Analytics"
              sx={{ color: "#fff", "&:hover": { color: "#4caf50" } }}
            />
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default Sidebar;
