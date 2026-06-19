import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Breadcrumb from '../components/Breadcrumb';
import Seo from '../components/Seo';
import { User, Package, Heart, Star, Settings, LogOut, ChevronDown, ChevronUp, Edit3, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, logout, checkAuthStatus } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', phone: '' });
  const [profileSaving, setProfileSaving] = useState(false);

  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '' });
  const [passwordSaving, setPasswordSaving] = useState(false);

  const token = localStorage.getItem('token');
  const authHeader = useMemo(() => ({ headers: { Authorization: `Bearer ${token}` } }), [token]);

  useEffect(() => {
    if (user) {
      setProfileForm({ name: user.name || '', phone: user.phone?.primary || '' });
    }
  }, [user]);

  const fetchOrders = useCallback(async () => {
    setOrdersLoading(true);
    try {
      const res = await axios.get('/api/orders', authHeader);
      setOrders(res.data.orders || res.data || []);
    } catch {
      toast.error('Failed to load orders');
    } finally {
      setOrdersLoading(false);
    }
  }, [authHeader]);

  const fetchWishlist = useCallback(async () => {
    setWishlistLoading(true);
    try {
      const res = await axios.get('/api/wishlist', authHeader);
      setWishlist(res.data.wishlist || res.data || []);
    } catch {
      toast.error('Failed to load wishlist');
    } finally {
      setWishlistLoading(false);
    }
  }, [authHeader]);

  const fetchReviews = useCallback(async () => {
    setReviewsLoading(true);
    try {
      const res = await axios.get('/api/reviews/my', authHeader);
      setReviews(res.data.reviews || res.data || []);
    } catch {
      toast.error('Failed to load reviews');
    } finally {
      setReviewsLoading(false);
    }
  }, [authHeader]);

  useEffect(() => {
    if (activeTab === 'orders') fetchOrders();
    if (activeTab === 'wishlist') fetchWishlist();
    if (activeTab === 'reviews') fetchReviews();
  }, [activeTab, fetchOrders, fetchWishlist, fetchReviews]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileSaving(true);
    try {
      await axios.put('/api/users/profile', { name: profileForm.name, phone: profileForm.phone }, authHeader);
      await checkAuthStatus();
      setEditMode(false);
      toast.success('Profile updated');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      toast.error('Please fill both fields');
      return;
    }
    setPasswordSaving(true);
    try {
      await axios.put('/api/users/password', { currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword }, authHeader);
      setPasswordForm({ currentPassword: '', newPassword: '' });
      toast.success('Password updated');
    } catch {
      toast.error('Failed to update password');
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleRemoveWishlist = async (productId) => {
    try {
      await axios.delete(`/api/wishlist/${productId}`, authHeader);
      setWishlist((prev) => prev.filter((item) => item.productId !== productId && item._id !== productId));
      toast.success('Removed from wishlist');
    } catch {
      toast.error('Failed to remove');
    }
  };

  const handleLogout = () => {
    logout();
  };

  const statusColor = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'delivered') return 'bg-green-100 text-green-700';
    if (s === 'cancelled') return 'bg-red-100 text-red-600';
    if (s === 'processing' || s === 'confirmed') return 'bg-blue-100 text-blue-700';
    if (s === 'shipped' || s === 'transit') return 'bg-purple-100 text-purple-700';
    if (s === 'pending') return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-600';
  };

  const renderStars = (count) => (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`h-3.5 w-3.5 ${i <= count ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
      ))}
    </span>
  );

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <Seo title="My Dashboard | Chirkut Ghor" path="/dashboard" />
      <div className="min-h-screen bg-pink-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[{ label: 'Dashboard' }]} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-maroon rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">{user?.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
                </div>

                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                          activeTab === item.id
                            ? 'bg-maroon text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}

                  <div className="pt-2 mt-2 border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                      <button
                        onClick={() => { setEditMode(!editMode); setProfileForm({ name: user?.name || '', phone: user?.phone?.primary || '' }); }}
                        className="flex items-center gap-1.5 text-sm font-medium text-maroon hover:underline"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        {editMode ? 'Cancel' : 'Edit'}
                      </button>
                    </div>

                    {editMode ? (
                      <form onSubmit={handleProfileSave} className="space-y-4 max-w-md">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
                          <input
                            type="text"
                            value={profileForm.name}
                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                            className="border border-gray-200 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-maroon/20 focus:border-maroon outline-none text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                          <input
                            type="text"
                            value={profileForm.phone}
                            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                            className="border border-gray-200 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-maroon/20 focus:border-maroon outline-none text-sm"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={profileSaving}
                          className="bg-maroon text-white px-6 py-3 rounded-xl text-sm font-semibold disabled:opacity-50"
                        >
                          {profileSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
                          <p className="text-sm text-gray-900 font-medium">{user?.name}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                          <p className="text-sm text-gray-900 font-medium">{user?.email}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                          <p className="text-sm text-gray-900 font-medium">{user?.phone?.primary || 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Role</label>
                          <p className="text-sm text-gray-900 font-medium capitalize">{user?.role}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-5">My Orders</h2>
                    {ordersLoading ? (
                      <div className="text-center py-10">
                        <div className="w-8 h-8 border-2 border-maroon border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-sm text-gray-500">Loading orders...</p>
                      </div>
                    ) : orders.length > 0 ? (
                      <div className="space-y-3">
                        {orders.map((order) => {
                          const orderId = (order._id || order.id || '').toString().slice(0, 8);
                          const isExpanded = expandedOrder === (order._id || order.id);
                          return (
                            <div key={order._id || order.id} className="border border-gray-100 rounded-xl overflow-hidden">
                              <button
                                onClick={() => setExpandedOrder(isExpanded ? null : (order._id || order.id))}
                                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                              >
                                <div className="flex items-center gap-4">
                                  <div>
                                    <p className="font-semibold text-gray-900 text-sm">#{orderId}</p>
                                    <p className="text-xs text-gray-500">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</p>
                                  </div>
                                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor(order.status)}`}>
                                    {order.status}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="text-right">
                                    <p className="font-semibold text-gray-900 text-sm">৳{(order.total || 0).toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">{order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? 's' : ''}</p>
                                  </div>
                                  {isExpanded ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                                </div>
                              </button>

                              {isExpanded && (
                                <div className="border-t border-gray-100 p-4 bg-gray-50">
                                  <div className="space-y-2 mb-3">
                                    {(order.items || []).map((item, idx) => (
                                      <div key={idx} className="flex items-center justify-between text-sm">
                                        <span className="text-gray-700">{item.name || item.product?.name || `Item ${idx + 1}`}</span>
                                        <span className="text-gray-500">x{item.quantity || 1}</span>
                                      </div>
                                    ))}
                                  </div>
                                  <Link
                                    to={`/track/${order._id || order.id}`}
                                    className="inline-flex items-center gap-1.5 bg-maroon text-white px-4 py-2 rounded-xl text-xs font-semibold"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                    Track Order
                                  </Link>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Package className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">No Orders Yet</h3>
                        <p className="text-sm text-gray-500 mb-4">Your order history will appear here</p>
                        <Link to="/shop" className="bg-maroon text-white px-6 py-3 rounded-xl text-sm font-semibold inline-block">
                          Start Shopping
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Wishlist Tab */}
                {activeTab === 'wishlist' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-5">My Wishlist</h2>
                    {wishlistLoading ? (
                      <div className="text-center py-10">
                        <div className="w-8 h-8 border-2 border-maroon border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-sm text-gray-500">Loading wishlist...</p>
                      </div>
                    ) : wishlist.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {wishlist.map((item) => {
                          const product = item.product || item;
                          const productId = product._id || product.id || item.productId;
                          return (
                            <div key={productId} className="border border-gray-100 rounded-xl overflow-hidden">
                              <Link to={`/product/${productId}`}>
                                <img
                                  src={product.images?.[0] || product.image || '/placeholder.jpg'}
                                  alt={product.name}
                                  className="w-full h-40 object-cover"
                                />
                              </Link>
                              <div className="p-3">
                                <Link to={`/product/${productId}`}>
                                  <h3 className="font-semibold text-gray-900 text-sm mb-1 hover:text-maroon transition-colors line-clamp-1">
                                    {product.name}
                                  </h3>
                                </Link>
                                <p className="text-sm font-semibold text-gray-900 mb-3">৳{(product.price || 0).toLocaleString()}</p>
                                <div className="flex gap-2">
                                  <Link
                                    to={`/product/${productId}`}
                                    className="bg-maroon text-white px-4 py-2 rounded-xl text-xs font-semibold"
                                  >
                                    View Product
                                  </Link>
                                  <button
                                    onClick={() => handleRemoveWishlist(productId)}
                                    className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Heart className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Wishlist is Empty</h3>
                        <p className="text-sm text-gray-500 mb-4">Save your favorite items to revisit later</p>
                        <Link to="/shop" className="bg-maroon text-white px-6 py-3 rounded-xl text-sm font-semibold inline-block">
                          Browse Products
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-5">My Reviews</h2>
                    {reviewsLoading ? (
                      <div className="text-center py-10">
                        <div className="w-8 h-8 border-2 border-maroon border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-sm text-gray-500">Loading reviews...</p>
                      </div>
                    ) : reviews.length > 0 ? (
                      <div className="space-y-3">
                        {reviews.map((review) => (
                          <div key={review._id || review.id} className="border border-gray-100 rounded-xl p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <Link to={`/product/${review.product?._id || review.productId}`} className="font-semibold text-gray-900 text-sm hover:text-maroon transition-colors">
                                  {review.product?.name || review.productName || 'Product'}
                                </Link>
                                <div className="mt-1">{renderStars(review.rating)}</div>
                              </div>
                              <span className="text-xs text-gray-400">
                                {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{review.comment || review.review}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Star className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">No Reviews Yet</h3>
                        <p className="text-sm text-gray-500 mb-4">Share your experience with purchased products</p>
                        <Link to="/shop" className="bg-maroon text-white px-6 py-3 rounded-xl text-sm font-semibold inline-block">
                          Browse Products
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-5">Account Settings</h2>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Change Password</h3>
                      <form onSubmit={handlePasswordChange} className="space-y-3 max-w-md">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Current Password</label>
                          <input
                            type="password"
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                            className="border border-gray-200 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-maroon/20 focus:border-maroon outline-none text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">New Password</label>
                          <input
                            type="password"
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                            className="border border-gray-200 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-maroon/20 focus:border-maroon outline-none text-sm"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={passwordSaving}
                          className="bg-maroon text-white px-6 py-3 rounded-xl text-sm font-semibold disabled:opacity-50"
                        >
                          {passwordSaving ? 'Updating...' : 'Update Password'}
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
