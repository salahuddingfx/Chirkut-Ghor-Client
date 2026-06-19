import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useDeliveryCalculation } from '../hooks/useDeliveryCalculation';
import Breadcrumb from '../components/Breadcrumb';
import { CreditCard, Truck, MapPin, User, Gift, Heart, Package, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { delivery, loading: deliveryLoading, fetchDelivery } = useDeliveryCalculation();

  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponInfo, setCouponInfo] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [couponLoading, setCouponLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address?.street || '',
    union: user?.address?.union || '',
    subDistrict: user?.address?.subDistrict || '',
    district: user?.address?.district || '',
    division: user?.address?.division || '',
    city: user?.address?.city || '',
    postalCode: user?.address?.postalCode || '',
    zipCode: user?.address?.zipCode || '',
    transactionId: '',
    senderLastDigits: '',
    paymentMethod: 'cod'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (couponInfo) {
      setCouponInfo(null);
      setDiscount(0);
    }
  }, [totalPrice, couponInfo]);

  useEffect(() => {
    if (totalPrice > 0 && formData.district && formData.city) {
      fetchDelivery(totalPrice, formData.district, formData.city);
    }
  }, [totalPrice, formData.district, formData.city, fetchDelivery]);

  const handleApplyCoupon = async () => {
    if (couponLoading) return;

    const trimmedCode = couponCode.trim().toUpperCase();

    if (!trimmedCode) {
      setCouponInfo(null);
      setDiscount(0);
      setCouponCode('');
      return;
    }

    if (couponInfo) {
      setCouponInfo(null);
      setDiscount(0);
      setCouponCode('');
      return;
    }

    setCouponLoading(true);
    try {
      const response = await axios.post('/api/coupons/validate', {
        code: trimmedCode,
        subtotal: totalPrice,
      });

      setCouponCode(trimmedCode);
      setCouponInfo(response.data);
      setDiscount(response.data.discount || 0);
      toast.success(`Coupon applied! You saved ৳${(response.data.discount || 0).toFixed(0)}`);
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid coupon code';
      setCouponInfo(null);
      setDiscount(0);
      toast.error(message);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.union || !formData.subDistrict) {
        toast.error('Please fill in all required fields');
        setLoading(false);
        return;
      }

      if (formData.paymentMethod !== 'cod') {
        if (!formData.transactionId || !formData.senderLastDigits) {
          toast.error('Please provide transaction ID and sender last 4 digits');
          setLoading(false);
          return;
        }
        if (!/^[0-9]{4}$/.test(formData.senderLastDigits)) {
          toast.error('Sender last digits must be 4 numbers');
          setLoading(false);
          return;
        }
        if (formData.transactionId.trim().length < 6) {
          toast.error('Transaction ID looks too short');
          setLoading(false);
          return;
        }
      }

      const orderData = {
        items: cartItems.map(item => ({
          product: item._id || item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        shippingAddress: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          street: formData.address,
          union: formData.union,
          subDistrict: formData.subDistrict,
          district: formData.district,
          division: formData.division,
          city: formData.city,
          state: formData.city,
          postalCode: formData.postalCode,
          zipCode: formData.postalCode || formData.zipCode || '0000',
          country: 'Bangladesh',
        },
        paymentMethod: formData.paymentMethod,
        paymentDetails: formData.paymentMethod !== 'cod' ? {
          transactionId: formData.transactionId,
          senderLastDigits: formData.senderLastDigits,
        } : undefined,
      };

      if (couponInfo?.code) {
        orderData.couponCode = couponInfo.code;
      }

      if (!isAuthenticated) {
        orderData.guestInfo = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        };
      }

      const token = localStorage.getItem('token');
      const config = token ? {
        headers: {
          Authorization: `Bearer ${token}`
        }
      } : {};

      const response = await axios.post('/api/orders', orderData, config);
      const newOrderId = response.data?._id || response.data?.order?._id;

      clearCart();

      if (formData.paymentMethod === 'cod') {
        toast.success('Order placed successfully!');
      } else {
        toast.success(`Order placed! We'll call you to confirm ${formData.paymentMethod.toUpperCase()} payment.`);
      }

      setTimeout(() => {
        navigate(`/order-success${newOrderId ? `?id=${newOrderId}` : ''}`);
      }, 1000);
    } catch (error) {
      console.error('Failed to place order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-12 text-center max-w-md w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <Link
            to="/shop"
            className="bg-maroon text-white rounded-xl py-3 px-8 font-semibold text-sm inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const shipping = delivery?.charge || 0;
  const tax = 0;
  const total = Math.max(0, totalPrice + shipping + tax - discount);

  return (
    <div className="min-h-screen bg-pink-50 py-8 sm:py-12">
      <Breadcrumb items={[{ label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
          Checkout
        </h1>

        {!isAuthenticated && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-maroon rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4 text-center flex items-center justify-center gap-2">
                <Gift className="h-5 w-5" /> Become a Lifetime Customer!
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-5">
                <div className="text-center">
                  <Heart className="h-6 w-6 text-pink-300 mx-auto mb-1" />
                  <p className="font-semibold">Exclusive Deals</p>
                  <p className="text-white/70 text-xs">Member-only discounts</p>
                </div>
                <div className="text-center">
                  <Truck className="h-6 w-6 text-pink-300 mx-auto mb-1" />
                  <p className="font-semibold">Free Shipping</p>
                  <p className="text-white/70 text-xs">On orders above ৳2500</p>
                </div>
                <div className="text-center">
                  <Package className="h-6 w-6 text-pink-300 mx-auto mb-1" />
                  <p className="font-semibold">Order Tracking</p>
                  <p className="text-white/70 text-xs">Track all your orders</p>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <Link
                  to="/login"
                  state={{ from: '/checkout' }}
                  className="bg-white text-maroon px-6 py-2 rounded-xl font-bold text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  state={{ from: '/checkout' }}
                  className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-xl font-bold text-sm"
                >
                  Register
                </Link>
              </div>
              <p className="text-center text-xs text-white/60 mt-3">
                Or continue as guest below
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Truck className="h-5 w-5 text-gray-400" />
                Order Summary
              </h2>

              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image || '/placeholder.jpg'}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-xl"
                      />
                      <div>
                        <p className="font-medium text-sm text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-sm text-gray-900">৳{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <hr className="border-gray-100 my-4" />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900">৳{totalPrice}</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Coupon Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="border border-gray-200 rounded-xl py-2.5 px-3 text-sm flex-1 outline-none focus:border-maroon"
                      placeholder="Enter coupon code"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={couponLoading}
                      className="bg-maroon text-white px-4 py-2.5 rounded-xl font-semibold text-sm disabled:opacity-60"
                    >
                      {couponInfo ? 'Remove' : couponLoading ? '...' : 'Apply'}
                    </button>
                  </div>
                  {couponInfo && (
                    <p className="text-xs text-green-600 font-semibold mt-1">
                      Applied {couponInfo.code} — Saved ৳{discount.toFixed(0)}
                    </p>
                  )}
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-gray-900">{deliveryLoading ? '...' : `৳${shipping}`}</span>
                </div>
                {delivery?.label && (
                  <p className="text-xs text-gray-400">{delivery.label}</p>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600 font-semibold">
                    <span>Discount</span>
                    <span>-৳{discount.toFixed(0)}</span>
                  </div>
                )}
                <hr className="border-gray-100" />
                <div className="flex justify-between text-base font-bold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">৳{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 lg:p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              Shipping Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border border-gray-200 rounded-xl py-3 px-4 text-sm w-full outline-none focus:border-maroon"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-xl py-3 px-4 text-sm w-full outline-none focus:border-maroon"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="border border-gray-200 rounded-xl py-3 px-4 text-sm w-full outline-none focus:border-maroon"
                  placeholder="+880 1XXX-XXXXXX"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="border border-gray-200 rounded-xl py-3 px-4 text-sm w-full outline-none focus:border-maroon resize-none"
                  placeholder="House/Flat no, Street name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Division (optional)</label>
                  <input
                    type="text"
                    name="division"
                    value={formData.division}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-xl py-3 px-4 text-sm w-full outline-none focus:border-maroon"
                    placeholder="Chattogram"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">District (optional)</label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-xl py-3 px-4 text-sm w-full outline-none focus:border-maroon"
                    placeholder="Cox's Bazar"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                    Sub-district (Upazila) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subDistrict"
                    value={formData.subDistrict}
                    onChange={handleChange}
                    required
                    className="border border-gray-200 rounded-xl py-3 px-4 text-sm w-full outline-none focus:border-maroon"
                    placeholder="Cox's Bazar Sadar"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                    Union / Ward <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="union"
                    value={formData.union}
                    onChange={handleChange}
                    required
                    className="border border-gray-200 rounded-xl py-3 px-4 text-sm w-full outline-none focus:border-maroon"
                    placeholder="Union name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="border border-gray-200 rounded-xl py-3 px-4 text-sm w-full outline-none focus:border-maroon"
                    placeholder="Dhaka"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Postal Code (optional)</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-xl py-3 px-4 text-sm w-full outline-none focus:border-maroon"
                    placeholder="1200"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  Payment Method
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer bg-white">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="text-maroon focus:ring-maroon h-4 w-4"
                    />
                    <span className="ml-3 font-semibold text-sm text-gray-900">Cash on Delivery</span>
                  </label>

                  <div className="border border-gray-200 rounded-xl p-4 bg-white">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                      <p className="font-bold text-sm text-gray-900">Mobile Banking (bKash/Nagad/Rocket)</p>
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-maroon text-white text-sm font-semibold">
                        01764723083
                      </span>
                    </div>
                    <ol className="text-xs text-gray-500 space-y-1 mb-3">
                      <li>1) Send full payment to the number above.</li>
                      <li>2) Use your own number for payment.</li>
                      <li>3) Enter Transaction ID and last 4 digits below.</li>
                    </ol>
                    <div className="space-y-2 ml-1">
                      <label className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bkash"
                          checked={formData.paymentMethod === 'bkash'}
                          onChange={handleChange}
                          className="text-maroon focus:ring-maroon h-4 w-4"
                        />
                        <span className="ml-3 text-sm text-gray-700">bKash</span>
                      </label>
                      <label className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="nagad"
                          checked={formData.paymentMethod === 'nagad'}
                          onChange={handleChange}
                          className="text-maroon focus:ring-maroon h-4 w-4"
                        />
                        <span className="ml-3 text-sm text-gray-700">Nagad</span>
                      </label>
                      <label className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="rocket"
                          checked={formData.paymentMethod === 'rocket'}
                          onChange={handleChange}
                          className="text-maroon focus:ring-maroon h-4 w-4"
                        />
                        <span className="ml-3 text-sm text-gray-700">Rocket</span>
                      </label>
                    </div>
                    {formData.paymentMethod !== 'cod' && (
                      <div className="mt-4 ml-1 space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                            Transaction ID <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="transactionId"
                            value={formData.transactionId}
                            onChange={handleChange}
                            className="border border-gray-200 rounded-xl py-3 px-4 text-sm w-full outline-none focus:border-maroon"
                            placeholder="e.g. 8A7B6C5D"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                            Sender Number (last 4 digits) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="senderLastDigits"
                            value={formData.senderLastDigits}
                            onChange={handleChange}
                            className="border border-gray-200 rounded-xl py-3 px-4 text-sm w-full outline-none focus:border-maroon"
                            placeholder="e.g. 2383"
                            maxLength={4}
                          />
                        </div>
                        <p className="text-xs text-gray-400">You can call admin after payment if needed.</p>
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" /> We'll call you to confirm payment details
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-maroon text-white rounded-xl py-4 w-full font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Placing Order...' : 'Place Order - ৳' + total.toFixed(2)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
