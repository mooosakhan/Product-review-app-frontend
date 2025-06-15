import API from "./axiosInstance";

export const getWishlist = () => API.get("/wishlist");
export const addToWishlist = (productId) => API.post(`/wishlist/${productId}`);
export const removeFromWishlist = (productId) =>
  API.delete(`/wishlist/${productId}`);
