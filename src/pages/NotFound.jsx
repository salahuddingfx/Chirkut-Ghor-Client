import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, Package, Gift, HelpCircle, ShoppingBag, User } from 'lucide-react';

const NotFound = () => {
  const [float, setFloat] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFloat(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4 overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(2deg); }
          50% { transform: translateY(-8px) rotate(-1deg); }
          75% { transform: translateY(-20px) rotate(1deg); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes fadeSlideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-slow { animation: floatSlow 3s ease-in-out infinite; }
        .animate-bounce-in { animation: bounceIn 0.8s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.6s ease-out forwards; }
        .animate-pulse-slow { animation: pulse 2s ease-in-out infinite; }
        .animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
        .animate-fade-slide-up { animation: fadeSlideUp 0.5s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

      <div className="text-center max-w-lg relative">
        {/* Floating decorative elements */}
        <div className="absolute -top-16 -left-8 opacity-20">
          <Package className="h-12 w-12 text-maroon animate-float" />
        </div>
        <div className="absolute -top-10 -right-4 opacity-15">
          <Search className="h-8 w-8 text-maroon animate-float-slow" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute bottom-20 -left-12 opacity-10">
          <div className="w-16 h-16 border-4 border-maroon rounded-full animate-pulse-slow" />
        </div>
        <div className="absolute top-1/2 -right-16 opacity-10">
          <div className="w-10 h-10 bg-maroon rounded-xl animate-wiggle" />
        </div>

        {/* 404 Number */}
        <div className="animate-bounce-in opacity-0">
          <h1 className="text-8xl sm:text-9xl font-black text-maroon/10 select-none relative">
            404
            <span className="absolute inset-0 flex items-center justify-center text-maroon animate-pulse-slow">
              404
            </span>
          </h1>
        </div>

        {/* Broken gift box illustration */}
        <div className="animate-fade-slide-up opacity-0 delay-200 -mt-8 mb-6">
          <div className="relative inline-block">
            <div className={`transition-all duration-1000 ${float ? 'animate-float' : 'opacity-0'}`}>
              <Gift className="h-16 w-16 sm:h-20 sm:w-20 text-maroon/30" />
            </div>
            <div className="absolute -top-2 -right-2 animate-wiggle">
              <HelpCircle className="h-7 w-7 text-maroon/50" />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="animate-fade-slide-up opacity-0 delay-300">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Oops! Gift not found</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-sm mx-auto">
            This page seems to have vanished like a surprise gift.
            Don't worry, let's get you back on track!
          </p>
        </div>

        {/* Quick Links */}
        <div className="animate-fade-slide-up opacity-0 delay-400">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { to: '/', label: 'Home', icon: Home },
                { to: '/shop', label: 'Shop', icon: ShoppingBag },
                { to: '/dashboard', label: 'Dashboard', icon: User },
                { to: '/track', label: 'Track Order', icon: Package },
              ].map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-maroon/5 hover:border-maroon/20 border border-transparent text-sm font-medium text-gray-700 hover:text-maroon transition-all"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="animate-fade-slide-up opacity-0 delay-500 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto bg-maroon text-white rounded-xl py-3 px-6 text-sm font-semibold inline-flex items-center justify-center gap-2 hover:bg-maroon-dark transition-colors"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto border border-gray-200 rounded-xl py-3 px-6 text-sm font-medium text-gray-700 inline-flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
