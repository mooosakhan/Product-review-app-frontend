// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import { FiFilter, FiShoppingCart } from "react-icons/fi";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async (rating = 0) => {
    try {
      setIsLoading(true);
      const res = await getProducts(rating);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(minRating);
  }, [minRating]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FiShoppingCart className="mr-2" />
            Our Products
          </h1>
          <p className="text-gray-600">Browse our high-quality selection</p>
        </div>

        {/* Rating Filter */}
        <div className="w-full md:w-auto">
          <div className="relative">
            <label className="sr-only">Filter by Rating</label>
            <div className="flex items-center">
              <FiFilter className="text-gray-500 mr-2" />
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={0}>All Ratings</option>
                <option value={1}>⭐ 1+</option>
                <option value={2}>⭐⭐ 2+</option>
                <option value={3}>⭐⭐⭐ 3+</option>
                <option value={4}>⭐⭐⭐⭐ 4+</option>
                <option value={5}>⭐⭐⭐⭐⭐ 5</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="flex mt-3">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Products Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">Try adjusting your rating filter</p>
              <button
                onClick={() => setMinRating(0)}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
