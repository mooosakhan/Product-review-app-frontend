"use client";

import StarRating from "./StarRating";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2, FiTrash2, FiThumbsUp, FiShare2 } from "react-icons/fi";

export default function ReviewList({
  reviews = [],
  currentUserId,
  onEdit,
  onDelete,
}) {
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (reviews.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h4 className="text-lg font-semibold text-gray-900 mb-2">
          No reviews yet
        </h4>
        <p className="text-gray-500 max-w-md mx-auto">
          Be the first to share your thoughts about this product!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Customer Reviews ({reviews.length})
        </h3>
        <div className="text-sm text-gray-500">Most recent first</div>
      </div>

      <AnimatePresence>
        {reviews.map((rev) => (
          <motion.div
            key={rev._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-sm transition-all relative group"
          >
            {/* User Info Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {getInitials(rev.user?.name)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {rev.user?.name || "Anonymous"}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {formatDate(rev.createdAt)}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              {currentUserId == rev.user._id && (
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(rev)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <FiEdit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(rev._id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>

            {/* Rating */}
            <div className="mb-3">
              <StarRating rating={rev.rating} readonly size="xs" />
            </div>

            {/* Review Comment */}
            {rev.comment && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <p className="text-gray-700 leading-relaxed">{rev.comment}</p>
              </div>
            )}

            {/* Helpful Actions */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                <FiThumbsUp className="w-4 h-4" />
                <span>Helpful</span>
              </button>
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                <FiShare2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}