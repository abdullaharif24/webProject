import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { fetchSalesData } from "../services/analyticsService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { blue, green, purple } from "@mui/material/colors";

const SalesAnalytics = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const loadSalesData = async () => {
      const data = await fetchSalesData();
      setSalesData(data);
    };

    loadSalesData();
  }, []);

  return (
    <Container sx={{ paddingY: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: blue[800] }}>
        Sales Analytics
      </Typography>
      <Paper sx={{ padding: 3, borderRadius: 3, boxShadow: 3 }}>
        <Card sx={{ borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: purple[700], marginBottom: 2 }}>
              Product Performance and Sales Trends
            </Typography>
            <Box sx={{ width: "100%", height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" stroke={blue[800]} />
                  <YAxis stroke={blue[800]} />
                  <Tooltip contentStyle={{ backgroundColor: "#fff", borderColor: blue[800] }} />
                  <Legend wrapperStyle={{ paddingTop: 10 }} />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke={purple[500]}
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
};

export default SalesAnalytics;
