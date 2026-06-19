import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Search, Filter, X } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import Seo from '../components/Seo';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || 'createdAt'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    setFilters({
      category: searchParams.get('category') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      search: searchParams.get('search') || '',
      sort: searchParams.get('sort') || 'createdAt'
    });
  }, [searchParams]);

  const fetchProducts = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      params.append('page', currentPage);
      params.append('limit', productsPerPage);

      const response = await axios.get(`/api/products?${params}`);
      setProducts(response.data.products);
      setTotalProducts(response.data.total);
      setTotalPages(Math.ceil(response.data.total / productsPerPage));
    } catch (error) {
      console.error('Error fetching products:', error);
      let fallbackProducts = [
        {
          _id: '1',
          name: 'Gold Plated Party Necklace',
          description: 'Elegant gold plated necklace perfect for parties and gifts',
          price: 2500,
          originalPrice: 3200,
          images: [{ url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400' }],
          stock: 15,
          category: 'Jewellery',
          rating: 4.8,
          reviewCount: 125
        },
        {
          _id: '2',
          name: 'Designer Bangles Set',
          description: 'Beautiful set of 4 designer bangles with stone work',
          price: 1800,
          originalPrice: 2200,
          images: [{ url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400' }],
          stock: 20,
          category: 'Jewellery',
          rating: 4.7,
          reviewCount: 89
        },
        {
          _id: '3',
          name: 'Couple Rings Set',
          description: 'Matching couple rings with engraving option',
          price: 3500,
          originalPrice: 4200,
          images: [{ url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400' }],
          stock: 12,
          category: 'Jewellery',
          rating: 4.9,
          reviewCount: 156
        },
        {
          _id: '4',
          name: 'Jhumka Earrings',
          description: 'Traditional jhumka earrings with pearl detailing',
          price: 1200,
          originalPrice: 1500,
          images: [{ url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400' }],
          stock: 25,
          category: 'Jewellery',
          rating: 4.6,
          reviewCount: 78
        },
        {
          _id: '5',
          name: 'Ladies Elegant Watch',
          description: 'Stylish ladies watch with leather strap',
          price: 4500,
          originalPrice: 5500,
          images: [{ url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400' }],
          stock: 10,
          category: 'Watches',
          rating: 4.8,
          reviewCount: 92
        },
        {
          _id: '6',
          name: 'Couple Watch Set',
          description: 'Matching his & her watch set - perfect gift',
          price: 7500,
          originalPrice: 9000,
          images: [{ url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400' }],
          stock: 8,
          category: 'Watches',
          rating: 4.9,
          reviewCount: 145
        },
        {
          _id: '7',
          name: 'Premium Chocolate Gift Box',
          description: 'Assorted Dairy Milk, KitKat & Silk chocolates',
          price: 1500,
          originalPrice: 1800,
          images: [{ url: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400' }],
          stock: 30,
          category: 'Chocolates',
          rating: 4.7,
          reviewCount: 203
        },
        {
          _id: '8',
          name: 'Heart Shape Chocolate Box',
          description: 'Romantic heart-shaped chocolate gift box',
          price: 2200,
          originalPrice: 2500,
          images: [{ url: 'https://images.unsplash.com/photo-1548848774-1f1db32f8e20?w=400' }],
          stock: 18,
          category: 'Chocolates',
          rating: 4.9,
          reviewCount: 178
        },
        {
          _id: '9',
          name: 'Large Teddy Bear',
          description: 'Cute and cuddly teddy bear - 2 feet tall',
          price: 1800,
          originalPrice: 2200,
          images: [{ url: 'https://images.unsplash.com/photo-1560012057-71269d46f5f8?w=400' }],
          stock: 15,
          category: 'Gifts',
          rating: 4.8,
          reviewCount: 167
        },
        {
          _id: '10',
          name: 'Artificial Rose Bouquet',
          description: 'Beautiful artificial rose bouquet (12 roses)',
          price: 800,
          originalPrice: 1000,
          images: [{ url: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400' }],
          stock: 40,
          category: 'Gifts',
          rating: 4.5,
          reviewCount: 95
        },
        {
          _id: '11',
          name: 'Love Combo - Chirkut Special',
          description: 'Handwritten chirkut + chocolate + flower combo',
          price: 2500,
          originalPrice: 3000,
          images: [{ url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400' }],
          stock: 12,
          category: 'Love Combo',
          rating: 5.0,
          reviewCount: 234
        },
        {
          _id: '12',
          name: 'Ring + Teddy + Chocolate Combo',
          description: 'Perfect romantic surprise combo pack',
          price: 4500,
          originalPrice: 5500,
          images: [{ url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400' }],
          stock: 8,
          category: 'Love Combo',
          rating: 4.9,
          reviewCount: 189
        },
        {
          _id: '13',
          name: 'Birthday Gift Box',
          description: 'Complete birthday surprise with treats & gifts',
          price: 3500,
          originalPrice: 4200,
          images: [{ url: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=400' }],
          stock: 10,
          category: 'Birthday Combo',
          rating: 4.8,
          reviewCount: 145
        },
        {
          _id: '14',
          name: 'Anniversary Surprise Box',
          description: 'Necklace + bangles + love note combo',
          price: 5500,
          originalPrice: 6800,
          images: [{ url: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400' }],
          stock: 6,
          category: 'Anniversary Combo',
          rating: 5.0,
          reviewCount: 198
        },
        {
          _id: '15',
          name: 'Premium Gift Sharee',
          description: 'Beautiful gift-wrapped sharee with jewellery',
          price: 6500,
          originalPrice: 8000,
          images: [{ url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400' }],
          stock: 5,
          category: 'Clothing',
          rating: 4.9,
          reviewCount: 87
        },
        {
          _id: '16',
          name: 'Handwritten Chirkut',
          description: 'Personalized handwritten love letter in Bengali/English',
          price: 500,
          originalPrice: 500,
          images: [{ url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400' }],
          stock: 50,
          category: 'Handmade',
          rating: 4.9,
          reviewCount: 312
        },
        {
          _id: '17',
          name: 'Memory Scrap Book',
          description: 'Custom photo memory scrapbook with decorations',
          price: 1500,
          originalPrice: 1800,
          images: [{ url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400' }],
          stock: 15,
          category: 'Handmade',
          rating: 4.8,
          reviewCount: 134
        },
        {
          _id: '18',
          name: 'Valentine Special Combo',
          description: 'Ring + roses + chocolate + love letter combo',
          price: 6500,
          originalPrice: 7800,
          images: [{ url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400' }],
          stock: 10,
          category: 'Valentine Combo',
          rating: 5.0,
          reviewCount: 245
        },
        {
          _id: '19',
          name: 'Proposal Gift Box',
          description: 'Complete proposal setup with ring & romantic items',
          price: 8500,
          originalPrice: 10000,
          images: [{ url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400' }],
          stock: 5,
          category: 'Proposal Combo',
          rating: 5.0,
          reviewCount: 167
        },
        {
          _id: '20',
          name: 'Premium Luxury Gift Box',
          description: 'Customizable luxury gift box with your choice of items',
          price: 9500,
          originalPrice: 12000,
          images: [{ url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400' }],
          stock: 8,
          category: 'Gift Boxes',
          rating: 4.9,
          reviewCount: 178
        }
      ];

      let filteredProducts = fallbackProducts;

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
        );
      }

      if (filters.category) {
        filteredProducts = filteredProducts.filter(product =>
          product.category.toLowerCase() === filters.category.toLowerCase()
        );
      }

      if (filters.minPrice) {
        filteredProducts = filteredProducts.filter(product =>
          product.price >= parseFloat(filters.minPrice)
        );
      }
      if (filters.maxPrice) {
        filteredProducts = filteredProducts.filter(product =>
          product.price <= parseFloat(filters.maxPrice)
        );
      }

      if (filters.sort) {
        filteredProducts = [...filteredProducts].sort((a, b) => {
          switch (filters.sort) {
            case 'price':
              return a.price - b.price;
            case '-price':
              return b.price - a.price;
            case 'name':
              return a.name.localeCompare(b.name);
            case '-name':
              return b.name.localeCompare(a.name);
            case 'createdAt':
            default:
              return 0;
          }
        });
      }

      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      setProducts(filteredProducts.slice(startIndex, endIndex));
      setTotalProducts(filteredProducts.length);
      setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage, productsPerPage]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/products/categories');
      const data = response.data;
      setCategories(Array.isArray(data) ? data : (data.categories || []));
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([
        'Love Combo',
        'Anniversary Combo',
        'Birthday Combo',
        'Valentine Combo',
        'Proposal Combo',
        'Jewellery',
        'Watches',
        'Chocolates',
        'Gifts',
        'Handmade',
        'Clothing',
        'Gift Boxes'
      ]);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, currentPage]);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setShowFilters(true);
    }
  }, []);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setCurrentPage(1);

    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      search: '',
      sort: 'createdAt'
    });
    setCurrentPage(1);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-pink-50">
      <Breadcrumb items={[{ label: 'Shop' }]} />
      <Seo
        title="Shop Handmade Gifts & Surprise Boxes | Chirkut Ghor"
        description="Browse handmade gifts, surprise boxes, jewelry, chocolates, and decor. Filter by price, category, and occasion to find the perfect gift in Bangladesh."
        path="/shop"
      />

      {/* Hero Section */}
      <section className="bg-maroon py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Shop Handmade Gifts
          </h1>
          <p className="text-pink-100 text-sm sm:text-base max-w-xl mx-auto">
            Curated surprise boxes, jewelry, chocolates, and decor made by skilled artisans.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter Toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-maroon"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 sm:hidden"
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-72 shrink-0`}>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-xs text-gray-500 hover:text-maroon"
                >
                  Clear all
                </button>
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-maroon"
                >
                  <option value="">All Categories</option>
                  {Array.isArray(categories) && categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                  Price Range (৳)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="w-1/2 border border-gray-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-maroon"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-1/2 border border-gray-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-maroon"
                  />
                </div>
              </div>

              {/* Sort */}
              <div className="mb-5">
                <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                  Sort By
                </label>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-maroon"
                >
                  <option value="createdAt">Newest First</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                  <option value="-name">Name Z-A</option>
                </select>
              </div>

              <button
                onClick={clearFilters}
                className="w-full py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700"
              >
                Reset
              </button>
            </div>
          </aside>

          {/* Products Area */}
          <main className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-24">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-maroon rounded-full animate-spin" />
              </div>
            ) : products.length > 0 ? (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  {totalProducts} products
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-1.5 mt-10">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Prev
                    </button>

                    {[...Array(totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-9 h-9 rounded-lg text-sm border ${
                              currentPage === pageNum
                                ? 'bg-maroon text-white border-maroon'
                                : 'border-gray-200 text-gray-600'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (
                        pageNum === currentPage - 2 ||
                        pageNum === currentPage + 2
                      ) {
                        return (
                          <span key={pageNum} className="px-1 text-gray-400">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-24">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  No products found
                </h3>
                <p className="text-sm text-gray-500 mb-5">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearFilters}
                  className="px-5 py-2.5 bg-maroon text-white rounded-xl text-sm font-medium"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;
