import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Button,
  Paper,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { fetchOrders, updateOrderStatus } from "../services/orderService";
import { blue, green, yellow, red, grey } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await fetchOrders();
      setOrders(data);
    };
    loadOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await updateOrderStatus(id, newStatus);
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenDetailsDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDetailsDialog(false);
  };

  const getStatusStyle = (status) => {
    if (status === "Processing") {
      return { backgroundColor: yellow[200], color: yellow[800] };
    } else if (status === "Shipped") {
      return { backgroundColor: blue[200], color: blue[800] };
    } else if (status === "Delivered") {
      return { backgroundColor: green[200], color: green[800] };
    }
    return {};
  };

  return (
    <Container sx={{ paddingY: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: blue[800] }}>
        Order Management
      </Typography>
      
      <Paper sx={{ padding: 3, boxShadow: 3, borderRadius: 3 }}>
        <Table sx={{ minWidth: 750 }}>
          <TableHead sx={{ backgroundColor: blue[500] }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Image</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Order ID</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Product</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Quantity</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                sx={{ 
                  "&:nth-of-type(odd)": { backgroundColor: grey[50] },
                  "&:hover": { backgroundColor: grey[200] },
                  transition: "background-color 0.3s ease-in-out",
                }}
              >
                <TableCell>
                  <img
                    src={order.productImage}
                    alt={order.product}
                    width={50}
                    height={50}
                    style={{ borderRadius: "8px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)" }}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: blue[800] }}>{order.id}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>
                  <Box sx={{
                    ...getStatusStyle(order.status),
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    display: "inline-block",
                  }}>
                    {order.status}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={2}>
                    <Button
                      variant="outlined"
                      color="info"
                      sx={{
                        textTransform: "none",
                        padding: "6px 16px",
                        "&:hover": { backgroundColor: blue[100] },
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </Button>
                    <Select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      sx={{
                        padding: "4px 8px",
                        backgroundColor: "white",
                        borderRadius: "4px",
                        "& .MuiSelect-icon": { color: blue[800] },
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <MenuItem value="Processing">Processing</MenuItem>
                      <MenuItem value="Shipped">Shipped</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* View Details Dialog */}
      <Dialog open={openDetailsDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", color: blue[800] }}>
          Order Details
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ padding: 4 }}>
          {selectedOrder && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Product: {selectedOrder.product}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Order ID: {selectedOrder.id}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Quantity: {selectedOrder.quantity}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Status: 
                <Box sx={{
                  ...getStatusStyle(selectedOrder.status),
                  display: "inline",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontWeight: "bold",
                }}>
                  {selectedOrder.status}
                </Box>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Product Image:
                <img src={selectedOrder.productImage} alt={selectedOrder.product} width={100} height={100} style={{ borderRadius: "8px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)" }} />
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ padding: "16px" }}>
          <Button onClick={handleCloseDialog} color="secondary" variant="contained" sx={{ textTransform: "none" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrderManagement;
