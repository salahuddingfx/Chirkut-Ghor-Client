import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Facebook, Instagram, Twitter } from 'lucide-react';
import toast from 'react-hot-toast';
import Breadcrumb from '../components/Breadcrumb';
import Seo from '../components/Seo';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-pink-50 py-8 sm:py-12 px-4">
      <Breadcrumb items={[{ label: 'Contact' }]} />
      <Seo
        title="Contact Chirkut Ghor | Gift Shop Support in Bangladesh"
        description="Contact Chirkut Ghor for gift orders, custom surprises, and support. Call, email, or visit our gift shop team in Bangladesh."
        path="/contact"
      />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Get in Touch</h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            We'd love to hear from you! Send us a message about your perfect gift needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {/* Contact Info Cards */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
            <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Phone className="h-6 w-6 text-pink-500" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Call Us</h3>
            <p className="text-xs text-gray-400 mb-3">Mon-Sat: 9AM - 9PM</p>
            <a href="tel:+8801851075537" className="text-sm text-gray-700 font-semibold hover:text-maroon block">
              +880 1851-075537
            </a>
            <a href="tel:+8801570249301" className="text-sm text-gray-700 font-semibold hover:text-maroon block mt-1">
              +880 1570-249301
            </a>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Mail className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Email Us</h3>
            <p className="text-xs text-gray-400 mb-3">We reply within 24 hours</p>
            <a href="mailto:chirkutghor@gmail.com" className="text-sm text-gray-700 font-semibold hover:text-maroon block">
              chirkutghor@gmail.com
            </a>
            <a href="mailto:salauddinkaderappy@gmail.com" className="text-sm text-gray-700 font-semibold hover:text-maroon block mt-1">
              salauddinkaderappy@gmail.com
            </a>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <MapPin className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Visit Us</h3>
            <p className="text-xs text-gray-400 mb-3">Come see our collection</p>
            <p className="text-sm text-gray-700 font-semibold">
              House 23, Road 5<br />
              Cox's Bazar, Bangladesh-4700
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Contact Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-gray-400" />
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-xl py-3 px-4 text-sm w-full outline-none focus:border-maroon"
                  placeholder="Your full name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-xl py-3 px-4 text-sm w-full outline-none focus:border-maroon"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-xl py-3 px-4 text-sm w-full outline-none focus:border-maroon"
                    placeholder="+880 1711-111111"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-xl py-3 px-4 text-sm w-full outline-none focus:border-maroon"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Message *</label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-xl py-3 px-4 text-sm w-full outline-none focus:border-maroon resize-none"
                  rows="4"
                  placeholder="Tell us about your gift requirements..."
                />
              </div>

              <button type="submit" className="bg-maroon text-white rounded-xl py-3 w-full flex items-center justify-center gap-2 font-semibold text-sm">
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Additional Info */}
          <div className="lg:col-span-2 space-y-4">
            {/* Business Hours */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Business Hours</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Monday - Friday</span>
                      <span className="font-medium text-gray-900">9:00 AM - 9:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Saturday</span>
                      <span className="font-medium text-gray-900">10:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Sunday</span>
                      <span className="font-medium text-gray-900">10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-100">
                      <span className="text-gray-500">Holidays</span>
                      <span className="font-medium text-gray-900">Call for availability</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-maroon rounded-2xl p-5 text-white">
              <h3 className="text-lg font-bold mb-2">Follow Us</h3>
              <p className="text-white/70 text-sm mb-5">
                Stay updated with our latest gift collections and special offers
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="w-full h-52 bg-pink-50 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-700">Visit our showroom</p>
                  <p className="text-xs text-gray-400">Cox's Bazar, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
