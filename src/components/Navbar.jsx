import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Globe, Heart, Package, LogOut, LayoutDashboard, Moon, Sun } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const userMenuItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/orders', label: 'My Orders', icon: Package },
    { to: '/wishlist', label: 'Wishlist', icon: Heart },
  ];

  const menuItems = [
    { to: '/', label: t('home') },
    { to: '/shop', label: t('shop') },
    { to: '/wishlist', label: 'Wishlist' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-200 ${
      isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100' : 'bg-white border-b border-gray-100'
    }`}>
      <div className="section-container">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/Chirkut-Ghor-logo-icon.png"
              alt="Chirkut Ghor"
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover border border-gray-200"
            />
            <span className="text-lg sm:text-xl font-bold text-maroon hidden sm:block">Chirkut ঘর</span>
          </Link>

          {/* Search - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gifts..."
                className="input-field pl-10 pr-4 py-2.5 text-sm rounded-full bg-gray-50 border-gray-200 focus:bg-white"
              />
            </form>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button onClick={toggleTheme} className="hidden md:flex p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Toggle theme">
              {isDark ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-gray-500" />}
            </button>

            <button onClick={toggleLanguage} className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-600" aria-label="Switch language">
              <Globe className="h-4 w-4" />
              <span className="uppercase text-xs">{language}</span>
            </button>

            <Link to="/cart" className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-maroon text-white text-[10px] font-bold rounded-full h-4.5 w-4.5 min-w-[18px] h-[18px] flex items-center justify-center leading-none">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-1.5 pr-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-7 h-7 bg-maroon rounded-full flex items-center justify-center">
                    <User className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="hidden lg:block text-sm font-medium text-gray-700">{user.name.split(' ')[0]}</span>
                </button>
                <div className="hidden lg:block absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 translate-y-1 group-hover:translate-y-0">
                  {userMenuItems.map((item) => (
                    <Link key={item.to} to={item.to} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <item.icon className="h-4 w-4 text-gray-400" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  <hr className="my-1.5 border-gray-100" />
                  <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn-primary py-2 px-4 text-sm rounded-full">
                Login
              </Link>
            )}

            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              {isOpen ? <X className="h-5 w-5 text-gray-600" /> : <Menu className="h-5 w-5 text-gray-600" />}
            </button>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1 pb-2.5 pt-0">
          {menuItems.map((item) => (
            <Link key={item.to} to={item.to} className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-maroon hover:bg-pink-50 rounded-full transition-colors">
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 animate-slide-in-left">
            <div className="mb-3">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search gifts..."
                  className="input-field pl-10 py-2.5 text-sm bg-gray-50"
                />
              </form>
            </div>
            <div className="space-y-0.5">
              {menuItems.map((item) => (
                <Link key={item.to} to={item.to} className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-maroon rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              ))}
              {user && userMenuItems.map((item) => (
                <Link key={item.to} to={item.to} className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-maroon rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 px-4 pt-3 mt-2 border-t border-gray-100">
                <button onClick={toggleTheme} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm text-gray-600">
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  <span>{isDark ? 'Light' : 'Dark'}</span>
                </button>
                <button onClick={toggleLanguage} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm text-gray-600">
                  <Globe className="h-4 w-4" />
                  <span className="uppercase text-xs font-medium">{language}</span>
                </button>
              </div>
              {user && (
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1">
                  <LogOut className="h-4 w-4" />
                  <span className="font-medium">Logout</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
