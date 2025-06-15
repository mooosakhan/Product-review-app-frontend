import { Link } from "react-router-dom";
import { addToWishlist, removeFromWishlist } from "../api/wishlist";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import StarRating from "./StarRating";

export default function ProductCard({ product, onRemove, place }) {
  const isInWishlist = !!onRemove;

  const handleWishlist = async (e) => {
    e.preventDefault();
    try {
      if (isInWishlist) {
        await removeFromWishlist(product._id);
        onRemove();
        toast.success("Removed from wishlist!");
      } else {
        await addToWishlist(product._id);
        toast.success("Added to wishlist!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
            {product.name}
          </h3>
          <motion.button
            onClick={handleWishlist}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full cursor-pointer ${
              isInWishlist ? "text-red-500" : "text-gray-300 hover:text-red-400"
            }`}
            aria-label={
              isInWishlist ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill={isInWishlist ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={isInWishlist ? 0 : 2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </motion.button>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>

        {place !== "wishlist" && (
          <div className="flex items-center mb-4">
            <StarRating
              rating={product.averageRating || 0}
              readonly
              size="sm"
            />
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <Link
            to={`/products/${product._id}`}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            View Details
          </Link>
          {product.price && (
            <span className="font-bold text-gray-800">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
