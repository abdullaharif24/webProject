export const fetchSalesData = async () => {
    // Dummy sales data for analytics
    return Promise.resolve([
      { month: "January", sales: 200 },
      { month: "February", sales: 150 },
      { month: "March", sales: 300 },
      { month: "April", sales: 250 },
    ]);
  };
  