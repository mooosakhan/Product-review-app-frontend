// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://product-review-app-backend-production.up.railway.app/api", // change this to your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically add token to request headers if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
