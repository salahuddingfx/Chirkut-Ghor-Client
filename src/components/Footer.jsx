import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react';
import axios from 'axios';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [socials, setSocials] = useState({ facebookUrl: '', instagramUrl: '', twitterUrl: '' });
  const [contact, setContact] = useState({ contactPhone: '+880 1851-075537', contactEmail: 'chirkutghor@gmail.com' });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get('/api/settings/site');
        setSocials({
          facebookUrl: data.facebookUrl || '',
          instagramUrl: data.instagramUrl || '',
          twitterUrl: data.twitterUrl || '',
        });
        setContact({
          contactPhone: data.contactPhone || '+880 1851-075537',
          contactEmail: data.contactEmail || 'chirkutghor@gmail.com',
        });
      } catch {
        // keep defaults
      }
    };
    fetchSettings();
  }, []);

  const socialLinks = [
    { icon: Facebook, url: socials.facebookUrl, label: 'Facebook' },
    { icon: Instagram, url: socials.instagramUrl, label: 'Instagram' },
    { icon: Twitter, url: socials.twitterUrl, label: 'Twitter' },
  ].filter(s => s.url);

  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="section-container py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/Chirkut-Ghor-logo-icon.png" alt="Chirkut Ghor" className="h-8 w-8 rounded-full object-cover border border-gray-700" />
              <span className="text-lg font-bold text-white">Chirkut ঘর</span>
            </Link>
            <p className="text-sm leading-relaxed mb-5">
              Beautiful handcrafted gifts and heartfelt surprises for every special occasion in Bangladesh.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, url, label }) => (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {[
                ['/shop', 'All Products'],
                ['/shop?category=Jewellery', 'Jewellery'],
                ['/shop?category=Gifts', 'Gifts'],
                ['/shop?category=Chocolates', 'Chocolates'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-sm hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                ['/about', 'About Us'],
                ['/contact', 'Contact'],
                ['/reviews', 'Reviews'],
                ['/help', 'Help Center'],
                ['/track', 'Track Order'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-sm hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <a href={`tel:${contact.contactPhone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{contact.contactPhone}</a>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <a href={`mailto:${contact.contactEmail}`} className="hover:text-white transition-colors">{contact.contactEmail}</a>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Cox's Bazar, Bangladesh-4700</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            © {currentYear} Chirkut ঘর. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap justify-center">
            <Link to="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
            <Link to="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link to="/refund-policy" className="hover:text-gray-300 transition-colors">Refund</Link>
            <Link to="/shipping-policy" className="hover:text-gray-300 transition-colors">Shipping</Link>
            <Link to="/return-policy" className="hover:text-gray-300 transition-colors">Returns</Link>
            <Link to="/cookie-policy" className="hover:text-gray-300 transition-colors">Cookies</Link>
            <Link to="/developer" className="hover:text-gray-300 transition-colors">Developer</Link>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-red-500 fill-current" /> by{' '}
              <Link to="/developer" className="text-gray-300 hover:text-white transition-colors font-medium">
                Salah Uddin
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
