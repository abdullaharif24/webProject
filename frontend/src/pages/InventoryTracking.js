import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  LinearProgress,
  Button,
  Paper,
  Box,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { fetchProducts, updateStock } from "../services/productService";
import { blue, red, green, yellow, grey } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";

const InventoryTracking = () => {
  const [products, setProducts] = useState([]);
  const [openRestockDialog, setOpenRestockDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [restockQuantity, setRestockQuantity] = useState(0);
  
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const handleRestock = async () => {
    if (restockQuantity <= 0) return; // Prevent restocking with invalid value

    // Ensure that the restock doesn't exceed the maximum stock
    const newStock = Math.min(
      selectedProduct.stock + restockQuantity,
      selectedProduct.maxStock
    );

    const updatedProduct = await updateStock(selectedProduct.id, newStock);
    setProducts((prev) =>
      prev.map((product) => 
        product.id === selectedProduct.id ? updatedProduct : product
      )
    );
    setOpenRestockDialog(false); // Close dialog after updating stock
  };

  const getStockLevelStyle = (stock, maxStock) => {
    const stockPercentage = (stock / maxStock) * 100;
    if (stockPercentage <= 20) {
      return { color: red[500], backgroundColor: red[100] };
    } else if (stockPercentage <= 50) {
      return { color: yellow[800], backgroundColor: yellow[200] };
    } else if (stockPercentage <= 80) {
      return { color: blue[800], backgroundColor: blue[100] };
    } else {
      return { color: green[500], backgroundColor: green[100] };
    }
  };

  return (
    <Container sx={{ paddingY: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: blue[800], textAlign: "center" }}>
        Inventory Tracking
      </Typography>

      <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 3, marginBottom: 4 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: blue[500] }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Product Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Stock Level</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Restock</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                  "&:hover": { backgroundColor: "#eaeaea" },
                }}
              >
                <TableCell sx={{ fontWeight: "bold", color: blue[800] }}>{product.name}</TableCell>

                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={(product.stock / product.maxStock) * 100}
                      sx={{
                        width: "100%",
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "#e0e0e0",
                      }}
                    />
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: getStockLevelStyle(product.stock, product.maxStock).color,
                      }}
                    >
                      {product.stock} / {product.maxStock}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell>
                  <Tooltip
                    title={`Restock to ${product.maxStock - product.stock} units`}
                    arrow
                  >
                    <span>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          setSelectedProduct(product);
                          setRestockQuantity(0); // Reset the counter when opening the dialog
                          setOpenRestockDialog(true);
                        }}
                        disabled={product.stock === product.maxStock}
                        sx={{
                          width: "120px",
                          textTransform: "none",
                          borderRadius: 3,
                          "&:hover": { backgroundColor: green[600] },
                        }}
                      >
                        Restock
                      </Button>
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Restock Counter Dialog */}
      <Dialog
        open={openRestockDialog}
        onClose={() => setOpenRestockDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">Update Stock</Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setOpenRestockDialog(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="body1" gutterBottom>
                Product: <strong>{selectedProduct.name}</strong>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Current Stock: {selectedProduct.stock} / {selectedProduct.maxStock}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Restock Quantity:
                <TextField
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={restockQuantity}
                  onChange={(e) => setRestockQuantity(Number(e.target.value))}
                  sx={{ marginTop: 2 }}
                  inputProps={{ min: 1 }}
                />
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRestockDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleRestock}
            color="primary"
            disabled={restockQuantity <= 0}
          >
            Restock
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InventoryTracking;
