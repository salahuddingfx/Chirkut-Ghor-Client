import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import SocketProvider from './contexts/SocketContext.jsx';
import AppInitializer from './components/AppInitializer';
import AppLayout from './components/AppLayout';
import ErrorBoundary from './components/ErrorBoundary';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';
import RecentlyViewed from './components/RecentlyViewed';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import OrderTracking from './pages/OrderTracking';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import ContactUs from './pages/ContactUs';
import HelpCenter from './pages/HelpCenter';
import AboutUs from './pages/AboutUs';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import CookiePolicy from './pages/CookiePolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnExchangePolicy from './pages/ReturnExchangePolicy';
import Developer from './pages/Developer';
import OrderSuccess from './pages/OrderSuccess';
import Reviews from './pages/Reviews';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <SocketProvider>
              <AppInitializer>
                <CartProvider>
                  <HelmetProvider>
                    <Router>
                    <Toaster
                      position="top-right"
                      toastOptions={{
                        duration: 3000,
                        style: {
                          background: '#363636',
                          color: '#fff',
                        },
                        success: {
                          duration: 3000,
                          iconTheme: {
                            primary: '#C9A86A',
                            secondary: '#fff',
                          },
                        },
                        error: {
                          duration: 4000,
                          iconTheme: {
                            primary: '#FF0000',
                            secondary: '#fff',
                          },
                        },
                      }}
                    />
                  <ScrollToTop />
                  <RecentlyViewed />
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<AppLayout />}>
                      <Route index element={<Home />} />
                      <Route path="shop" element={<Shop />} />
                      <Route path="product/:id" element={<ProductDetail />} />
                      <Route path="login" element={
                        <PublicRoute>
                          <Login />
                        </PublicRoute>
                      } />
                      <Route path="register" element={
                        <PublicRoute>
                          <Register />
                        </PublicRoute>
                      } />
                      <Route path="forgot-password" element={
                        <PublicRoute>
                          <ForgotPassword />
                        </PublicRoute>
                      } />
                      <Route path="reset-password/:token" element={
                        <PublicRoute>
                          <ResetPassword />
                        </PublicRoute>
                      } />

                      {/* Cart and Checkout - Public (Guest checkout allowed) */}
                      <Route path="cart" element={<Cart />} />
                      <Route path="checkout" element={<Checkout />} />
                      
                      {/* Private Routes */}
                      <Route path="dashboard" element={
                        <PrivateRoute>
                          <Dashboard />
                        </PrivateRoute>
                      } />
                      <Route path="orders" element={
                        <PrivateRoute>
                          <Orders />
                        </PrivateRoute>
                      } />
                      <Route path="wishlist" element={
                        <PrivateRoute>
                          <Wishlist />
                        </PrivateRoute>
                      } />
                      <Route path="contact" element={<ContactUs />} />
                      <Route path="help" element={<HelpCenter />} />
                      <Route path="about" element={<AboutUs />} />
                      <Route path="terms" element={<TermsConditions />} />
                      <Route path="privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="refund-policy" element={<RefundPolicy />} />
                      <Route path="cookie-policy" element={<CookiePolicy />} />
                      <Route path="shipping-policy" element={<ShippingPolicy />} />
                      <Route path="return-policy" element={<ReturnExchangePolicy />} />
                      <Route path="developer" element={<Developer />} />
                      <Route path="order-success" element={<OrderSuccess />} />
                      <Route path="reviews" element={<Reviews />} />
                      <Route path="track/:orderId" element={<OrderTracking />} />
                      <Route path="track" element={<OrderTracking />} />

                      {/* 404 Route */}
                      <Route path="*" element={<NotFound />} />
                    </Route>


                  </Routes>
                    </Router>
                  </HelmetProvider>
                </CartProvider>
            </AppInitializer>
          </SocketProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
