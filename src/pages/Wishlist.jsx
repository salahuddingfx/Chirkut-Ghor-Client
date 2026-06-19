import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { Heart, ShoppingCart, Trash2, Package, Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState([
    {
      _id: '11',
      name: 'Love Combo - Chirkut Special',
      price: 2500,
      originalPrice: 3000,
      images: ['https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=500'],
      category: 'Love Combo',
      rating: 5.0,
      inStock: true
    },
    {
      _id: '14',
      name: 'Anniversary Surprise Box',
      price: 5500,
      originalPrice: 6500,
      images: ['https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500'],
      category: 'Anniversary Combo',
      rating: 5.0,
      inStock: true
    },
    {
      _id: '5',
      name: 'Ladies Elegant Watch',
      price: 4500,
      originalPrice: 6000,
      images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500'],
      category: 'Watches',
      rating: 4.7,
      inStock: true
    }
  ]);

  const removeFromWishlist = (itemId) => {
    setWishlistItems(wishlistItems.filter(item => item._id !== itemId));
    toast.success('Removed from wishlist');
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success('Added to cart!');
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-pink-50">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-maroon/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Heart className="h-8 w-8 text-maroon" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h2>
          <p className="text-sm text-gray-500 mb-6">Start adding your favorite gift items to your wishlist</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-maroon text-white rounded-xl px-6 py-3 text-sm font-semibold"
          >
            <Package className="h-4 w-4" />
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 py-8 px-4">
      <Breadcrumb items={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Wishlist' }]} />
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">My Wishlist</h1>
          <p className="text-sm text-gray-600">Save your favorite gift items for later</p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {wishlistItems.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {/* Image */}
              <div className="relative">
                <Link to={`/product/${item._id}`}>
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-52 object-cover"
                  />
                </Link>
                {item.originalPrice > item.price && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white px-2.5 py-1 rounded-lg text-xs font-semibold">
                    {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <Link to={`/product/${item._id}`}>
                  <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 hover:text-maroon transition-colors">
                    {item.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-gray-100 text-gray-700 rounded-lg px-2.5 py-1 text-xs font-medium">
                    {item.category}
                  </span>
                  {item.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-yellow-500 fill-current" />
                      <span className="text-xs font-medium text-gray-700">{item.rating}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-lg font-bold text-gray-900">৳{item.price.toLocaleString()}</span>
                  {item.originalPrice > item.price && (
                    <span className="text-sm text-gray-400 line-through">৳{item.originalPrice.toLocaleString()}</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.inStock}
                    className="flex-1 bg-maroon text-white rounded-xl py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <p className="text-2xl font-bold text-gray-900">{wishlistItems.length}</p>
          <p className="text-sm text-gray-500">items in your wishlist</p>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
