// src/api/products.js
import API from "./axiosInstance";

// Accept optional minRating and add as query param if present
export const getProducts = (minRating) => {
  const url = minRating ? `/products?minRating=${minRating}` : "/products";
  return API.get(url);
};

export const getProductById = (id) => API.get(`/products/${id}`);
