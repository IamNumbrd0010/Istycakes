import React, { useState } from 'react';
import { Sparkles, Star, CheckCircle2, ArrowLeftRight } from 'lucide-react';

export const BespokeBanner = ({ onStartCustomizing }) => {
  const [activeComparison, setActiveComparison] = useState('split');

  return (
    <section className="bespoke-banner-sec">
      <div className="container">
        <div className="bespoke-banner-card">
          
          {/* Left Column: Copy & Recreate CTA */}
          <div className="bespoke-banner-left">
            <div className="badge-tag badge-gold" style={{ alignSelf: 'flex-start' }}>
              <Star size={13} style={{ fill: '#D4AF37' }} />
              <span>Bespoke Cakes</span>
            </div>

            <h2 className="font-serif" style={{ fontSize: '38px', lineHeight: '1.2' }}>
              Have a cake <span className="text-primary">design in mind?</span>
            </h2>

            <p style={{ fontSize: '16px', color: '#534344', lineHeight: '1.6' }}>
              Bring your Pinterest, Instagram, or personal inspiration to life. We’ll recreate your
              dream cake with exceptional craftsmanship, exact flavor balance, and immaculate floral details.
            </p>

            <div className="bespoke-check-list">
              <div className="bespoke-check-item">
                <CheckCircle2 size={16} className="text-primary" />
                <span>Send any photo, sketch, or moodboard directly</span>
              </div>
              <div className="bespoke-check-item">
                <CheckCircle2 size={16} className="text-primary" />
                <span>Custom tier sizing, bespoke flavors &amp; luxury gold detailing</span>
              </div>
              <div className="bespoke-check-item">
                <CheckCircle2 size={16} className="text-primary" />
                <span>Real-time price breakdown &amp; WhatsApp consultation</span>
              </div>
            </div>

            <div style={{ paddingTop: '8px' }}>
              <button
                onClick={onStartCustomizing}
                className="btn btn-accent"
                style={{ padding: '14px 30px', fontSize: '15px' }}
              >
                <Sparkles size={18} style={{ color: '#ffe088' }} />
                <span>Recreate My Cake</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Comparison (Inspiration vs Creation) */}
          <div>
            {/* View Mode Toggle Controls */}
            <div className="comparison-toggle">
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#79545c', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ArrowLeftRight size={14} /> Compare:
              </span>
              <div className="toggle-pills">
                <button
                  onClick={() => setActiveComparison('split')}
                  className={`toggle-pill-btn ${activeComparison === 'split' ? 'active' : ''}`}
                >
                  Both
                </button>
                <button
                  onClick={() => setActiveComparison('inspiration')}
                  className={`toggle-pill-btn ${activeComparison === 'inspiration' ? 'active' : ''}`}
                >
                  Inspiration
                </button>
                <button
                  onClick={() => setActiveComparison('creation')}
                  className={`toggle-pill-btn ${activeComparison === 'creation' ? 'active' : ''}`}
                >
                  Our Creation
                </button>
              </div>
            </div>

            {/* Comparison Container */}
            <div className="comparison-wrapper">
              {/* Left Image: Pinterest/Social Inspiration */}
              <div
                className={`comparison-img-box ${
                  activeComparison === 'inspiration'
                    ? 'comp-single'
                    : activeComparison === 'creation'
                    ? 'comp-hidden'
                    : 'comp-split-left'
                }`}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqRfYbmtYP-z-mLz_WveebWrAg58toj99hFOgJh_c4rJ6E72buPZBiAkvlwsB0RwAbQCsVW_nrcY5ZdimhkTfXVFR-VsasnhKrDljM6-dxWWVRvT0OVI0fFb6I53bx_G4UgrZrdLUd_joe6ofDadGix4r96LD0VMs87YzdGjvRmzAvbWetTWviojqH-HVjcx9ZldloiSCp9im8qGnclchEsVzmnHZsL2xcvWbNMqm_Sushi4y2EcGBDQ"
                  alt="Customer Inspiration Photo"
                  referrerPolicy="no-referrer"
                />
                <div className="img-label-tag img-label-left">Your Inspiration</div>
              </div>

              {/* Right Image: IstyCakes Recreated Real Cake */}
              <div
                className={`comparison-img-box ${
                  activeComparison === 'creation'
                    ? 'comp-single'
                    : activeComparison === 'inspiration'
                    ? 'comp-hidden'
                    : 'comp-split-right'
                }`}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfp3xKF7ujYvy98XYoyAJzIRX2GWXXyq6EhtA_jYSXHr1HgsaFMorUnnbktUILyYqFHaIfTqsWmu9-kGE3V8Owc-Mm0Dix19gRvKPfIFer4oahdIsBjam74DY1xT0g8_C2veS88I2q5FrrOEgo3aVp_3vTMQBpsBj6m5jJpz7SJtn2Td64QidXDGUfWkacmAWIulkqoMvJ9B46GqKrRcX2vniWo-k9E5LQGEErZfJEu10olhpTzZ5kOg"
                  alt="IstyCakes Real Finished Creation"
                  referrerPolicy="no-referrer"
                />
                <div className="img-label-tag img-label-right">Our Creation ✨</div>
              </div>
            </div>

            <p style={{ textAlign: 'center', fontSize: '12px', color: '#79545c', marginTop: '12px', fontStyle: 'italic' }}>
              Real photo sent by customer Chioma O. &amp; our finished handcrafted wedding tier.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
