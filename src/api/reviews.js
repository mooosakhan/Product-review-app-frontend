import API from "./axiosInstance";

// POST   /api/products/:productId/reviews
export const addReview = (productId, data) =>
  API.post(`/products/${productId}/reviews`, data);

// PUT    /api/products/:productId/reviews/:reviewId
export const updateReview = (productId, reviewId, data) =>
  API.put(`/products/${productId}/reviews/${reviewId}`, data);

// DELETE /api/products/:productId/reviews/:reviewId
export const deleteReview = (productId, reviewId) =>
  API.delete(`/products/${productId}/reviews/${reviewId}`);
