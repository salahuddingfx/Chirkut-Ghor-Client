import React from 'react';
import { Link } from 'react-router-dom';
import { Cookie, Shield, BarChart3, Megaphone, Settings, Globe, Info } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import Seo from '../components/Seo';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4">
      <Breadcrumb items={[{ label: 'Cookie Policy' }]} />
      <Seo
        title="Cookie Policy | Chirkut Ghor"
        description="Understand how Chirkut Ghor uses cookies to improve your browsing experience and how you can manage them."
        path="/cookie-policy"
      />

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Cookie Policy</h1>
          <p className="text-sm text-gray-500 mb-6">Last updated: February 19, 2026</p>

          <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">1. What Are Cookies?</h2>
              <div className="flex items-start space-x-2.5 bg-gray-50 rounded-xl p-4">
                <Cookie className="h-4 w-4 text-maroon mt-0.5 shrink-0" />
                <p>
                  Cookies are small text files stored on your device when you visit our website. They help us
                  recognize your browser, remember your preferences, and improve your overall shopping experience.
                  Cookies do not contain personally identifiable information.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">2. Types of Cookies We Use</h2>

              <div className="space-y-3">
                <div className="flex items-start space-x-2.5 bg-gray-50 rounded-xl p-4">
                  <Shield className="h-4 w-4 text-maroon mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Essential Cookies</p>
                    <p>These are necessary for the website to function properly. They enable core features like shopping cart, checkout, and account authentication. You cannot opt out of these cookies as the website would not work without them.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5 bg-gray-50 rounded-xl p-4">
                  <BarChart3 className="h-4 w-4 text-maroon mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Analytics Cookies</p>
                    <p>These help us understand how visitors interact with our website by collecting information like pages visited, time spent, and any errors encountered. This data helps us improve our website performance and user experience.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5 bg-gray-50 rounded-xl p-4">
                  <Megaphone className="h-4 w-4 text-maroon mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Marketing Cookies</p>
                    <p>These are used to deliver relevant advertisements and track the effectiveness of our marketing campaigns. They help us show you products and offers that match your interests across our website and third-party platforms.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">3. How We Use Cookies</h2>
              <p className="mb-2">We use cookies to:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Keep your shopping cart items saved during your session</li>
                <li>Remember your login status and account preferences</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized product recommendations</li>
                <li>Prevent fraudulent activities and enhance security</li>
                <li>Measure the effectiveness of our promotional campaigns</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">4. Third-Party Cookies</h2>
              <div className="flex items-start space-x-2.5 bg-gray-50 rounded-xl p-4">
                <Globe className="h-4 w-4 text-maroon mt-0.5 shrink-0" />
                <div>
                  <p className="mb-2">Some cookies on our site are placed by third-party services including:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><span className="font-semibold text-gray-900">Google Analytics</span> – for website usage analysis</li>
                    <li><span className="font-semibold text-gray-900">Facebook Pixel</span> – for marketing and retargeting</li>
                    <li><span className="font-semibold text-gray-900">Payment Gateways</span> – for secure transaction processing</li>
                  </ul>
                  <p className="mt-2">These third parties may use cookies according to their own privacy policies. We recommend reviewing their policies for more information.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">5. Managing Cookies</h2>
              <div className="flex items-start space-x-2.5 bg-gray-50 rounded-xl p-4">
                <Settings className="h-4 w-4 text-maroon mt-0.5 shrink-0" />
                <div>
                  <p className="mb-2">You can manage your cookie preferences through:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Your browser settings (Chrome, Firefox, Safari, Edge)</li>
                    <li>Our cookie consent banner displayed on your first visit</li>
                    <li>Opt-out links provided by third-party analytics tools</li>
                  </ul>
                  <p className="mt-2">Please note that disabling certain cookies may affect website functionality and your shopping experience.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">6. GDPR Compliance</h2>
              <div className="flex items-start space-x-2.5 bg-gray-50 rounded-xl p-4">
                <Info className="h-4 w-4 text-maroon mt-0.5 shrink-0" />
                <p>
                  We comply with applicable data protection regulations. You have the right to accept or reject
                  non-essential cookies. We will not use marketing or analytics cookies without your explicit
                  consent. For users in the EU, you can exercise your data protection rights by contacting us
                  directly. We are committed to protecting your privacy and handling your data transparently.
                </p>
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

export default CookiePolicy;
