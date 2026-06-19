import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, MapPin, Clock, Package, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import Seo from '../components/Seo';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4">
      <Breadcrumb items={[{ label: 'Shipping Policy' }]} />
      <Seo
        title="Shipping Policy | Chirkut Ghor"
        description="Learn about delivery areas, shipping charges, delivery times, and tracking at Chirkut Ghor."
        path="/shipping-policy"
      />

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Shipping Policy</h1>
          <p className="text-sm text-gray-500 mb-6">Last updated: February 19, 2026</p>

          <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">1. Delivery Areas</h2>
              <div className="flex items-start space-x-2.5 bg-gray-50 rounded-xl p-4">
                <MapPin className="h-4 w-4 text-maroon mt-0.5 shrink-0" />
                <div>
                  <p>We deliver to <span className="font-semibold text-gray-900">all areas across Bangladesh</span>, including:</p>
                  <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                    <li>Dhaka (all zones including Gulshan, Banani, Uttara, Mirpur, etc.)</li>
                    <li>Chittagong, Sylhet, Rajshahi, Khulna, Barishal, Rangpur, Mymensingh</li>
                    <li>All district towns and upazila headquarters</li>
                    <li>Remote and rural areas (additional delivery time may apply)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">2. Shipping Charges</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-semibold text-gray-900">Delivery Location</th>
                      <th className="text-right py-2 font-semibold text-gray-900">Charge</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">Cox's Bazar</td>
                      <td className="text-right py-2 font-medium text-gray-900">৳70</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">Rest of Bangladesh</td>
                      <td className="text-right py-2 font-medium text-gray-900">৳150</td>
                    </tr>
                    <tr>
                      <td className="py-2">Orders above ৳2,500</td>
                      <td className="text-right py-2 font-medium text-green-600">FREE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">3. Delivery Times</h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-2.5 bg-gray-50 rounded-xl p-4">
                  <Truck className="h-4 w-4 text-maroon mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Same-Day Delivery (Dhaka)</p>
                    <p>Orders placed before 2:00 PM on business days within Dhaka city are eligible for same-day delivery. Orders after 2:00 PM will be delivered the next business day.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5 bg-gray-50 rounded-xl p-4">
                  <Clock className="h-4 w-4 text-maroon mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">City Areas (2–3 Business Days)</p>
                    <p>Delivery to major city areas including Chittagong, Sylhet, Rajshahi, Khulna, Barishal, Rangpur, and Mymensingh typically takes 2–3 business days.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5 bg-gray-50 rounded-xl p-4">
                  <Package className="h-4 w-4 text-maroon mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Rural & Remote Areas (3–5 Business Days)</p>
                    <p>Orders to upazila headquarters and rural areas may take 3–5 business days. Remote locations may experience an additional 1–2 days.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">4. Order Tracking</h2>
              <p className="mb-2">Once your order is dispatched:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>You will receive a confirmation SMS with your tracking number</li>
                <li>Track your order status through our website or courier partner's tracking page</li>
                <li>Our delivery partner will call you before delivery to confirm availability</li>
                <li>You can also check your order status from your account dashboard</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">5. Missed Delivery Policy</h2>
              <div className="flex items-start space-x-2.5 bg-gray-50 rounded-xl p-4">
                <AlertCircle className="h-4 w-4 text-maroon mt-0.5 shrink-0" />
                <div>
                  <p className="mb-2">If you are unavailable at the time of delivery:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>The delivery partner will attempt delivery up to <span className="font-semibold text-gray-900">3 times</span></li>
                    <li>You will receive an SMS notification for each attempt</li>
                    <li>You can reschedule by contacting the delivery partner directly</li>
                    <li>If all attempts fail, the order will be returned to us and a full refund will be processed</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">6. Important Notes</h2>
              <div className="flex items-start space-x-2.5 bg-gray-50 rounded-xl p-4">
                <CheckCircle className="h-4 w-4 text-maroon mt-0.5 shrink-0" />
                <ul className="list-disc list-inside space-y-1">
                  <li>Business days exclude weekends (Friday) and public holidays</li>
                  <li>Delivery times are estimates and may vary due to unforeseen circumstances</li>
                  <li>During peak seasons (Eid, Puja, year-end sales), delivery may take 1–2 extra days</li>
                  <li>Please inspect your package at the time of delivery and report any issues immediately</li>
                </ul>
              </div>
            </section>

            <section className="bg-gray-50 rounded-xl p-5">
              <h2 className="text-base font-bold text-gray-900 mb-3">Contact Us</h2>
              <p className="mb-3">
                For shipping-related inquiries, please reach out:
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2.5">
                  <Phone className="h-4 w-4 text-maroon" />
                  <span className="text-sm">+8801851075537</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Truck className="h-4 w-4 text-maroon" />
                  <span className="text-sm">salauddinkaderappy@gmail.com</span>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="text-center">
          <Link to="/" className="border border-gray-200 rounded-xl py-3 px-8 text-sm font-medium text-gray-700 inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
