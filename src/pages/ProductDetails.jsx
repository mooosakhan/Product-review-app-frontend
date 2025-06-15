// src/pages/ProductDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserIdFromToken } from "../utils/jwt";
import { getProductById } from "../api/products";
import { addReview, updateReview, deleteReview } from "../api/reviews";
import StarRating from "../components/StarRating";
import ReviewList from "../components/ReviewList";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id: productId } = useParams();
  const currentUserId = getUserIdFromToken();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // form state
  const [form, setForm] = useState({ rating: 5, comment: "" });
  const [showForm, setShowForm] = useState(false);
  const [myReviewId, setMyReviewId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Fetch product & detect if this user already reviewed
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getProductById(productId);
        setProduct(res.data);

        const myRev = res.data.reviews.find(
          (r) => r.user._id === currentUserId
        );
        setMyReviewId(myRev ? myRev._id : null);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product details");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [productId, currentUserId]);

  const handleAddClick = () => {
    if (!currentUserId) {
      toast.info("Please log in to add a review");
      return;
    }
    if (myReviewId) {
      toast.info("You already added a review for this product");
      return;
    }
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateReview(productId, editingId, form);
        toast.success("Review updated successfully!");
      } else {
        await addReview(productId, form);
        toast.success("Review added successfully!");
      }
      setForm({ rating: 5, comment: "" });
      setShowForm(false);
      setEditingId(null);

      // re-fetch
      const res = await getProductById(productId);
      setProduct(res.data);
      const myRev = res.data.reviews.find((r) => r.user._id === currentUserId);
      setMyReviewId(myRev ? myRev._id : null);
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error("You can only modify your own review");
      } else {
        toast.error("Could not submit review");
      }
    }
  };

  const handleEdit = (rev) => {
    if (rev.user._id !== currentUserId) {
      toast.error("You can only edit your own review");
      return;
    }
    setForm({ rating: rev.rating, comment: rev.comment });
    setEditingId(rev._id);
    setShowForm(true);
  };

  const handleDelete = async (revId, revUserId) => {
    if (revUserId !== currentUserId) {
      toast.error("You can only delete your own review");
      return;
    }
    if (!window.confirm("Are you sure you want to delete your review?")) return;
    try {
      await deleteReview(productId, revId);
      toast.success("Review deleted successfully");
      if (editingId === revId) {
        setForm({ rating: 5, comment: "" });
        setEditingId(null);
        setShowForm(false);
      }
      // re-fetch
      const res = await getProductById(productId);
      setProduct(res.data);
      const myRev = res.data.reviews.find((r) => r.user._id === currentUserId);
      setMyReviewId(myRev ? myRev._id : null);
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error("You can only delete your own review");
      } else {
        toast.error("Could not delete review");
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (!product)
    return <p className="p-6 text-center text-gray-500">Product not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Product Header */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          <p className="mt-4 text-gray-600">{product.description}</p>

          <div className="mt-4 flex items-center">
            <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
              <span className="text-yellow-400 text-lg mr-1">⭐</span>
              <span className="font-semibold text-blue-800">
                {product.averageRating?.toFixed(1) || "0.0"}
              </span>
              <span className="text-gray-500 text-sm ml-1">
                ({product.reviews.length} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Customer Reviews
            </h3>

            {currentUserId && (
              <button
                onClick={handleAddClick}
                className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
              >
                <span>✍️</span>
                <span>Add Review</span>
              </button>
            )}
          </div>

          {/* Review Form */}
          {currentUserId && showForm && (
            <form
              onSubmit={handleSubmit}
              className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {editingId ? "✏️ Edit Your Review" : "📝 Write a Review"}
              </h3>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Your Rating</label>
                <StarRating
                  rating={form.rating}
                  onRate={(r) => setForm((f) => ({ ...f, rating: r }))}
                  interactive={true}
                  starSize="text-2xl"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="comment" className="block text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  id="comment"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  rows="4"
                  placeholder="Share your thoughts about this product..."
                  value={form.comment}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, comment: e.target.value }))
                  }
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-colors flex-1"
                >
                  {editingId ? "Update Review" : "Submit Review"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setForm({ rating: 5, comment: "" });
                  }}
                  className="px-5 py-2 border border-gray-300 hover:bg-gray-100 rounded-lg transition-colors flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <ReviewList
            reviews={product.reviews}
            currentUserId={currentUserId}
            onEdit={handleEdit}
            onDelete={(revId) => {
              const revUserId = product.reviews.find((r) => r._id === revId)
                ?.user._id;
              handleDelete(revId, revUserId);
            }}
          />
        </div>
      </div>
    </div>
  );
}
