import React, { useState } from 'react';
import { INSTAGRAM_POSTS, BAKERY_INFO } from '../data/cakes';
import { Instagram, Heart, MessageCircle, ExternalLink, X } from 'lucide-react';

export const InstagramGallery = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <section className="instagram-sec">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 36px' }}>
          <span className="badge-tag badge-pink">Follow Our Sweet Journey</span>
          <h2 className="font-serif" style={{ fontSize: '36px', marginTop: '6px' }}>
            Instagram <span className="text-primary" style={{ fontStyle: 'italic' }}>Gallery</span>
          </h2>
          <a
            href={BAKERY_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '700', color: '#944552', marginTop: '6px' }}
          >
            <Instagram size={16} />
            <span>{BAKERY_INFO.instagram}</span>
          </a>
        </div>

        {/* 6 Photo Grid */}
        <div className="ig-grid">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="ig-item"
            >
              <img
                src={post.image}
                alt="IstyCakes Instagram creation"
                referrerPolicy="no-referrer"
              />
              <div className="ig-overlay">
                <Instagram size={20} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', fontWeight: '700' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Heart size={14} fill="#ffffff" /> {post.likes}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MessageCircle size={14} fill="#ffffff" /> {post.comments}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <a
            href={BAKERY_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent"
            style={{ fontSize: '13px', padding: '10px 24px' }}
          >
            <Instagram size={16} />
            <span>View More Creations on Instagram</span>
          </a>
        </div>

        {/* Instagram Post Detail Modal */}
        {selectedPost && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ padding: '0', overflow: 'hidden' }}>
              <button
                onClick={() => setSelectedPost(null)}
                className="modal-close-btn"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              <div style={{ width: '100%', aspectRatio: '1/1', background: '#000000' }}>
                <img
                  src={selectedPost.image}
                  alt="Instagram post"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  referrerPolicy="no-referrer"
                />
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#fdf2f4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#944552' }}>
                      <Instagram size={18} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '700' }}>{BAKERY_INFO.instagram}</h4>
                      <p style={{ fontSize: '11px', color: '#79545c' }}>Lagos, Nigeria</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#79545c' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '700', color: '#944552' }}>
                      <Heart size={15} fill="#944552" /> {selectedPost.likes}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MessageCircle size={15} /> {selectedPost.comments}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '13px', color: '#534344', lineHeight: '1.5' }}>
                  {selectedPost.caption}
                </p>

                <div style={{ paddingTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #ffd9dd' }}>
                  <span style={{ fontSize: '12px', color: '#79545c' }}>Direct message us for cake inquiries</span>
                  <a
                    href={BAKERY_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '13px', fontWeight: '700', color: '#944552', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>Open Instagram</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
