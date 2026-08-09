import React, { useState } from 'react';
import { Star, Quote, MessageSquare, CheckCircle } from 'lucide-react';

export const CustomerReviews = ({
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

  const handleSubmit = (e) => {
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
    <section className="reviews-sec" style={{ paddingTop: isFullPage ? '30px' : '60px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
          <span className="badge-tag badge-pink">Customer Love</span>
          <h2 className="font-serif" style={{ fontSize: '36px', marginTop: '6px' }}>
            What Our <span className="text-primary" style={{ fontStyle: 'italic' }}>Customers Say</span>
          </h2>
          <p style={{ fontSize: '14px', color: '#534344', marginTop: '4px' }}>
            Real reviews from celebratory moments across Lagos and beyond.
          </p>
        </div>

        {/* Review Cards Grid */}
        <div className="reviews-grid">
          {testimonials.map((review) => (
            <div key={review.id} className="review-card">
              <div>
                {/* Reviewer Header */}
                <div className="reviewer-header">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="reviewer-avatar"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-serif" style={{ fontSize: '17px' }}>
                      {review.name}
                    </h4>
                    {/* Star rating */}
                    <div className="stars-row">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          style={{
                            color: i < review.rating ? '#D4AF37' : '#e0d5d7',
                            fill: i < review.rating ? '#D4AF37' : 'none',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Comment text */}
                <p className="review-comment" style={{ marginTop: '14px' }}>
                  "{review.comment}"
                </p>
              </div>

              {/* Bottom Meta & Quote Icon */}
              <div className="review-footer">
                <div>
                  {review.cakeOrdered && (
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#944552', display: 'block' }}>
                      {review.cakeOrdered}
                    </span>
                  )}
                  {review.location && (
                    <span style={{ fontSize: '11px', color: '#79545c' }}>{review.location}</span>
                  )}
                </div>
                <Quote size={28} style={{ color: '#ffd9dd' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Leave Review Action CTA */}
        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-secondary"
            style={{ padding: '10px 24px', fontSize: '13px' }}
          >
            <MessageSquare size={16} />
            <span>Leave Your Own Review</span>
          </button>
        </div>

        {/* Write a Review Modal */}
        {modalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="font-serif" style={{ fontSize: '24px', marginBottom: '4px' }}>
                Share Your Sweet Experience
              </h3>
              <p style={{ fontSize: '13px', color: '#79545c', marginBottom: '20px' }}>
                We cherish every review and use your feedback to craft even better memories.
              </p>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '30px 0' }}>
                  <CheckCircle size={48} style={{ color: '#1EBE5D', margin: '0 auto 12px' }} />
                  <h4 style={{ fontWeight: '700', fontSize: '18px' }}>Thank you for your review!</h4>
                  <p style={{ fontSize: '13px', color: '#534344', marginTop: '4px' }}>Your review has been added to our wall.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chioma N."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="form-group">
                      <label className="form-label">Location / Area</label>
                      <input
                        type="text"
                        placeholder="e.g. Lekki, Lagos"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Cake Ordered</label>
                      <input
                        type="text"
                        placeholder="e.g. Red Velvet 8 inch"
                        value={cakeOrdered}
                        onChange={(e) => setCakeOrdered(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Rating</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          style={{ padding: '2px' }}
                        >
                          <Star
                            size={24}
                            style={{
                              color: star <= rating ? '#D4AF37' : '#d0c4c6',
                              fill: star <= rating ? '#D4AF37' : 'none',
                            }}
                          />
                        </button>
                      ))}
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#944552', marginLeft: '8px' }}>
                        {rating} / 5 Stars
                      </span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Review *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell us about the taste, design, and delivery..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="form-textarea"
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="btn"
                      style={{ color: '#79545c' }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Submit Review
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
