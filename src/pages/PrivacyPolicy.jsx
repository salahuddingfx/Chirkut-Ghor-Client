import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Home } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import Seo from '../components/Seo';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4">
      <Breadcrumb items={[{ label: 'Privacy Policy' }]} />
      <Seo
        title="Privacy Policy | Chirkut Ghor"
        description="Learn how Chirkut Ghor collects, uses, and protects your data when you shop for handmade gifts in Bangladesh."
        path="/privacy-policy"
      />

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-6">Last updated: February 7, 2026</p>

          <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">1. Introduction</h2>
              <p>
                At Chirkut ঘর, we respect your privacy and are committed to protecting your personal data.
                This privacy policy explains how we collect, use, store, and protect your information when you
                visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">2. Information We Collect</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">2.1 Personal Information</h3>
                  <p className="mb-1">We collect personal information that you provide to us, including:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Name and contact information (email, phone number)</li>
                    <li>Billing and shipping addresses</li>
                    <li>Payment information (processed securely through payment gateways)</li>
                    <li>Account credentials (username, password)</li>
                    <li>Purchase history and preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">2.2 Automatically Collected Information</h3>
                  <p className="mb-1">When you visit our website, we automatically collect:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>IP address and browser type</li>
                    <li>Device information and operating system</li>
                    <li>Pages viewed and time spent on our website</li>
                    <li>Referring website addresses</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">3. How We Use Your Information</h2>
              <p className="mb-1">We use your information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders and account</li>
                <li>Send promotional emails and newsletters (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Personalize your shopping experience</li>
                <li>Prevent fraud and enhance security</li>
                <li>Comply with legal obligations</li>
                <li>Analyze website usage and trends</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">4. Information Sharing</h2>
              <p className="mb-1">We do not sell your personal information. We may share your information with:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Service Providers:</strong> Payment processors, shipping companies, and email services</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In case of merger, sale, or acquisition</li>
                <li><strong>With Your Consent:</strong> When you explicitly agree to sharing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">5. Cookies & Tracking Technologies</h2>
              <p className="mb-1">We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Remember your preferences and settings</li>
                <li>Keep you signed in to your account</li>
                <li>Understand how you use our website</li>
                <li>Provide personalized content and recommendations</li>
              </ul>
              <p className="mt-2">
                You can control cookies through your browser settings. However, disabling cookies may affect
                your ability to use certain features of our website.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">6. Data Security</h2>
              <p className="mb-1">
                We implement appropriate technical and organizational measures to protect your personal information
                from unauthorized access, disclosure, alteration, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>SSL encryption for data transmission</li>
                <li>Secure storage of sensitive information</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication protocols</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">7. Your Rights</h2>
              <p className="mb-1">You have the right to:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Objection:</strong> Object to processing of your data</li>
                <li><strong>Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Withdraw Consent:</strong> Opt-out of marketing communications</li>
              </ul>
              <p className="mt-2">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">8. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in
                this privacy policy, unless a longer retention period is required by law. When we no longer need
                your information, we will securely delete or anonymize it.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">9. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy
                practices of these external sites. We encourage you to read their privacy policies before
                providing any personal information.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">10. Children's Privacy</h2>
              <p>
                Our services are not intended for children under 13 years of age. We do not knowingly collect
                personal information from children. If you believe we have collected information from a child,
                please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-2">11. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of significant changes
                by posting a notice on our website or sending you an email. Your continued use of our services
                after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="bg-gray-50 rounded-xl p-5">
              <h2 className="text-base font-bold text-gray-900 mb-3">Contact Us</h2>
              <p className="mb-3">
                If you have any questions about this Privacy Policy or how we handle your data, please contact us:
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

export default PrivacyPolicy;
