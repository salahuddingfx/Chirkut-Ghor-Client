import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSocket } from '../contexts/socketContextBase';

const DEFAULT_BANNERS = [
  {
    id: 1,
    title: 'Handcrafted Excellence',
    subtitle: 'Discover Traditional Bengali Crafts',
    description: 'Each piece tells a story of heritage and craftsmanship',
    bgColor: 'from-maroon via-rose-800 to-pink-900',
    image: '/Chirkut-Ghor-logo-1.png',
    link: '/shop'
  },
  {
    id: 2,
    title: 'Special Gift Combos',
    subtitle: 'Up to 40% Off on Selected Items',
    description: 'Premium handwoven textiles and artisan crafts',
    bgColor: 'from-emerald-700 via-teal-700 to-cyan-800',
    image: '/Chirkut-Ghor-logo-1.png',
    link: '/shop'
  },
  {
    id: 3,
    title: 'Free Delivery Over ৳2000',
    subtitle: 'Fast Delivery Nationwide',
    description: 'Empowering craftspeople across Bangladesh',
    bgColor: 'from-amber-600 via-orange-600 to-red-600',
    image: '/Chirkut-Ghor-logo-1.png',
    link: '/shop'
  }
];

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef(null);
  const { socket } = useSocket() || {};

  const fetchBanners = useCallback(async () => {
    try {
      const response = await axios.get('/api/admin/banners');
      const bannerData = Array.isArray(response.data) ? response.data : (response.data?.banners || response.data?.data || []);
      const fetchedBanners = bannerData.map((banner) => ({
        id: banner._id,
        title: banner.title || 'Banner Title',
        subtitle: banner.subtitle || '',
        description: banner.description || '',
        bgColor: banner.bgColor || 'from-maroon via-rose-800 to-pink-900',
        image: banner.image || '/Chirkut-Ghor-logo-1.png',
        link: banner.link || '#'
      }));
      setBanners(fetchedBanners.length > 0 ? fetchedBanners : DEFAULT_BANNERS);
    } catch {
      setBanners(DEFAULT_BANNERS);
    } finally {
      setLoading(false);
    }
  }, []);

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [banners.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [banners.length, isTransitioning]);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  useEffect(() => {
    if (!socket) return;
    socket.on('banner:created', () => fetchBanners());
    socket.on('banner:updated', () => fetchBanners());
    socket.on('banner:deleted', () => fetchBanners());
    return () => {
      socket.off('banner:created');
      socket.off('banner:updated');
      socket.off('banner:deleted');
    };
  }, [socket, fetchBanners]);

  useEffect(() => {
    if (!isAutoPlaying || isPaused || banners.length <= 1) return;
    timeoutRef.current = setInterval(nextSlide, 4500);
    return () => clearInterval(timeoutRef.current);
  }, [currentSlide, isAutoPlaying, isPaused, nextSlide, banners.length]);

  if (loading) {
    return (
      <div className="relative w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[560px] bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
    );
  }

  if (banners.length === 0) return null;

  return (
    <div
      className="relative w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[560px] overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {banners.map((banner, index) => {
        const isActive = index === currentSlide;

        return (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
            }`}
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-maroon" />

            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-24 -right-24 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] bg-white/[0.02] rounded-full" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center">
                  {/* Text Content */}
                  <div className={`text-center md:text-left transition-all duration-700 delay-200 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-2 sm:mb-3 md:mb-4 leading-tight drop-shadow-lg">
                      {banner.title}
                    </h2>
                    {banner.subtitle && (
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-1.5 sm:mb-2 md:mb-3 font-semibold drop-shadow">
                        {banner.subtitle}
                      </p>
                    )}
                    {banner.description && (
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/70 mb-4 sm:mb-5 md:mb-6 lg:mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
                        {banner.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center md:justify-start">
                      <Link
                        to={banner.link || '/shop'}
                        className="inline-flex items-center gap-1.5 sm:gap-2 bg-white text-gray-900 px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-full font-bold text-xs sm:text-sm md:text-base shadow-xl hover:shadow-2xl transition-all duration-300"
                      >
                        Shop Now
                        <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                      </Link>
                      <Link
                        to="/about"
                        className="inline-flex items-center gap-1.5 sm:gap-2 border-2 border-white/40 text-white px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-full font-bold text-xs sm:text-sm md:text-base hover:bg-white/10 transition-all duration-300"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`hidden md:flex justify-center transition-all duration-700 delay-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}>
                    <div className="relative">
                      <div className="w-48 h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80 bg-white/10 backdrop-blur-sm rounded-2xl lg:rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl rotate-3 transition-transform duration-500">
                        <img
                          src={banner.image}
                          alt={banner.title}
                          className="w-32 h-32 lg:w-44 lg:h-44 xl:w-56 xl:h-56 object-contain drop-shadow-2xl"
                          onError={(e) => {
                            e.target.src = '/Chirkut-Ghor-logo-icon.png';
                          }}
                        />
                      </div>
                      <div className="absolute -top-3 -right-3 lg:-top-4 lg:-right-4 w-12 h-12 lg:w-16 lg:h-16 bg-white/10 rounded-xl lg:rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows - Bottom Right */}
      {banners.length > 1 && (
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 lg:bottom-6 right-3 sm:right-4 md:right-5 lg:right-6 z-20 flex items-center gap-2 sm:gap-3">
          <button
            onClick={prevSlide}
            className="bg-white/20 backdrop-blur-md text-white p-2 sm:p-2.5 md:p-3 rounded-full shadow-xl hover:bg-white/30 transition-all duration-300 border border-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="bg-white/20 backdrop-blur-md text-white p-2 sm:p-2.5 md:p-3 rounded-full shadow-xl hover:bg-white/30 transition-all duration-300 border border-white/20"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>
        </div>
      )}

      {/* Dots + Pause + Counter - Bottom Left */}
      {banners.length > 1 && (
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 lg:bottom-6 left-3 sm:left-4 md:left-5 lg:left-6 z-20 flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-black/20 backdrop-blur-md rounded-full px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 border border-white/10">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index
                    ? 'w-6 sm:w-7 md:w-8 h-1.5 sm:h-2 bg-white shadow-lg'
                    : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
            <span className="text-white/70 text-[10px] sm:text-xs font-bold ml-1 sm:ml-2">{currentSlide + 1}/{banners.length}</span>
          </div>
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="bg-black/20 backdrop-blur-md text-white p-1.5 sm:p-2 rounded-full border border-white/10 hover:bg-black/30 transition-colors"
            aria-label={isAutoPlaying ? 'Pause' : 'Play'}
          >
            {isAutoPlaying ? <Pause className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> : <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default BannerSlider;
