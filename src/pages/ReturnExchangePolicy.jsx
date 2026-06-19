import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Package, AlertTriangle, CheckCircle, Truck, ArrowRight, Shirt } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import Seo from '../components/Seo';

const ReturnExchangePolicy = () => {
  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4">
      <Breadcrumb items={[{ label: 'Return & Exchange' }]} />
      <Seo
        title="Return & Exchange Policy | Chirkut Ghor"
        description="Learn about our return and exchange policy, eligibility criteria, and step-by-step process at Chirkut Ghor."
        path="/return-policy"
      />

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Return & Exchange Policy</h1>
          <p className="text-sm text-gray-500 mb-6">Last updated: February 19, 2026</p>

          <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">1. Return Policy</h2>
              <div className="flex items-start space-x-2.5 bg-gray-50 rounded-xl p-4">
                <Package className="h-4 w-4 text-maroon mt-0.5 shrink-0" />
                <div>
                  <p className="mb-2">You may return items within <span className="font-semibold text-gray-900">7 days</span> of delivery if:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>The item arrived damaged or broken</li>
                    <li>The item is defective or has a manufacturing flaw</li>
                    <li>You received the wrong product entirely</li>
                    <li>The item does not match the product description or images</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">2. Exchange Policy</h2>
              <div className="flex items-start space-x-2.5 bg-gray-50 rounded-xl p-4">
                <RefreshCw className="h-4 w-4 text-maroon mt-0.5 shrink-0" />
                <div>
                  <p className="mb-2">Exchanges are accepted within <span className="font-semibold text-gray-900">5 days</span> of delivery for:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Wrong size received</li>
                    <li>Wrong color received</li>
                    <li>Item does not fit as expected</li>
                  </ul>
                  <p className="mt-2">Exchanges are subject to product availability. If the desired size or color is out of stock, you may opt for a refund instead.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">3. Conditions for Return / Exchange</h2>
              <div className="flex items-start space-x-2.5 bg-gray-50 rounded-xl p-4">
                <CheckCircle className="h-4 w-4 text-maroon mt-0.5 shrink-0" />
                <div>
                  <p className="mb-2">Items must meet the following conditions:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Item must be <span className="font-semibold text-gray-900">unused</span> and in its original condition</li>
                    <li>Original packaging must be intact (box, wrapper, tags)</li>
                    <li>All original tags and labels must still be attached</li>
                    <li>No signs of wear, washing, alteration, or damage caused by the customer</li>
                    <li>Receipt or proof of purchase must be provided</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">4. Return / Exchange Process</h2>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>Contact our support team via phone or email with your order ID and reason</li>
                <li>Share clear photos of the item (especially for damaged/defective claims)</li>
                <li>Our team will review and respond within <span className="font-semibold text-gray-900">24 hours</span></li>
                <li>If approved, you will receive return/exchange instructions and pickup schedule</li>
                <li>Pack the item securely in its original packaging</li>
                <li>Our delivery partner will pick up the item from your address</li>
                <li>Once received and inspected, your refund or exchange will be processed within <span className="font-semibold text-gray-900">3–5 business days</span></li>
              </ol>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">5. Who Pays Shipping?</h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-2.5 bg-gray-50 rounded-xl p-4">
                  <Truck className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Free Return Shipping</p>
                    <p>If the item is damaged, defective, or wrong — we cover the return shipping cost entirely. Our partner will pick up the item at no charge to you.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5 bg-gray-50 rounded-xl p-4">
                  <Truck className="h-4 w-4 text-maroon mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Customer-Paid Shipping</p>
                    <p>For size or color exchanges where the item is not defective, return shipping costs are borne by the customer. The exchange item will be shipped free of charge.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">6. Non-Returnable Items</h2>
              <div className="flex items-start space-x-2.5 bg-gray-50 rounded-xl p-4">
                <AlertTriangle className="h-4 w-4 text-maroon mt-0.5 shrink-0" />
                <div>
                  <p className="mb-2">The following items cannot be returned or exchanged:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Personalized or custom-made items (unless defective)</li>
                    <li>Undergarments and innerwear</li>
                    <li>Items that have been used, worn, washed, or altered</li>
                    <li>Products without original packaging or tags</li>
                    <li>Gift cards and digital products</li>
                    <li>Items marked as "Final Sale" or "Non-Returnable" at purchase</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-gray-50 rounded-xl p-5">
              <h2 className="text-base font-bold text-gray-900 mb-3">Need Help?</h2>
              <p className="mb-3">
                Our support team is here to assist you with returns and exchanges:
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2.5">
                  <Shirt className="h-4 w-4 text-maroon" />
                  <span className="text-sm">Email: salauddinkaderappy@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <ArrowRight className="h-4 w-4 text-maroon" />
                  <span className="text-sm">Phone: +8801851075537</span>
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

export default ReturnExchangePolicy;
