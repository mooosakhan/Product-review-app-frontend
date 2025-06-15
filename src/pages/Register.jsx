import { useState } from 'react';
import { registerUser } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { showSuccess, showError } from '../utils/toastConfig';

export default function Register() {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '' 
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsLoading(true);
    try {
      const res = await registerUser(form);
      showSuccess('Registration successful! Logging you in...');
      login(res.data.name, res.data.token);
      navigate('/');
    } catch (err) {
      showError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h2 className="text-2xl font-bold text-center">Create Account</h2>
          <p className="text-center text-blue-100 mt-1">
            Join our community today
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <div className={`flex items-center border rounded-lg px-3 py-2 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}>
              <FiUser className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="John Doe"
                className="w-full outline-none"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <div className={`flex items-center border rounded-lg px-3 py-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}>
              <FiMail className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full outline-none"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <div className={`flex items-center border rounded-lg px-3 py-2 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}>
              <FiLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full outline-none"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-white font-medium transition-colors
              ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isLoading ? (
              <span className="animate-spin mr-2">↻</span>
            ) : (
              <>
                <span>Register</span>
                <FiArrowRight className="ml-2" />
              </>
            )}
          </button>

          <div className="text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}