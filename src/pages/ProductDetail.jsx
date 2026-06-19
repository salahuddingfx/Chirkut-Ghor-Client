import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, ShoppingCart, Heart, Minus, Plus, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight, Package, Check, XCircle, AlertTriangle, Building2, Mountain, CheckCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { addToRecentlyViewed } from '../utils/productUtils';
import toast from 'react-hot-toast';
import Breadcrumb from '../components/Breadcrumb';
import Seo from '../components/Seo';
import ReviewForm from '../components/ReviewForm';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [canReview, setCanReview] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [deliverySettings, setDeliverySettings] = useState({
    chittagongFee: 60,
    outsideChittagongFee: 130,
  });
  const { addToCart } = useCart();
  const baseUrl = (import.meta?.env?.VITE_SITE_URL || 'http://localhost:5173').replace(/\/+$/, '');

  const buildDescription = (text) => {
    if (!text) return '';
    const normalized = text.replace(/\s+/g, ' ').trim();
    if (normalized.length <= 160) return normalized;
    return `${normalized.slice(0, 157)}...`;
  };

  const fetchProduct = useCallback(async () => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
    } catch {
      const mockProducts = {
        '1': {
          _id: '1',
          name: 'Handwoven Silk Scarf',
          description: 'Beautiful handwoven silk scarf with traditional patterns. Made from the finest silk threads and handwoven by skilled artisans using age-old techniques.',
          price: 2250,
          originalPrice: 2500,
          images: [{ url: '/api/placeholder/400/400' }, { url: '/api/placeholder/400/400' }, { url: '/api/placeholder/400/400' }],
          stock: 15,
          category: 'clothing',
          rating: 4.5,
          reviewCount: 23
        },
        '2': {
          _id: '2',
          name: 'Bamboo Basket Set',
          description: 'Set of 3 handcrafted bamboo baskets for storage. Perfect for organizing your home and adding a natural touch to your decor.',
          price: 1800,
          originalPrice: 1800,
          images: [{ url: '/api/placeholder/400/400' }, { url: '/api/placeholder/400/400' }],
          stock: 8,
          category: 'home',
          rating: 4.2,
          reviewCount: 15
        }
      };
      setProduct(mockProducts[id] || mockProducts['1']);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchReviews = useCallback(async () => {
    try {
      setLoadingReviews(true);
      const response = await axios.get(`/api/products/${id}/reviews`);
      setReviews(response.data || []);
    } catch {
      setReviews([]);
    } finally {
      setLoadingReviews(false);
    }
  }, [id]);

  const checkCanReview = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const response = await axios.get(`/api/products/${id}/can-review`, config);
      setCanReview(response.data.canReview);
    } catch {
      setCanReview(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
    checkCanReview();
  }, [fetchProduct, fetchReviews, checkCanReview]);

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    toast.success('Redirecting to checkout...');
    navigate('/checkout');
  };

  const addToWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const getImageUrl = (image) => {
    if (!image) return '';
    if (typeof image === 'string') return image;
    return image.url || image.secure_url || '';
  };

  const pagePath = `/product/${id}`;
  const pageTitle = product ? `${product.name} | Chirkut Ghor` : 'Product Details | Chirkut Ghor';
  const pageDescription = product?.description
    ? buildDescription(product.description)
    : 'View product details, pricing, and delivery options from Chirkut Ghor.';
  const pageImage = product
    ? getImageUrl(product.images?.[0]) || getImageUrl(product.image)
    : '';
  const productSchema = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: pageDescription,
        image: pageImage ? [pageImage] : undefined,
        sku: product._id,
        brand: { '@type': 'Brand', name: 'Chirkut Ghor' },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'BDT',
          price: String(product.price),
          availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          url: `${baseUrl}${pagePath}`,
        },
      }
    : null;

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % (product?.images?.length || 1));
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + (product?.images?.length || 1)) % (product?.images?.length || 1));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <Seo
          title="Product Details | Chirkut Ghor"
          description="View product details, pricing, and delivery options from Chirkut Ghor."
          path={pagePath}
        />
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-gray-200 border-t-maroon rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <Seo
          title="Product Not Found | Chirkut Ghor"
          description="The product you are looking for is unavailable."
          path={pagePath}
          noIndex
        />
        <div className="text-center px-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-500 mb-4">The product you're looking for doesn't exist.</p>
          <Link to="/shop" className="text-maroon font-semibold text-sm hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const categoryLabel = product?.category ? product.category.toString() : '';

  return (
    <div className="min-h-screen bg-pink-50">
      <Breadcrumb items={[{ label: 'Shop', to: '/shop' }, { label: 'Product' }]} />
      <Seo
        title={pageTitle}
        description={pageDescription}
        path={pagePath}
        image={pageImage}
        schema={productSchema}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

          {/* Product Images */}
          <div className="space-y-3">
            {/* Main Image */}
            <div className="bg-white rounded-2xl overflow-hidden relative">
              <div className="aspect-square w-full p-4">
                <img
                  src={
                    getImageUrl(product.images?.[selectedImage]) ||
                    getImageUrl(product.image) ||
                    '/api/placeholder/600/600'
                  }
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              {product.images?.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 border border-gray-200 text-gray-600"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 border border-gray-200 text-gray-600"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="absolute top-4 left-4">
                  <span className="bg-maroon text-white px-3 py-1 rounded-lg text-xs font-semibold">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-maroon'
                        : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={getImageUrl(image) || '/api/placeholder/120/120'}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            {/* Basic Info */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100">
              {categoryLabel && (
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2 block capitalize">
                  {categoryLabel}
                </span>
              )}

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < Math.floor(product.rating || 0) ? 'bg-yellow-400' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating?.toFixed(1) || '0.0'} ({product.reviewCount || 0} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <span className="text-2xl font-bold text-maroon">৳{product.price}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-base text-gray-400 line-through ml-2">৳{product.originalPrice}</span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity & Actions */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100">
              {/* Stock */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
                {product.stock > 0 && product.stock < 10 && (
                  <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-md flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" /> Low stock
                  </span>
                )}
              </div>

              {/* Quantity */}
              <div className="mb-5">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={product.stock === 0}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center text-lg font-semibold text-gray-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={product.stock === 0 || quantity >= product.stock}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="w-full bg-maroon text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full bg-white border-2 border-maroon text-maroon py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
                <button
                  onClick={addToWishlist}
                  className={`w-full py-3 rounded-xl border-2 font-semibold text-sm flex items-center justify-center gap-2 transition-colors ${
                    isWishlisted
                      ? 'bg-pink-50 border-pink-300 text-pink-600'
                      : 'bg-white border-gray-200 text-gray-600'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  {isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Truck className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800">Fast Delivery</h4>
              <p className="text-xs text-gray-500">2-5 days nationwide</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800">Quality Guaranteed</h4>
              <p className="text-xs text-gray-500">100% authentic products</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <RotateCcw className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800">Easy Returns</h4>
              <p className="text-xs text-gray-500">7-day return policy</p>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Product Details */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Package className="h-4 w-4 text-gray-400" />
              Product Details
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Category</span>
                <span className="text-gray-800 font-medium capitalize">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">SKU</span>
                <span className="text-gray-800 font-medium font-mono text-xs">{product.sku || product._id?.substring(0, 8).toUpperCase() || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Availability</span>
                <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Brand</span>
                <span className="text-gray-800 font-medium">Chirkut Ghor</span>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Truck className="h-4 w-4 text-gray-400" />
              Delivery Info
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" /> Inside Cox's Bazar
                </span>
                <span className="text-gray-800 font-medium">৳{deliverySettings.chittagongFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 flex items-center gap-1.5">
                  <Mountain className="h-3.5 w-3.5" /> Outside Cox's Bazar
                </span>
                <span className="text-gray-800 font-medium">৳{deliverySettings.outsideChittagongFee}</span>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500">Delivered by Steadfast Courier</p>
                <p className="text-xs text-gray-500 mt-1">Orders processed within 24 hours</p>
              </div>
            </div>
          </div>

          {/* Why Choose */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Why Choose This?</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-maroon mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">Handcrafted with care and attention to detail</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-maroon mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">Perfect gift for loved ones</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-maroon mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">Premium quality materials used</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-maroon mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">Beautiful packaging included</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Customer Reviews</h2>
              <p className="text-xs text-gray-400 mt-1">{reviews.length} verified reviews</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-lg">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-semibold text-gray-800">{product?.rating?.toFixed(1) || '0.0'}</span>
              </div>
              {canReview && (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="bg-maroon text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Write Review
                </button>
              )}
            </div>
          </div>

          {loadingReviews ? (
            <div className="text-center py-10">
              <p className="text-sm text-gray-400">Loading reviews...</p>
            </div>
          ) : reviews && reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review._id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-600">
                        {(review.user?.name || review.guestName || 'A').charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-800 truncate">
                        {review.user?.name || review.guestName || 'Anonymous'}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full ${
                                i < review.rating ? 'bg-yellow-400' : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">{review.rating}/5</span>
                      </div>
                    </div>
                  </div>
                  {review.title && (
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">{review.title}</h4>
                  )}
                  <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-gray-300" />
              </div>
              <h3 className="text-base font-semibold text-gray-800 mb-1">No Reviews Yet</h3>
              <p className="text-sm text-gray-500 mb-4">Be the first to review this product!</p>
              {canReview ? (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="bg-maroon text-white px-5 py-2 rounded-lg text-sm font-medium"
                >
                  Write a Review
                </button>
              ) : (
                <div>
                  <p className="text-sm text-gray-400 mb-2">Only verified buyers can review.</p>
                  <Link to="/shop" className="text-sm text-maroon font-medium hover:underline">
                    Browse our collection
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <ReviewForm
          productId={id}
          onReviewSubmitted={() => {
            fetchReviews();
          }}
          onClose={() => setShowReviewForm(false)}
        />
      )}
    </div>
  );
};

export default ProductDetail;
