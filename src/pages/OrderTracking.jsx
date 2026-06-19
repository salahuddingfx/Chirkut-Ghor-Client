import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { Package, Truck, CheckCircle, MapPin, Calendar, DollarSign, ArrowLeft, Phone, Mail, Search } from 'lucide-react';
import axios from 'axios';

const OrderTracking = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(orderId || '');
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if (orderId) {
      fetchOrderById(orderId);
    } else {
      setLoading(false);
    }
  }, [orderId, location.search]);

  const fetchOrderById = async (id) => {
    try {
      setError('');
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/orders/track/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setOrder(response.data);
    } catch (err) {
      setOrder(null);
      setError(err.response?.data?.message || 'Unable to track this order');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    setError('');
    setOrder(null);
    setSearchResults(null);

    // Detect input type
    const isEmail = query.includes('@');
    const isPhone = /^[\d\s\-+()]{7,}$/.test(query);

    if (isEmail) {
      // Search by email
      try {
        const response = await axios.get('/api/orders/track/search', {
          params: { email: query },
        });
        if (response.data.length === 1) {
          setOrder(response.data[0]);
          setSearchResults(null);
        } else {
          setSearchResults(response.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'No orders found for this email');
      } finally {
        setLoading(false);
      }
    } else if (isPhone) {
      // Search by phone
      try {
        const response = await axios.get('/api/orders/track/search', {
          params: { phone: query },
        });
        if (response.data.length === 1) {
          setOrder(response.data[0]);
          setSearchResults(null);
        } else {
          setSearchResults(response.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'No orders found for this phone number');
      } finally {
        setLoading(false);
      }
    } else {
      // Treat as order ID
      fetchOrderById(query);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-blue-500';
      case 'processing': return 'bg-indigo-500';
      case 'shipped': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
      case 'confirmed': return <Package className="h-5 w-5" />;
      case 'processing': return <Package className="h-5 w-5" />;
      case 'shipped': return <Truck className="h-5 w-5" />;
      case 'delivered': return <CheckCircle className="h-5 w-5" />;
      default: return <Package className="h-5 w-5" />;
    }
  };

  const buildTrackingHistory = (orderData) => {
    const statusRank = { pending: 1, processing: 2, shipped: 3, delivered: 4, cancelled: 0, returned: 0 };
    const steps = ['pending', 'processing', 'shipped', 'delivered'];
    const currentRank = statusRank[orderData.orderStatus] || 1;

    return steps.map((status) => {
      const completed = statusRank[status] <= currentRank && currentRank > 0;
      let timestamp = null;
      if (status === 'pending') timestamp = orderData.createdAt;
      if (status === 'shipped') timestamp = orderData.courierInfo?.sentAt || null;
      if (status === 'delivered') timestamp = orderData.deliveredAt || null;

      return {
        status,
        message:
          status === 'pending' ? 'Order placed successfully' :
          status === 'processing' ? 'We are preparing your order' :
          status === 'shipped' ? 'Handed to courier for delivery' :
          'Delivered successfully',
        timestamp,
        completed,
      };
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-maroon"></div>
      </div>
    );
  }

  if (!order && !searchResults) {
    return (
      <div className="min-h-screen bg-pink-50 py-8 sm:py-12 md:py-16 px-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <Package className="h-14 w-14 text-gray-300 mx-auto mb-5" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Track Your Order</h1>
            <p className="text-sm text-gray-500 mb-8">Enter your order ID, email, or phone number</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSearch} className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Order ID, email, or phone number"
                  className="border border-gray-200 rounded-xl py-3 pl-10 pr-4 w-full focus:ring-2 focus:ring-maroon/20 focus:border-maroon outline-none text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-maroon text-white rounded-xl py-3 text-sm font-semibold"
              >
                Track
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <Link to="/" className="text-maroon text-sm font-semibold hover:underline inline-flex items-center gap-1.5">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show search results if multiple orders found
  if (searchResults) {
    return (
      <div className="min-h-screen bg-pink-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => { setSearchResults(null); setOrder(null); setError(''); }}
            className="text-maroon text-sm font-semibold hover:underline inline-flex items-center gap-1.5 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Search again
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Found {searchResults.length} order(s)</h1>
          <div className="space-y-3">
            {searchResults.map((item) => (
              <button
                key={item._id}
                onClick={() => { setSearchResults(null); navigate(`/track/${item._id}`); fetchOrderById(item._id); }}
                className="w-full bg-white rounded-2xl border border-gray-100 p-4 text-left hover:border-maroon transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">#{item._id}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`${getStatusColor(item.orderStatus)} text-white px-3 py-1 rounded-full text-xs font-semibold capitalize`}>
                      {item.orderStatus}
                    </span>
                    <p className="text-sm font-bold text-gray-900 mt-1">৳{item.total}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const contactInfo = order.user || order.guestInfo || {};
  const shipping = order.shippingAddress || {};
  const trackingHistory = buildTrackingHistory(order);
  const lastUpdated = trackingHistory.filter(h => h.timestamp).pop()?.timestamp || order.createdAt;
  const estimatedDelivery = order.deliveredAt || new Date(new Date(order.createdAt).getTime() + 4 * 24 * 60 * 60 * 1000).toISOString();

  return (
    <div className="min-h-screen bg-pink-50 py-8 px-4">
      <Breadcrumb items={[{ label: 'Track Order' }]} />
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link to="/dashboard" className="text-maroon text-sm font-semibold hover:underline inline-flex items-center gap-1.5 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Track Order #{order._id}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Tracking Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">Order Status</h2>
                  <p className="text-xs text-gray-500">Last updated: {new Date(lastUpdated).toLocaleString()}</p>
                </div>
                <span className={`${getStatusColor(order.orderStatus)} text-white px-4 py-2 rounded-xl text-sm font-bold capitalize`}>
                  {order.orderStatus}
                </span>
              </div>

              {/* Timeline */}
              <div className="relative">
                {trackingHistory.map((history, index) => (
                  <div key={index} className="flex items-start gap-4 mb-6 last:mb-0">
                    {/* Icon */}
                    <div className="flex-shrink-0 relative z-10">
                      <div className={`w-10 h-10 rounded-full ${history.completed ? getStatusColor(history.status) : 'bg-gray-100'} flex items-center justify-center text-white`}>
                        {history.completed ? getStatusIcon(history.status) : <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>}
                      </div>
                      {index < trackingHistory.length - 1 && (
                        <div className={`absolute left-1/2 -translate-x-1/2 top-10 w-0.5 h-6 ${history.completed ? 'bg-maroon' : 'bg-gray-200'}`}></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="pt-1.5 flex-1">
                      <h3 className={`text-sm font-bold capitalize ${history.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                        {history.status}
                      </h3>
                      <p className={`text-xs mt-0.5 ${history.completed ? 'text-gray-500' : 'text-gray-300'}`}>
                        {history.message}
                      </p>
                      {history.timestamp && (
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(history.timestamp).toLocaleString('en-US', {
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-gray-400" />
                Order Items
              </h2>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
                    <img
                      src={item.product?.images?.[0] || item.image || 'https://via.placeholder.com/100'}
                      alt={item.product?.name || item.name}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm">{item.product?.name || item.name}</h3>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-gray-900 text-sm">৳{item.price * item.quantity}</p>
                      <p className="text-xs text-gray-400">৳{item.price} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Details */}
          <div className="space-y-5">
            {/* Customer Info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="text-base font-bold text-gray-900 mb-4">Customer Info</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-xs">Phone</p>
                    <p className="font-medium text-gray-900">{contactInfo.phone || shipping.phone || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-xs">Email</p>
                    <p className="font-medium text-gray-900">{contactInfo.email || shipping.email || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                Delivery Address
              </h2>
              <div className="text-sm text-gray-600 leading-relaxed space-y-0.5">
                <p className="font-medium text-gray-900">{contactInfo.name || 'Customer'}</p>
                <p>{shipping.street}</p>
                <p>{shipping.union}</p>
                <p>{shipping.subDistrict}</p>
                <p>{shipping.district}, {shipping.division}</p>
                <p>{shipping.city} - {shipping.postalCode || shipping.zipCode}</p>
                <p>{shipping.country}</p>
              </div>
            </div>

            {/* Estimated Delivery */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <h2 className="text-base font-bold text-gray-900">Estimated Delivery</h2>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {new Date(estimatedDelivery).toLocaleDateString('en-US', {
                  month: 'long', day: 'numeric', year: 'numeric'
                })}
              </p>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-400" />
                Payment Details
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Method</span>
                  <span className="font-medium text-gray-900 uppercase">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Status</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {order.paymentStatus}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-100">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-gray-900">৳{order.total}</span>
                </div>
              </div>
            </div>

            {/* Help */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-1 text-sm">Need Help?</h3>
              <p className="text-xs text-gray-500 mb-3">Contact our support team for any queries</p>
              <div className="space-y-2 text-sm">
                <a href="tel:+8801851075537" className="flex items-center gap-2 text-maroon">
                  <Phone className="h-3.5 w-3.5" />
                  <span>+880 18510-75537</span>
                </a>
                <a href="mailto:salauddinkaderappy@gmail.com" className="flex items-center gap-2 text-maroon">
                  <Mail className="h-3.5 w-3.5" />
                  <span>salauddinkaderappy@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
