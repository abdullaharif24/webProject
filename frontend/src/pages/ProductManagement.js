import React, { useEffect, useState } from "react";
import { fetchProducts, updateStock, addProduct, deleteProduct } from "../services/productService";
import { Button, Grid, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Card, CardContent, CardMedia } from "@mui/material";
import { Delete, Edit, Visibility, Add, Remove } from "@mui/icons-material";
import { blue, green, red, yellow, grey } from "@mui/material/colors";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    stock: 0,
    imageUrl: '',
    status: 'approved',
  });

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [openStockUpdateDialog, setOpenStockUpdateDialog] = useState(false);
  const [newStockValue, setNewStockValue] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      const productData = await fetchProducts();
      setProducts(productData);
    };
    loadProducts();
  }, []);

  const handleAddProduct = async () => {
    const addedProduct = await addProduct(newProduct);
    setProducts([...products, addedProduct]);
    setNewProduct({
      name: '',
      description: '',
      stock: 0,
      imageUrl: '',
      status: 'approved',
    });
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setOpenEditDialog(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentProduct({ ...currentProduct, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = async () => {
    const updatedProduct = { ...currentProduct };
    setProducts(products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)));
    setOpenEditDialog(false);
  };

  const handleViewProduct = (product) => {
    setCurrentProduct(product);
    setOpenViewDialog(true);
  };

  const handleStockChange = (change) => {
    if (currentProduct) {
      const newStock = currentProduct.stock + change;
      if (newStock >= 0) {
        setCurrentProduct({ ...currentProduct, stock: newStock });
      }
    }
  };

  const getStatusStyle = (status) => {
    if (status === "approved") {
      return { backgroundColor: green[200], color: green[800], padding: "4px 8px", borderRadius: "4px" };
    } else if (status === "rejected") {
      return { backgroundColor: red[200], color: red[800], padding: "4px 8px", borderRadius: "4px" };
    }
    return {};
  };

  const handleStockUpdate = async () => {
    const updatedProduct = await updateStock(currentProduct.id, newStockValue);
    setProducts(products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)));
    setOpenStockUpdateDialog(false);
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: grey[100], minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ marginBottom: 4, fontWeight: 'bold', color: blue[900] }}>Product Management</Typography>

      {/* Add New Product Form */}
      <Grid container spacing={2} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Stock"
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Image URL"
            name="imageUrl"
            value={newProduct.imageUrl}
            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={newProduct.status}
              onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            >
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleAddProduct} variant="contained" color="primary" fullWidth sx={{ padding: 2, borderRadius: 2 }}>
            Add Product
          </Button>
        </Grid>
      </Grid>

      {/* Product Table */}
      <TableContainer sx={{ boxShadow: 2, borderRadius: 2, backgroundColor: 'white' }}>
        <Table sx={{ minWidth: 650 }} aria-label="product table">
          <TableHead sx={{ backgroundColor: blue[500] }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Image</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Product Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Stock</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img src={product.imageUrl} alt={product.name} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%' }} />
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: blue[800] }}>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <span style={getStatusStyle(product.status)}>{product.status}</span>
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={2}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteProduct(product.id)}
                      startIcon={<Delete />}
                      sx={{
                        textTransform: 'none',
                        '&:hover': { backgroundColor: red[100] },
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditProduct(product)}
                      startIcon={<Edit />}
                      sx={{
                        textTransform: 'none',
                        '&:hover': { backgroundColor: blue[100] },
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="info"
                      onClick={() => handleViewProduct(product)}
                      startIcon={<Visibility />}
                      sx={{
                        textTransform: 'none',
                        '&:hover': { backgroundColor: blue[100] },
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => { setCurrentProduct(product); setOpenStockUpdateDialog(true); }}
                      startIcon={<Add />}
                      sx={{
                        textTransform: 'none',
                        '&:hover': { backgroundColor: yellow[100] },
                      }}
                    >
                      Update Stock
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Product Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} fullWidth>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          {currentProduct && (
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Product Name"
                name="name"
                value={currentProduct.name}
                onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                fullWidth
                sx={{ backgroundColor: 'white', borderRadius: 1 }}
              />
              <TextField
                label="Description"
                name="description"
                value={currentProduct.description}
                onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                fullWidth
                sx={{ backgroundColor: 'white', borderRadius: 1 }}
              />
              <TextField
                label="Stock"
                type="number"
                name="stock"
                value={currentProduct.stock}
                onChange={(e) => setCurrentProduct({ ...currentProduct, stock: e.target.value })}
                fullWidth
                sx={{ backgroundColor: 'white', borderRadius: 1 }}
              />
              <Box>
                <input
                  accept="image/*"
                  id="image-upload"
                  type="file"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="image-upload">
                  <Button variant="outlined" component="span" fullWidth sx={{ padding: 1.5, backgroundColor: blue[200], '&:hover': { backgroundColor: blue[300] } }}>
                    Upload Image
                  </Button>
                </label>
                {currentProduct.imageUrl && (
                  <CardMedia
                    component="img"
                    height="100"
                    image={currentProduct.imageUrl}
                    alt="Product Image"
                    sx={{ marginTop: 2, objectFit: 'contain' }}
                  />
                )}
              </Box>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={currentProduct.status}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, status: e.target.value })}
                  sx={{ backgroundColor: 'white', borderRadius: 1 }}
                >
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary" sx={{ fontWeight: 'bold' }}>
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary" sx={{ fontWeight: 'bold' }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Stock Update Dialog */}
      <Dialog open={openStockUpdateDialog} onClose={() => setOpenStockUpdateDialog(false)} fullWidth>
        <DialogTitle>Update Stock</DialogTitle>
        <DialogContent>
          <TextField
            label="New Stock Value"
            type="number"
            value={newStockValue}
            onChange={(e) => setNewStockValue(e.target.value)}
            fullWidth
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStockUpdateDialog(false)} color="secondary" sx={{ fontWeight: 'bold' }}>
            Cancel
          </Button>
          <Button onClick={handleStockUpdate} color="primary" sx={{ fontWeight: 'bold' }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductManagement;
