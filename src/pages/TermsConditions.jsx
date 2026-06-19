import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Home } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import Seo from '../components/Seo';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4">
      <Breadcrumb items={[{ label: 'Terms & Conditions' }]} />
      <Seo
        title="Terms & Conditions | Chirkut Ghor"
        description="Read the terms and conditions for shopping, delivery, and returns at Chirkut Ghor."
        path="/terms"
      />

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Terms & Conditions</h1>
          <p className="text-sm text-gray-500 mb-6">Last updated: February 7, 2026</p>

          <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">1. Introduction</h2>
              <p>
                Welcome to Chirkut ঘর. These Terms and Conditions govern your use of our website and services.
                By accessing or using our website, you agree to be bound by these terms. If you disagree with
                any part of these terms, please do not use our website.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">2. Use of Website</h2>
              <p className="mb-2">You agree to use our website only for lawful purposes and in a way that does not infringe upon the rights of others. You must not:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Use our website in any way that causes damage to the website or impairs its availability</li>
                <li>Use our website to transmit any harmful or malicious code</li>
                <li>Attempt to gain unauthorized access to our systems or networks</li>
                <li>Collect or harvest any information about other users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">3. Product Information</h2>
              <p>
                We strive to provide accurate product descriptions and images. However, we do not warrant that product
                descriptions or other content on our website are accurate, complete, reliable, current, or error-free.
                Actual product colors may vary slightly from images due to screen settings and lighting conditions.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">4. Orders & Payments</h2>
              <p className="mb-2">When you place an order:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>You must provide accurate and complete information</li>
                <li>We reserve the right to refuse or cancel any order</li>
                <li>Prices are subject to change without notice</li>
                <li>Payment must be received before order processing</li>
                <li>We accept various payment methods as displayed at checkout</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">5. Shipping & Delivery</h2>
              <p className="mb-2">Regarding delivery:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Delivery times are estimates and not guaranteed</li>
                <li>We are not responsible for delays caused by courier services</li>
                <li>Risk of loss passes to you upon delivery to the carrier</li>
                <li>You must inspect packages upon receipt and report damage within 48 hours</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">6. Returns & Refunds</h2>
              <p className="mb-2">Our return policy:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Products can be returned within 7 days of delivery</li>
                <li>Items must be unused and in original packaging</li>
                <li>Personalized items cannot be returned unless defective</li>
                <li>Refunds will be processed within 7-14 business days</li>
                <li>Return shipping costs are the customer's responsibility unless the item is defective</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">7. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, images, and software, is the property
                of Chirkut ঘর or its content suppliers and is protected by copyright laws. You may not reproduce,
                distribute, or create derivative works without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">8. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Chirkut ঘর shall not be liable for any indirect, incidental,
                special, or consequential damages arising from your use of our website or products. Our total liability
                shall not exceed the amount you paid for the product.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">9. Privacy</h2>
              <p>
                Your use of our website is also governed by our Privacy Policy. Please review our{' '}
                <Link to="/privacy-policy" className="text-maroon font-medium">
                  Privacy Policy
                </Link>{' '}
                to understand how we collect, use, and protect your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                posting on our website. Your continued use of our website after changes constitutes acceptance of
                the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">11. Governing Law</h2>
              <p>
                These Terms and Conditions are governed by and construed in accordance with the laws of Bangladesh.
                Any disputes shall be subject to the exclusive jurisdiction of the courts in Dhaka, Bangladesh.
              </p>
            </section>

            <section className="bg-gray-50 rounded-xl p-5">
              <h2 className="text-base font-bold text-gray-900 mb-3">Contact Us</h2>
              <p className="mb-3">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2.5">
                  <Mail className="h-4 w-4 text-maroon" />
                  <span className="text-sm">salauddinkaderappy@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Phone className="h-4 w-4 text-maroon" />
                  <span className="text-sm">+8801851075537</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Home className="h-4 w-4 text-maroon" />
                  <span className="text-sm">Cox's Bazar, Bangladesh-4700</span>
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

export default TermsConditions;
