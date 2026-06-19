import React from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, Clock, CreditCard, AlertTriangle, CheckCircle, Banknote, Smartphone } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import Seo from '../components/Seo';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4">
      <Breadcrumb items={[{ label: 'Refund Policy' }]} />
      <Seo
        title="Refund Policy | Chirkut Ghor"
        description="Learn about our refund policy, eligibility criteria, and how to request a refund at Chirkut Ghor."
        path="/refund-policy"
      />

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Refund Policy</h1>
          <p className="text-sm text-gray-500 mb-6">Last updated: February 19, 2026</p>

          <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">1. Refund Eligibility</h2>
              <p className="mb-2">You are eligible for a full refund if:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>The product was damaged during delivery</li>
                <li>You received a wrong or defective item</li>
                <li>The product does not match the description on our website</li>
                <li>The item is returned within <span className="font-semibold text-gray-900">7 days</span> of delivery</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">2. Refund Process</h2>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>Contact our support team via phone or email with your order ID and reason for refund</li>
                <li>Our team will review your request within 24 hours</li>
                <li>If approved, you will receive instructions on how to return the item</li>
                <li>Once we receive and inspect the returned item, your refund will be initiated</li>
                <li>You will receive a confirmation notification once the refund is processed</li>
              </ol>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">3. Refund Timeline</h2>
              <div className="flex items-start space-x-2.5 bg-gray-50 rounded-xl p-4">
                <Clock className="h-4 w-4 text-maroon mt-0.5 shrink-0" />
                <div>
                  <p className="mb-1">Refunds are typically processed within <span className="font-semibold text-gray-900">7–10 business days</span> from the date we receive the returned item.</p>
                  <p>For bKash/Nagad payments, refunds may appear within 1–3 business days after processing. Bank transfers may take up to 7 additional business days depending on your bank.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">4. COD Refunds</h2>
              <p className="mb-2">If you paid via Cash on Delivery (COD), your refund will be sent to:</p>
              <div className="flex items-center space-x-2.5 bg-gray-50 rounded-xl p-4">
                <Smartphone className="h-4 w-4 text-maroon shrink-0" />
                <p>Your registered <span className="font-semibold text-gray-900">bKash</span> or <span className="font-semibold text-gray-900">Nagad</span> mobile number. Please ensure your mobile wallet information is up to date when requesting a refund.</p>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">5. Non-Refundable Items</h2>
              <p className="mb-2">The following items are not eligible for refunds:</p>
              <div className="flex items-start space-x-2.5 bg-gray-50 rounded-xl p-4">
                <AlertTriangle className="h-4 w-4 text-maroon mt-0.5 shrink-0" />
                <ul className="list-disc list-inside space-y-1">
                  <li>Personalized or custom-made items (unless defective)</li>
                  <li>Items without original packaging or tags</li>
                  <li>Products that have been used, washed, or altered</li>
                  <li>Gift cards and digital vouchers</li>
                  <li>Items returned after the 7-day window</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">6. Damaged Item Policy</h2>
              <p className="mb-2">If your item arrives damaged:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Take clear photos of the damaged item and packaging immediately upon delivery</li>
                <li>Contact us within <span className="font-semibold text-gray-900">48 hours</span> of delivery</li>
                <li>Do not discard the packaging until instructed by our team</li>
                <li>We will arrange a free pickup or cover return shipping costs</li>
                <li>You may choose a full refund or a replacement item (subject to availability)</li>
              </ul>
            </section>

            <section className="bg-gray-50 rounded-xl p-5">
              <h2 className="text-base font-bold text-gray-900 mb-3">Contact Us</h2>
              <p className="mb-3">
                For any refund-related queries, please contact us:
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2.5">
                  <Banknote className="h-4 w-4 text-maroon" />
                  <span className="text-sm">Refund requests: salauddinkaderappy@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CreditCard className="h-4 w-4 text-maroon" />
                  <span className="text-sm">Payment issues: +8801851075537</span>
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

export default RefundPolicy;
