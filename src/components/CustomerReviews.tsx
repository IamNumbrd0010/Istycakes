import React, { useState } from 'react';
import { Testimonial } from '../types';
import { Star, Quote, Plus, CheckCircle, MessageSquare } from 'lucide-react';

interface CustomerReviewsProps {
  testimonials: Testimonial[];
  onAddReview: (review: Omit<Testimonial, 'id' | 'date'>) => void;
  isFullPage?: boolean;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({
  testimonials,
  onAddReview,
  isFullPage = false,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [cakeOrdered, setCakeOrdered] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    onAddReview({
      name: name.trim(),
      location: location.trim() || 'Lagos, Nigeria',
      rating,
      comment: comment.trim(),
      cakeOrdered: cakeOrdered.trim() || 'Custom IstyCakes Order',
      avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?auto=format&fit=crop&w=200&q=80`,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setName('');
      setLocation('');
      setComment('');
      setCakeOrdered('');
      setRating(5);
    }, 1800);
  };

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isFullPage ? 'py-12' : 'py-16'}`}>
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#944552]">
          Customer Love
        </span>
        <h2 className="font-['DM_Serif_Display',serif] text-3xl sm:text-4xl text-[#2b1613]">
          What Our <span className="text-[#944552] italic">Customers Say</span>
        </h2>
        <p className="text-sm text-[#534344]">
          Real reviews from celebratory moments across Lagos and beyond.
        </p>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_8px_20px_rgba(43,22,19,0.04)] border border-[#ffd9dd] flex flex-col justify-between relative hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
          >
            <div className="space-y-4">
              {/* Reviewer Header */}
              <div className="flex items-center gap-3.5">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#ffd9dd]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-['DM_Serif_Display',serif] text-base text-[#2b1613]">
                    {review.name}
                  </h4>
                  {/* Star rating */}
                  <div className="flex items-center gap-1 mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Comment text */}
              <p className="text-xs sm:text-sm text-[#534344] leading-relaxed italic relative z-10">
                "{review.comment}"
              </p>
            </div>

            {/* Bottom Meta & Decorative Quote Icon */}
            <div className="pt-4 mt-4 border-t border-[#ffd9dd]/50 flex items-center justify-between">
              <div>
                {review.cakeOrdered && (
                  <span className="text-[11px] font-semibold text-[#944552] block">
                    {review.cakeOrdered}
                  </span>
                )}
                {review.location && (
                  <span className="text-[10px] text-[#79545c]">{review.location}</span>
                )}
              </div>
              <Quote className="w-8 h-8 text-[#ffd9dd] group-hover:text-[#feced7] transition-colors shrink-0" />
            </div>
          </div>
        ))}
      </div>

      {/* Leave Review Action CTA */}
      <div className="text-center mt-10">
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 text-xs font-bold px-6 py-3 rounded-full bg-white border border-[#944552] text-[#944552] hover:bg-[#fdf2f4] transition-all shadow-sm"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Leave Your Own Review</span>
        </button>
      </div>

      {/* Write a Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#ffd9dd] relative animate-in zoom-in-95">
            <h3 className="font-['DM_Serif_Display',serif] text-2xl text-[#2b1613] mb-1">
              Share Your Sweet Experience
            </h3>
            <p className="text-xs text-[#79545c] mb-5">
              We cherish every review and use your feedback to craft even better memories.
            </p>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle className="w-12 h-12 text-[#1EBE5D] mx-auto animate-bounce" />
                <h4 className="font-bold text-[#2b1613]">Thank you for your love!</h4>
                <p className="text-xs text-[#534344]">Your review has been added to our wall.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#534344] uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chioma N."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-[#ffd9dd] rounded-xl focus:ring-2 focus:ring-[#944552] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#534344] uppercase mb-1">
                      Location / Area
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lekki, Lagos"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm border border-[#ffd9dd] rounded-xl focus:ring-2 focus:ring-[#944552] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#534344] uppercase mb-1">
                      Cake Ordered
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Red Velvet 8"
                      value={cakeOrdered}
                      onChange={(e) => setCakeOrdered(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm border border-[#ffd9dd] rounded-xl focus:ring-2 focus:ring-[#944552] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#534344] uppercase mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 text-[#D4AF37] hover:scale-125 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating ? 'fill-[#D4AF37]' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-[#944552] ml-2">{rating} / 5 Stars</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#534344] uppercase mb-1">
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us about the taste, design, and delivery..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-[#ffd9dd] rounded-xl focus:ring-2 focus:ring-[#944552] focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#79545c] hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 text-xs font-bold bg-[#944552] text-white rounded-full hover:bg-[#7a2e3b] shadow-md"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
