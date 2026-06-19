import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Sparkles, Star, Users, Award, Heart, ShoppingBag, Shirt, Gift, Shield, Truck, Clock, Package, Zap } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/Skeletons';
import BannerSlider from '../components/BannerSlider';
import TypingEffect from '../components/TypingEffect';
import Newsletter from '../components/Newsletter';
import { useSocket } from '../contexts/socketContextBase';
import Seo from '../components/Seo';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hotOffer, setHotOffer] = useState(null);
  const [flashSale, setFlashSale] = useState(null);
  const [flashTimeLeft, setFlashTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const { socket } = useSocket() || {};

  const categoryColorMap = {
    'bg-pink-600': '#DB2777',
    'bg-maroon': '#BE123C',
    'bg-amber-500': '#F59E0B',
    'bg-amber-800': '#92400E',
    'bg-red-500': '#EF4444',
    'bg-yellow-500': '#EAB308',
    'bg-slate-700': '#334155',
    'bg-emerald-500': '#10B981',
    'bg-purple-600': '#9333EA',
    'bg-indigo-600': '#4F46E5',
    'bg-teal-600': '#0D9488',
    'bg-rose-600': '#E11D48',
  };

  const getCategoryStyle = (color) => {
    if (color && categoryColorMap[color]) {
      return { backgroundColor: categoryColorMap[color] };
    }
    return { backgroundColor: '#BE123C' };
  };

  useEffect(() => {
    fetchFeaturedProducts();
    fetchCategories();
    fetchHotOffer();
    fetchFlashSale();
  }, []);

  useEffect(() => {
    if (!socket) return;
    const handleUpdate = (data) => setHotOffer(data);
    const handleFlashSale = (data) => setFlashSale(data);
    socket.on('hot_offer:updated', handleUpdate);
    socket.on('flash_sale:updated', handleFlashSale);
    socket.on('flash_sale:created', handleFlashSale);
    return () => {
      socket.off('hot_offer:updated', handleUpdate);
      socket.off('flash_sale:updated', handleFlashSale);
      socket.off('flash_sale:created', handleFlashSale);
    };
  }, [socket]);

  useEffect(() => {
    if (!flashSale?.endDate) return;
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(flashSale.endDate).getTime();
      const diff = end - now;
      if (diff <= 0) {
        setFlashTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }
      setFlashTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [flashSale?.endDate]);

  const fetchHotOffer = async () => {
    try {
      const response = await axios.get('/api/promotions/hot-offer');
      if (response.data) {
        setHotOffer(response.data);
      }
    } catch (error) {
      console.error('Error fetching hot offer:', error);
    }
  };

  const fetchFlashSale = async () => {
    try {
      const response = await axios.get('/api/promotions/flash-sale');
      if (response.data) {
        setFlashSale(response.data);
      }
    } catch (error) {
      console.error('Error fetching flash sale:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([
        { name: 'Love Combo', slug: 'love-combo', icon: 'Heart', color: 'bg-pink-600' },
        { name: 'Anniversary', slug: 'anniversary-combo', icon: 'Sparkles', color: 'bg-maroon' },
        { name: 'Birthday', slug: 'birthday-combo', icon: 'ShoppingBag', color: 'bg-amber-500' },
        { name: 'Valentine', slug: 'valentine-combo', icon: 'Heart', color: 'bg-red-500' },
      ]);
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get('/api/products?limit=8');
      const data = response.data;
      const products = Array.isArray(data) ? data : Array.isArray(data?.products) ? data.products : [];
      setFeaturedProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      setFeaturedProducts([
        {
          _id: '1',
          name: 'Bamboo Basket Set',
          description: 'Set of 3 handcrafted bamboo baskets for storage',
          price: 1800,
          originalPrice: 1800,
          images: [{ url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400' }],
          stock: 15,
          category: 'home',
          rating: 4.2,
          reviewCount: 45
        },
        {
          _id: '2',
          name: 'Clay Pottery Set',
          description: 'Traditional clay pottery set for serving',
          price: 3200,
          originalPrice: 3200,
          images: [{ url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400' }],
          stock: 8,
          category: 'home',
          rating: 4.5,
          reviewCount: 32
        },
        {
          _id: '3',
          name: 'Handwoven Silk Scarf',
          description: 'Beautiful handwoven silk scarf with traditional patterns',
          price: 2500,
          originalPrice: 2800,
          images: [{ url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400' }],
          stock: 5,
          category: 'clothing',
          rating: 4.8,
          reviewCount: 67
        },
        {
          _id: '4',
          name: 'Handcrafted Gift Box',
          description: 'Elegant gift box with traditional motifs',
          price: 1500,
          originalPrice: 1800,
          images: [{ url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400' }],
          stock: 20,
          category: 'gifts',
          rating: 4.7,
          reviewCount: 89
        },
        {
          _id: '5',
          name: 'Jute Wall Hanging',
          description: 'Eco-friendly jute wall art with ethnic patterns',
          price: 1200,
          originalPrice: 1200,
          images: [{ url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400' }],
          stock: 12,
          category: 'home',
          rating: 4.3,
          reviewCount: 28
        },
        {
          _id: '6',
          name: 'Brass Candle Holder Set',
          description: 'Elegant brass candle holders, set of 3',
          price: 2800,
          originalPrice: 3200,
          images: [{ url: 'https://images.unsplash.com/photo-1602874801006-c25e839d8889?w=400' }],
          stock: 18,
          category: 'home',
          rating: 4.6,
          reviewCount: 51
        },
        {
          _id: '7',
          name: 'Traditional Cotton Saree',
          description: 'Handloom cotton saree with block print design',
          price: 3500,
          originalPrice: 4200,
          images: [{ url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400' }],
          stock: 6,
          category: 'clothing',
          rating: 4.9,
          reviewCount: 124
        },
        {
          _id: '8',
          name: 'Wooden Jewelry Box',
          description: 'Handcarved wooden jewelry box with mirror',
          price: 2200,
          originalPrice: 2500,
          images: [{ url: 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=400' }],
          stock: 10,
          category: 'gifts',
          rating: 4.4,
          reviewCount: 36
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const iconMap = {
    Heart,
    Sparkles,
    ShoppingBag,
    Gift,
    Star,
    Clock,
    Package,
    Shirt,
  };

  return (
    <div className="min-h-screen bg-pink-50">
      <Seo
        title="Chirkut Ghor | Handmade Gifts, Surprise Boxes & Delivery in Bangladesh"
        description="Handmade gifts, surprise boxes, jewelry, flowers, and decor with fast delivery across Bangladesh. Custom orders and festive deals from Chirkut Ghor."
        path="/"
      />

      {/* Banner Slider */}
      <section>
        <BannerSlider />
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 to-white py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {hotOffer?.isActive && (
              <div
                className="mb-8 rounded-2xl border border-gray-100 p-5"
                style={{ backgroundColor: hotOffer.backgroundColor || '#FDE2E4' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="text-left">
                    <span className="inline-block px-3 py-1 rounded-full bg-white text-maroon text-xs font-semibold border border-gray-100">
                      {hotOffer.badgeText || 'Hot Offer'}
                    </span>
                    <h3 className="text-lg font-bold text-gray-800 mt-2">
                      {hotOffer.title}
                    </h3>
                    {hotOffer.subtitle && (
                      <p className="text-sm text-gray-600 mt-1">{hotOffer.subtitle}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    {hotOffer.discountText && (
                      <span className="text-lg font-bold text-maroon">{hotOffer.discountText}</span>
                    )}
                    <Link
                      to={hotOffer.ctaLink || '/shop'}
                      className="inline-flex items-center px-5 py-2.5 bg-maroon text-white rounded-xl text-sm font-semibold"
                    >
                      {hotOffer.ctaText || 'Shop Now'}
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Badge */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="h-4 w-4 text-maroon" />
              <span className="text-xs font-semibold text-maroon uppercase tracking-wider">
                Premium Handcrafted Collection
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
              Handmade Gifts & Surprise Boxes in Bangladesh
            </h1>
            <p className="text-sm text-gray-600 mb-2">
              <TypingEffect
                texts={['Love & Romance', 'Special Moments', 'Heartfelt Surprises']}
                speed={100}
                deleteSpeed={50}
                pauseTime={2000}
              />
            </p>

            <p className="text-sm text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto">
              Express your emotions with curated jewelry, watches, chocolates, flowers, and romantic gift combos.
              Make every moment unforgettable with fast delivery across Bangladesh.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-maroon text-white rounded-xl text-sm font-semibold"
              >
                <span>Explore Collection</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-800 rounded-xl text-sm font-semibold border border-gray-200"
              >
                Our Story
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-maroon">20+</div>
                <div className="text-sm text-gray-600 mt-1">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-maroon">05+</div>
                <div className="text-sm text-gray-600 mt-1">Artisans</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-maroon flex items-center justify-center gap-1">
                  4.8
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                </div>
                <div className="text-sm text-gray-600 mt-1">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-maroon">100+</div>
                <div className="text-sm text-gray-600 mt-1">Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
              Shop by Category
            </h2>
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              Explore our diverse range of handcrafted products
            </p>
          </div>

          {/* Mobile: Horizontal scroll */}
          <div className="lg:hidden overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-3 min-w-max">
              {categories.slice(0, 8).map((category, index) => {
                const Icon = iconMap[category.icon] || Gift;
                return (
                  <Link
                    key={category._id || index}
                    to={`/shop?category=${category.name}`}
                    className="flex-shrink-0 w-36"
                  >
                    <div className="rounded-2xl p-4 text-left border border-gray-100 bg-white">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                        style={getCategoryStyle(category.color)}
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-800 truncate">{category.name}</h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {category.description?.substring(0, 40) || 'Explore curated gifts'}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {category.productCount ? `${category.productCount} items` : 'Tap to browse'}
                      </p>
                    </div>
                  </Link>
                );
              })}
              <Link to="/shop" className="flex-shrink-0 w-36">
                <div className="rounded-2xl p-4 text-left border border-gray-100 bg-white">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 bg-emerald-500">
                    <Shirt className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800">All Products</h3>
                  <p className="text-xs text-gray-500 mt-1">Browse everything</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden lg:grid grid-cols-4 gap-4">
            {categories.slice(0, 7).map((category, index) => {
              const Icon = iconMap[category.icon] || Gift;
              return (
                <Link
                  key={category._id || index}
                  to={`/shop?category=${category.name}`}
                >
                  <div className="rounded-2xl p-5 text-left border border-gray-100 bg-white">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={getCategoryStyle(category.color)}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-1">{category.name}</h3>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                      {category.description?.substring(0, 60) || 'Explore the collection'}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{category.productCount ? `${category.productCount} items` : 'Browse'}</span>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              );
            })}
            <Link to="/shop">
              <div className="rounded-2xl p-5 text-left border border-gray-100 bg-white">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-emerald-500">
                  <Shirt className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">All Products</h3>
                <p className="text-xs text-gray-500">Browse the full catalog</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 sm:py-16 bg-pink-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
              Featured Collection
            </h2>
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              Handpicked treasures from our finest artisans, each piece crafted with love and tradition
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, index) => (
                <div key={index}>
                  <ProductCardSkeleton />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(Array.isArray(featuredProducts) ? featuredProducts : []).map((product) => (
                <div key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 bg-white text-gray-800 rounded-xl text-sm font-semibold border border-gray-200"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      {flashSale?.isActive && flashSale.products?.length > 0 && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-maroon" />
                  <span className="text-xs font-semibold text-maroon uppercase tracking-wider">
                    {flashSale.badgeText || 'Flash Sale'}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  {flashSale.title || 'Limited Time Deals'}
                </h2>
                {flashSale.subtitle && (
                  <p className="text-sm text-gray-600 mt-1">{flashSale.subtitle}</p>
                )}
              </div>

              {/* Countdown Timer */}
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-maroon" />
                <div className="flex items-center gap-1.5">
                  {[
                    { val: flashTimeLeft.hours, label: 'H' },
                    { val: flashTimeLeft.minutes, label: 'M' },
                    { val: flashTimeLeft.seconds, label: 'S' },
                  ].map(({ val, label }) => (
                    <div key={label} className="flex items-center">
                      <span className="bg-maroon text-white text-sm font-bold px-2.5 py-1.5 rounded-lg min-w-[36px] text-center">
                        {String(val).padStart(2, '0')}
                      </span>
                      <span className="text-xs text-gray-400 mx-0.5">{label}</span>
                    </div>
                  ))}
                </div>
                {flashSale.discountPercent && (
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full">
                    {flashSale.discountPercent}% OFF
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(Array.isArray(flashSale.products) ? flashSale.products.slice(0, 8) : []).map((product) => (
                <div key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-maroon text-white rounded-xl text-sm font-semibold"
              >
                View All Deals
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <Newsletter />

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <Award className="h-12 w-12 text-maroon mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                Why Choose Chirkut Ghor?
              </h2>
              <p className="text-sm text-gray-600 max-w-xl mx-auto">
                We're more than just an online store. We connect you with skilled artisans
                and preserve traditional craftsmanship for future generations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="rounded-2xl p-5 text-center border border-gray-100 bg-white">
                <Users className="h-10 w-10 text-maroon mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Authentic Artisans</h3>
                <p className="text-xs text-gray-600">Direct from master craftsmen with decades of experience</p>
              </div>
              <div className="rounded-2xl p-5 text-center border border-gray-100 bg-white">
                <Shield className="h-10 w-10 text-maroon mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Quality Guarantee</h3>
                <p className="text-xs text-gray-600">Every piece is inspected and comes with our quality promise</p>
              </div>
              <div className="rounded-2xl p-5 text-center border border-gray-100 bg-white">
                <Truck className="h-10 w-10 text-maroon mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Fast Delivery</h3>
                <p className="text-xs text-gray-600">Reliable delivery across Bangladesh to your doorstep</p>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 bg-maroon text-white rounded-xl text-sm font-semibold"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
