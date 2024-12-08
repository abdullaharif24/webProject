export const fetchOrders = async () => {
    // Dummy data for orders, each with a product image URL
    return Promise.resolve([
      { 
        id: 1, 
        product: "Product A", 
        quantity: 2, 
        status: "Processing", 
        productImage: "https://example.com/images/product-a.jpg" 
      },
      { 
        id: 2, 
        product: "Product B", 
        quantity: 1, 
        status: "Shipped", 
        productImage: "https://example.com/images/product-b.jpg" 
      },
      { 
        id: 3, 
        product: "Product C", 
        quantity: 5, 
        status: "Delivered", 
        productImage: "https://example.com/images/product-c.jpg" 
      },
    ]);
  };
  
  export const updateOrderStatus = async (id, status) => {
    // Dummy order status update
    return Promise.resolve({ id, status });
  };
  