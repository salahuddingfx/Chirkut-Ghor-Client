import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Award, Sparkles, ShoppingBag, Package, CheckCircle, Star, TrendingUp, Globe } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import Seo from '../components/Seo';

const AboutUs = () => {
  const stats = [
    { icon: ShoppingBag, value: '50+', label: 'Products Sold', color: 'bg-amber-50 text-amber-600' },
    { icon: Users, value: '100+', label: 'Happy Customers', color: 'bg-blue-50 text-blue-600' },
    { icon: Award, value: '05+', label: 'Skilled Artisans', color: 'bg-purple-50 text-purple-600' },
    { icon: Star, value: '4.8', label: 'Average Rating', color: 'bg-yellow-50 text-yellow-600' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Crafts',
      description: 'Every product is crafted with love and dedication by skilled artisans who take pride in their work.',
      color: 'bg-pink-50 text-pink-600',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We ensure the highest quality standards in every product, using only authentic materials and traditional techniques.',
      color: 'bg-amber-50 text-amber-600',
    },
    {
      icon: CheckCircle,
      title: 'Customer Satisfaction',
      description: 'Your happiness is our success. We go the extra mile to ensure every customer has an exceptional experience.',
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: Globe,
      title: 'Cultural Heritage',
      description: 'Preserving and promoting Bangladeshi craftsmanship and cultural heritage through authentic handmade products.',
      color: 'bg-blue-50 text-blue-600',
    },
  ];

  const team = [
    {
      name: 'Salah Uddin Kader',
      role: 'Founder & CEO',
      image: 'https://ui-avatars.com/api/?name=Salah+Uddin+Kader&background=8B1538&color=fff&size=200',
      description: 'Visionary leader passionate about promoting Bangladeshi crafts globally.',
    },
    {
      name: 'Artisan Team',
      role: 'Master Craftspeople',
      image: 'https://ui-avatars.com/api/?name=Artisan+Team&background=C9A86A&color=fff&size=200',
      description: 'Skilled artisans keeping traditional Bangladeshi crafts alive through their expertise.',
    },
    {
      name: 'Customer Support',
      role: 'Support Team',
      image: 'https://ui-avatars.com/api/?name=Support+Team&background=2F3645&color=fff&size=200',
      description: 'Dedicated team ensuring every customer has a delightful shopping experience.',
    },
  ];

  return (
    <div className="min-h-screen bg-pink-50">
      <Breadcrumb items={[{ label: 'About Us' }]} />
      <Seo
        title="About Chirkut Ghor | Handmade Gifts in Bangladesh"
        description="Learn about Chirkut Ghor, our artisans, and our mission to deliver handcrafted gifts and surprise boxes across Bangladesh."
        path="/about"
      />

      {/* Hero Section */}
      <section className="bg-maroon text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 px-5 py-2 rounded-xl mb-5">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="font-semibold text-sm">Est. 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5">
              Welcome to Chirkut ঘর
            </h1>
            <p className="text-base sm:text-lg mb-5 text-white/80 leading-relaxed">
              Your destination for beautiful, handcrafted gifts and lifestyle products
            </p>
            <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto mb-8">
              We are passionate about bringing the finest Bangladeshi craftsmanship to your doorstep.
              Every product tells a story of tradition, skill, and love.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-7 py-3 rounded-xl font-bold text-sm"
            >
              <ShoppingBag className="h-4 w-4" />
              Explore Our Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 p-5 text-center"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-pink-50 text-pink-600 px-5 py-2 rounded-xl mb-4">
                <Heart className="h-4 w-4" />
                <span className="font-semibold text-sm">Our Story</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Crafting Memories, One Gift at a Time
              </h2>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
              <div className="space-y-5 text-sm sm:text-base text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-900">Chirkut ঘর</strong> was born from a simple yet powerful vision:
                  to celebrate and preserve the rich heritage of Bangladeshi craftsmanship while making it accessible to everyone.
                </p>
                <p>
                  We started our journey in 2026 with a dream to create a platform where skilled artisans could showcase
                  their talents and customers could find authentic, handcrafted gifts for their loved ones. Every product
                  in our collection is carefully curated and crafted with passion, ensuring that you receive nothing but the best.
                </p>
                <p>
                  From traditional <strong className="text-gray-900">jewellery</strong> to <strong className="text-gray-900">home decor</strong>,
                  from <strong className="text-gray-900">anniversary gifts</strong> to <strong className="text-gray-900">Valentine's Day specials</strong>
                  – we offer a diverse range of products that speak the language of love and celebration.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-r-xl">
                  <p className="text-sm text-gray-700 italic font-medium">
                    "Our mission is not just to sell products, but to help you create lasting memories and express your
                    emotions through thoughtful, handcrafted gifts that carry the essence of Bangladeshi culture."
                  </p>
                </div>
                <p>
                  Today, we're proud to serve thousands of happy customers across Bangladesh, and we continue to grow our
                  collection with new designs and products every season. Thank you for being part of our journey!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 px-5 py-2 rounded-xl mb-4">
              <Award className="h-4 w-4" />
              <span className="font-semibold text-sm">Our Values</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              What We Stand For
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto">
              These core values guide everything we do at Chirkut ঘর
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 p-6"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${value.color}`}>
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-2 rounded-xl mb-4">
              <Users className="h-4 w-4" />
              <span className="font-semibold text-sm">Our Team</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Meet the People Behind Chirkut ঘর
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto">
              Passionate individuals dedicated to bringing you the best
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden text-center"
              >
                <div className="bg-gray-50 pt-6 pb-10 px-6 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full border-4 border-white absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                  />
                </div>
                <div className="pt-14 pb-6 px-5">
                  <h3 className="text-base font-bold text-gray-900 mb-1">{member.name}</h3>
                  <div className="text-xs font-semibold text-amber-600 mb-3 bg-amber-50 inline-block px-3 py-1 rounded-lg">
                    {member.role}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-maroon">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center text-white">
            <Package className="h-12 w-12 mx-auto mb-5 text-yellow-400" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Find the Perfect Gift?
            </h2>
            <p className="text-sm sm:text-base mb-8 text-white/80">
              Browse our extensive collection of handcrafted products and make someone's day special!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 px-7 py-3 rounded-xl font-bold text-sm"
              >
                <ShoppingBag className="h-4 w-4" />
                Shop Now
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-7 py-3 rounded-xl font-bold text-sm border border-white/20"
              >
                <Heart className="h-4 w-4" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
