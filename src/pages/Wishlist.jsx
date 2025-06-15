import { useEffect, useState } from 'react';
import { getWishlist, removeFromWishlist } from '../api/wishlist';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    getWishlist()
      .then((res) => setWishlist(res.data))
      .catch((err) => console.error('Wishlist fetch failed:', err));
  }, []);

  const handleRemove = async (productId) => {
    await removeFromWishlist(productId);
    setWishlist(wishlist.filter((p) => p._id !== productId));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">❤️ Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product._id} product={product} onRemove={() => handleRemove(product._id)} place="wishlist"/>
          ))}
        </div>
      )}
    </div>
  );
}
