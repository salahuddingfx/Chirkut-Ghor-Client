import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { Package, Truck, CheckCircle, Clock, XCircle, Eye, Search, Download } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/orders/my-orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data || []);
    } catch {
      setOrders([
        {
          _id: '1001',
          items: [
            { product: { name: 'Love Combo - Chirkut Special', images: ['https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=500'] }, quantity: 1, price: 2500 },
            { product: { name: 'Premium Chocolate Gift Box', images: ['https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500'] }, quantity: 2, price: 1500 }
          ],
          totalAmount: 5500,
          status: 'processing',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: '1002',
          items: [
            { product: { name: 'Couple Rings Set', images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500'] }, quantity: 1, price: 3500 }
          ],
          totalAmount: 3500,
          status: 'delivered',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          estimatedDelivery: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: '1003',
          items: [
            { product: { name: 'Valentine Special Combo', images: ['https://images.unsplash.com/photo-1464047736614-af63643285bf?w=500'] }, quantity: 1, price: 6500 }
          ],
          totalAmount: 6500,
          status: 'pending',
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/orders/${orderId}/invoice`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Invoice-${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Invoice downloaded successfully!');
    } catch (error) {
      console.error('Invoice download error:', error);
      toast.error('Failed to download invoice');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-3.5 w-3.5" />;
      case 'processing': return <Package className="h-3.5 w-3.5" />;
      case 'shipped': return <Truck className="h-3.5 w-3.5" />;
      case 'delivered': return <CheckCircle className="h-3.5 w-3.5" />;
      case 'cancelled': return <XCircle className="h-3.5 w-3.5" />;
      default: return <Package className="h-3.5 w-3.5" />;
    }
  };

  const filteredOrders = orders.filter(order =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-maroon"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 py-8 px-4">
      <Breadcrumb items={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Orders' }]} />
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">My Orders</h1>
          <p className="text-sm text-gray-600">Track and manage your gift orders</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-200 rounded-xl py-3 pl-10 pr-4 w-full focus:ring-2 focus:ring-maroon/20 focus:border-maroon outline-none text-sm"
            />
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <Package className="h-14 w-14 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders Found</h3>
            <p className="text-gray-500 text-sm mb-6">Start shopping and create your first order!</p>
            <Link
              to="/shop"
              className="inline-block bg-maroon text-white rounded-xl px-6 py-3 text-sm font-semibold"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Left - Order Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
                      <h3 className="text-lg font-bold text-gray-900">#{order._id}</h3>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold w-fit ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </span>
                    </div>

                    {/* Items */}
                    <div className="space-y-3 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <img
                            src={item.product.images?.[0] || 'https://via.placeholder.com/100'}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">{item.product.name}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity} x ৳{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Dates */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                      <span>
                        <span className="font-medium text-gray-700">Ordered:</span>{' '}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                      <span>
                        <span className="font-medium text-gray-700">Delivery:</span>{' '}
                        {new Date(order.estimatedDelivery).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Right - Amount & Actions */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 lg:gap-2 lg:min-w-[140px]">
                    <p className="text-xl font-bold text-gray-900 lg:text-right">
                      ৳{order.totalAmount.toLocaleString()}
                    </p>
                    <div className="flex gap-2 lg:w-full">
                      <Link
                        to={`/track/${order._id}`}
                        className="flex items-center justify-center gap-1.5 bg-maroon text-white rounded-xl px-4 py-2.5 text-xs font-semibold lg:flex-1"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Track
                      </Link>
                      <button
                        onClick={() => handleDownloadInvoice(order._id)}
                        className="flex items-center justify-center gap-1.5 border border-gray-200 text-gray-700 rounded-xl px-4 py-2.5 text-xs font-semibold lg:flex-1"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Invoice
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
