import axios from "axios";

const API_URL = "https://your-api-url.com";

// Register a new seller
export const registerSeller = (data) => {
  return axios.post(`${API_URL}/sellers/register`, data);
};

// Login function to authenticate users
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data; // Assuming the response contains user data and token
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Login failed. Please check your credentials.");
  }
};

// Fetch user profile (this can be used to get user details after login)
export const fetchUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null; // Return null in case of error
  }
};
