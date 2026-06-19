import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { Minus, Plus, Trash2, ShoppingBag, ShoppingCart, ArrowRight, Shield, Truck, Star, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useDeliveryCalculation } from '../hooks/useDeliveryCalculation';

const Cart = () => {
  const { cartItems, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { delivery, loading: deliveryLoading, fetchDelivery } = useDeliveryCalculation();

  useEffect(() => {
    if (totalPrice > 0) {
      fetchDelivery(totalPrice, 'Cox\'s Bazar', 'Cox\'s Bazar');
    }
  }, [totalPrice, fetchDelivery]);

  const shipping = delivery?.charge || 0;
  const tax = 0;
  const finalTotal = totalPrice + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-pink-50">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-12 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Your Cart is Empty</h2>
          <p className="text-sm text-gray-500 mb-8">Discover beautiful handcrafted treasures and add them to your cart</p>
          <Link
            to="/shop"
            className="bg-maroon text-white rounded-xl py-3 px-8 font-semibold text-sm inline-flex items-center gap-2"
          >
            <ShoppingBag className="h-4 w-4" />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50">
      <Breadcrumb items={[{ label: 'Cart' }]} />
      {isAuthenticated && (
        <div className="bg-maroon text-white py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span>You're a Lifetime Customer!</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Truck className="h-4 w-4" />
                <span>Free Shipping Above ৳2000</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>Exclusive Member Discounts</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="py-8 sm:py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Your Shopping Cart</h1>
          <p className="text-sm text-gray-500">Review your beautiful selections before checkout</p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Cart Items ({totalItems})</h2>
              <Link
                to="/shop"
                className="text-sm text-gray-500 hover:text-maroon font-medium"
              >
                Continue Shopping
              </Link>
            </div>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={item.image || '/placeholder.jpg'}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl"
                    />
                    {item.discount > 0 && (
                      <div className="absolute -top-2 -right-2 bg-maroon text-white px-2 py-0.5 rounded-full text-xs font-bold">
                        -{item.discount}%
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                      <Link
                        to={`/product/${item.id}`}
                        className="hover:text-maroon line-clamp-2"
                      >
                        {item.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-500">৳{item.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>
                  </div>

                  <div className="w-full sm:hidden flex items-center justify-between gap-2 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="border border-gray-200 rounded-xl p-1.5"
                        title="Decrease quantity"
                      >
                        <Minus className="h-4 w-4 text-gray-600" />
                      </button>
                      <span className="px-3 py-1 bg-gray-50 rounded-xl font-semibold text-gray-900 w-10 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="border border-gray-200 rounded-xl p-1.5"
                        title="Increase quantity"
                      >
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    <p className="text-base font-bold text-gray-900">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 p-1.5"
                      title="Remove from cart"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="hidden sm:flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="border border-gray-200 rounded-xl p-2"
                      title="Decrease quantity"
                    >
                      <Minus className="h-4 w-4 text-gray-600" />
                    </button>
                    <span className="px-4 py-2 bg-gray-50 rounded-xl font-semibold text-gray-900 min-w-[50px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="border border-gray-200 rounded-xl p-2"
                      title="Increase quantity"
                    >
                      <Plus className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>

                  <div className="hidden sm:block text-right min-w-[120px]">
                    <p className="text-lg font-bold text-gray-900 mb-2">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 p-1.5"
                      title="Remove from cart"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Items ({totalItems})</span>
                  <span className="font-semibold text-gray-900">৳{totalPrice.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {shipping === 0 ? 'FREE' : `৳${shipping}`}
                  </span>
                </div>

                <hr className="border-gray-100" />

                <div className="flex justify-between items-center text-base font-bold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">৳{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="bg-maroon text-white rounded-xl py-3 px-4 font-semibold text-sm flex items-center justify-center gap-2 w-full mb-3"
              >
                <span>Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/shop"
                className="border border-gray-200 rounded-xl py-3 px-4 font-medium text-sm flex items-center justify-center gap-2 w-full"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
                <Truck className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm">Free Shipping</h4>
                  <p className="text-xs text-gray-500">On orders over ৳2000</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
                <Shield className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm">Secure Checkout</h4>
                  <p className="text-xs text-gray-500">SSL encrypted payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
