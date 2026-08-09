import React from 'react';
import { Sparkles, ArrowRight, Star, Heart, Clock, ShieldCheck } from 'lucide-react';

export const HeroSection = ({
  onExploreCakes,
  onBespokeOrder,
}) => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Text Column */}
          <div className="hero-text">
            <div className="badge-tag badge-pink" style={{ alignSelf: 'flex-start' }}>
              <Sparkles size={14} className="text-gold" />
              <span>Lagos Premier Artisanal Bakery</span>
            </div>

            <h1 className="hero-title">
              Cakes Baked With Love, <span>Surprises That Delight</span>
            </h1>

            <p className="hero-desc">
              From majestic wedding tiers to trendy vintage Lambeth hearts and gourmet dessert boxes.
              Every creation is handcrafted with real butter, Belgian chocolate, and exquisite artistry.
            </p>

            <div className="hero-ctas">
              <button
                onClick={onExploreCakes}
                className="btn btn-primary"
                style={{ padding: '12px 28px', fontSize: '15px' }}
              >
                <span>Order Cake</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={onBespokeOrder}
                className="btn btn-secondary"
                style={{ padding: '12px 26px', fontSize: '15px' }}
              >
                <Sparkles size={16} />
                <span>Recreate Your Cake</span>
              </button>
            </div>

            <div className="hero-features">
              <div className="hero-feat-item">
                <ShieldCheck size={18} className="text-primary" />
                <span>100% Fresh Daily</span>
              </div>
              <div className="hero-feat-item">
                <Clock size={18} className="text-primary" />
                <span>Fast Lagos Delivery</span>
              </div>
              <div className="hero-feat-item">
                <Star size={18} style={{ color: '#D4AF37', fill: '#D4AF37' }} />
                <span>5.0 Star Rated (500+ Reviews)</span>
              </div>
            </div>
          </div>

          {/* Right Visual Column */}
          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF21262tD1vW80NqWqVf1r270w7yqK-7Z1918xLhL2ZqDkO8F_c4v0_R7V_6bQ1Q3w6bS-C8g7w-K5w-Q9zX4e8R2v7m1w3q=s1600"
                alt="Signature Blush Velvet Celebration Cake"
                className="hero-main-img"
                referrerPolicy="no-referrer"
              />

              {/* Floating Social Badge 1 */}
              <div className="hero-floating-card hero-card-1">
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#fdf2f4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#944552'
                }}>
                  <Heart size={20} fill="#944552" />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#2b1613' }}>
                    100% Handcrafted
                  </div>
                  <div style={{ fontSize: '10px', color: '#79545c' }}>
                    Custom designs &amp; surprise gifts
                  </div>
                </div>
              </div>

              {/* Floating Social Badge 2 */}
              <div className="hero-floating-card hero-card-2">
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} style={{ color: '#D4AF37', fill: '#D4AF37' }} />
                  ))}
                </div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#2b1613' }}>
                  Top Rated in Lekki
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
