import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import {
  FiHome,
  FiHeart,
  FiUser,
  FiLogOut,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center"
        >
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className="mr-2">🛍</span>
            <span className="hidden sm:inline">WishlistApp</span>
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <motion.div whileHover={{ y: -2 }}>
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-blue-100 transition-colors"
            >
              <FiHome className="text-lg" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </motion.div>

          {user && (
            <motion.div whileHover={{ y: -2 }}>
              <Link
                to="/wishlist"
                className="flex items-center gap-1 hover:text-blue-100 transition-colors"
              >
                <FiHeart className="text-lg" />
                <span className="hidden sm:inline">Wishlist</span>
              </Link>
            </motion.div>
          )}

          {/* User Section */}
          {user ? (
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full"
              >
                <FiUser className="text-sm" />
                <span className="text-sm hidden md:inline">{user.name}</span>
              </motion.div>

              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full text-sm transition-colors"
              >
                <FiLogOut className="text-sm" />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <motion.div whileHover={{ y: -2 }}>
                <Link
                  to="/login"
                  className="flex items-center gap-1 hover:text-blue-100 transition-colors"
                >
                  <FiLogIn className="text-lg" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium hidden sm:flex items-center gap-1"
              >
                <Link to="/register" className="flex items-center gap-1">
                  <FiUserPlus className="text-sm" />
                  <span>Register</span>
                </Link>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
