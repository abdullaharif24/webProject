export const fetchProducts = async () => {
    // Dummy data for products
    return Promise.resolve([
      { id: 1, name: "Product A", description: "Description for Product A", stock: 20, maxStock: 50, imageUrl: "https://via.placeholder.com/150", status: "approved" },
      { id: 2, name: "Product B", description: "Description for Product B", stock: 10, maxStock: 30, imageUrl: "https://via.placeholder.com/150", status: "approved" },
      { id: 3, name: "Product C", description: "Description for Product C", stock: 5, maxStock: 20, imageUrl: "https://via.placeholder.com/150", status: "rejected" },
    ]);
  };
  
  export const updateStock = async (id, newStock) => {
    // Dummy data update
    return Promise.resolve({
      id,
      name: `Product ${id}`,
      description: `Description for Product ${id}`,
      stock: newStock,
      maxStock: 50,
      imageUrl: "https://via.placeholder.com/150",
      status: "approved",
    });
  };
  
  export const addProduct = async (product) => {
    // Dummy add product
    return Promise.resolve({
      id: Date.now(), // Using current timestamp as a fake product ID
      ...product,
    });
  };
  
  export const deleteProduct = async (id) => {
    // Dummy delete product
    return Promise.resolve(true);
  };
  