import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import QuickViewModal from './QuickViewModal';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [showQuickView, setShowQuickView] = useState(false);

  if (!product || !product._id) return null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const productName = product.name || 'Unnamed Product';
  const productPrice = product.price || 0;
  const productImages = product.images || [];
  const firstImage = productImages[0];
  const directImage = typeof product.image === 'string' ? product.image : product.image?.url;
  const productImage = (typeof firstImage === 'string' ? firstImage : firstImage?.url) || directImage || '/api/placeholder/300/300';
  const productCategory = product.category || 'General';
  const productStock = product.stock || 0;
  const productRating = product.rating || 0;
  const productReviewCount = product.reviewCount || 0;
  const hasDiscount = product.originalPrice && product.originalPrice > productPrice;
  const discountPercent = hasDiscount ? Math.round(((product.originalPrice - productPrice) / product.originalPrice) * 100) : 0;

  return (
    <>
      <div className="card group p-0 overflow-hidden">
        {/* Image */}
        <div className="relative overflow-hidden">
          <Link to={`/product/${product._id}`}>
            <img
              src={productImage}
              alt={productName}
              className="w-full h-56 sm:h-64 object-cover"
            />
          </Link>

          {/* Discount */}
          {hasDiscount && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
              -{discountPercent}%
            </span>
          )}

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => { e.preventDefault(); setShowQuickView(true); }}
              className="p-2 bg-white rounded-lg shadow-sm text-gray-500 hover:text-maroon transition-colors"
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              className="p-2 bg-white rounded-lg shadow-sm text-gray-500 hover:text-red-500 transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <span className="text-xs font-medium text-maroon bg-pink-50 px-2.5 py-1 rounded-md">
            {productCategory}
          </span>

          <h3 className="mt-2.5 text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
            <Link to={`/product/${product._id}`} className="hover:text-maroon transition-colors">
              {productName}
            </Link>
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < Math.floor(productRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">({productReviewCount})</span>
          </div>

          {/* Price + Cart */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-maroon">৳{productPrice.toLocaleString()}</span>
              {hasDiscount && (
                <span className="text-xs text-gray-400 line-through">৳{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={productStock === 0}
              className="p-2 bg-maroon text-white rounded-lg hover:bg-maroon-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {showQuickView && (
        <QuickViewModal product={product} onClose={() => setShowQuickView(false)} />
      )}
    </>
  );
};

export default ProductCard;
