import React, { useState } from 'react';
import { BAKERY_INFO } from '../data/cakes';
import { Cake, Heart, Instagram, Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/formatters';

export const Footer = ({ onNavClick, onShowToast }) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      onShowToast('Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    onShowToast('Welcome to the IstyCakes VIP Confection Club! 🎂');
    setEmailInput('');
  };

  const handleWhatsAppContact = () => {
    const url = getWhatsAppUrl('Hello IstyCakes! I would like to inquire about ordering a cake.');
    window.open(url, '_blank');
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand & Bio */}
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#ffd9dd',
                  color: '#944552',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Cake size={22} />
              </div>
              <span className="font-serif" style={{ fontSize: '24px', color: '#ffffff' }}>
                IstyCakes
              </span>
            </div>

            <p style={{ fontSize: '13px', color: '#c4b0b2', lineHeight: '1.7', marginTop: '4px' }}>
              Lagos's premier artisan bakery specializing in luxury custom cakes, vintage Lambeth piping, and high-fidelity photo recreations baked from scratch with love.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
              <button
                onClick={handleWhatsAppContact}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#25D366',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Chat on WhatsApp"
              >
                <MessageCircle size={18} />
              </button>

              <a
                href={BAKERY_INFO.instagram}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffd9dd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Follow us on Instagram"
              >
                <Instagram size={18} />
              </a>

              <a
                href={`tel:${BAKERY_INFO.phone}`}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffd9dd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Call hotline"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">Explore</h4>
            <div className="footer-links">
              <button onClick={() => onNavClick('home')}>Home Gallery</button>
              <button onClick={() => onNavClick('cakes')}>Full Cake Menu</button>
              <button onClick={() => onNavClick('bespoke')}>Bespoke Cake Builder</button>
              <button onClick={() => onNavClick('reviews')}>Client Testimonials</button>
              <button onClick={() => onNavClick('about')}>About the Bakery</button>
              <button onClick={() => onNavClick('cart')}>Selection Tray / Checkout</button>
            </div>
          </div>

          {/* Col 3: Popular Styles */}
          <div className="footer-col">
            <h4 className="footer-title">Collections</h4>
            <div className="footer-links">
              <button onClick={() => onNavClick('cakes')}>Vintage Lambeth Cakes</button>
              <button onClick={() => onNavClick('cakes')}>Bento &amp; Lunchbox Cakes</button>
              <button onClick={() => onNavClick('cakes')}>Wedding &amp; Tiered Cakes</button>
              <button onClick={() => onNavClick('cakes')}>Velvet Birthday Cakes</button>
              <button onClick={() => onNavClick('bespoke')}>Photo Recreate Studio</button>
            </div>
          </div>

          {/* Col 4: Contact & VIP Newsletter */}
          <div className="footer-col">
            <h4 className="footer-title">Contact &amp; Studio</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#c4b0b2' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={16} style={{ color: '#ffd9dd', flexShrink: 0, marginTop: '2px' }} />
                <span>{BAKERY_INFO.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} style={{ color: '#ffd9dd', flexShrink: 0 }} />
                <span>{BAKERY_INFO.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} style={{ color: '#ffd9dd', flexShrink: 0 }} />
                <span>{BAKERY_INFO.email}</span>
              </div>
            </div>

            {/* VIP Club Subscribe */}
            <div style={{ marginTop: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#ffffff', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>
                Join the VIP Sweet Club
              </span>
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="email"
                  placeholder="Your email address..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '9999px',
                    padding: '8px 14px',
                    fontSize: '12px',
                    color: '#ffffff',
                    outline: 'none',
                    flex: 1,
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#944552',
                    color: '#ffffff',
                    borderRadius: '9999px',
                    width: '34px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Send size={14} />
                </button>
              </form>
              {subscribed && (
                <span style={{ fontSize: '11px', color: '#8ce99a', marginTop: '4px', display: 'block' }}>
                  ✓ You’re on the VIP birthday list!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} IstyCakes &amp; Surprises. All rights reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Handcrafted with</span>
            <Heart size={14} style={{ color: '#ffd9dd', fill: '#ffd9dd' }} />
            <span>for life’s sweetest moments in Lagos</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
