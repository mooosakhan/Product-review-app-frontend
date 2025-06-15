import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
// src/App.js
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
      <ToastContainer />
    </AuthProvider>
  );
}
