import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Seo from '../components/Seo';
import { Star, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get('/api/reviews');
        setReviews(res.data.reviews || res.data || []);
      } catch {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const renderStars = (count) => (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`h-4 w-4 ${i <= count ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
      ))}
    </span>
  );

  return (
    <>
      <Seo
        title="Customer Reviews | Chirkut Ghor"
        description="Read what our customers say about Chirkut Ghor handmade gifts and surprise boxes."
        path="/reviews"
      />
      <div className="min-h-screen bg-pink-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[{ label: 'Reviews' }]} />

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Customer Reviews</h1>
            <p className="text-sm text-gray-600">See what our customers have to say</p>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="w-8 h-8 border-2 border-maroon border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-gray-500">Loading reviews...</p>
            </div>
          ) : reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {reviews.map((review) => (
                <div key={review._id || review.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Link
                        to={`/product/${review.product?._id || review.productId}`}
                        className="font-bold text-gray-900 text-sm hover:text-maroon transition-colors"
                      >
                        {review.product?.name || review.productName || 'Product'}
                      </Link>
                      <div className="mt-1">{renderStars(review.rating)}</div>
                    </div>
                    <span className="text-xs text-gray-400">
                      {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{review.comment || review.review}</p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <MessageSquare className="h-3 w-3" />
                    <span>{review.user?.name || review.reviewerName || 'Anonymous'}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">No Reviews Yet</h3>
              <p className="text-sm text-gray-500 mb-4">Be the first to share your experience</p>
              <Link to="/shop" className="bg-maroon text-white px-6 py-3 rounded-xl text-sm font-semibold inline-block">
                Browse Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Reviews;
