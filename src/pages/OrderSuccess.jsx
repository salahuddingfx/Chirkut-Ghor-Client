import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import Seo from '../components/Seo';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');

  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4">
      <Seo
        title="Order Placed Successfully | Chirkut Ghor"
        description="Your order has been placed successfully. Track your order from your dashboard."
        path="/order-success"
      />
      <div className="max-w-lg mx-auto text-center">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h1>
          <p className="text-sm text-gray-500 mb-6">
            Thank you for your purchase. We'll contact you soon to confirm your order.
          </p>

          {orderId && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-xs text-gray-500 mb-1">Your Order ID</p>
              <p className="text-sm font-mono font-semibold text-gray-900">{orderId}</p>
            </div>
          )}

          <div className="bg-pink-50 rounded-xl p-4 mb-6 text-left">
            <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Package className="h-4 w-4 text-maroon" />
              What's Next?
            </h3>
            <ul className="space-y-1.5 text-xs text-gray-600">
              <li>We'll call you to confirm the order</li>
              <li>Your gift will be prepared and shipped</li>
              <li>Track your order from "My Orders" page</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
            <Link
              to="/orders"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-maroon text-white rounded-xl text-sm font-semibold hover:bg-maroon-dark transition-colors"
            >
              My Orders
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
