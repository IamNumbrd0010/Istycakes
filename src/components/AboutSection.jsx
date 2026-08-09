import React from 'react';
import { BAKERY_INFO } from '../data/cakes';
import { Sparkles, Heart, Award, Clock, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

export const AboutSection = ({ onOpenBespoke }) => {
  return (
    <div className="container" style={{ padding: '40px 20px 70px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
        <span className="badge-tag badge-pink" style={{ marginBottom: '8px' }}>
          Our Story &amp; Craftsmanship
        </span>
        <h1 className="font-serif" style={{ fontSize: '42px', marginTop: '6px' }}>
          Baking Edible <span className="text-primary" style={{ fontStyle: 'italic' }}>Art &amp; Joy</span> in Lagos
        </h1>
        <p style={{ fontSize: '15px', color: '#534344', lineHeight: '1.7', marginTop: '10px' }}>
          Since 2019, IstyCakes &amp; Surprises has transformed birthdays, weddings, anniversaries, and corporate milestones across Lagos with luxury, custom-crafted confectionery.
        </p>
      </div>

      {/* Main Grid: Story & Visual */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '44px',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '40px',
          border: '1px solid #ffd9dd',
          boxShadow: '0 8px 24px rgba(43, 22, 19, 0.05)',
          marginBottom: '50px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <h2 className="font-serif" style={{ fontSize: '28px', color: '#2b1613' }}>
            Where Artistry Meets Pure Flavor
          </h2>
          <p style={{ fontSize: '14px', color: '#534344', lineHeight: '1.7' }}>
            At <strong>IstyCakes</strong>, we believe a celebration cake shouldn’t just look like a museum masterpiece — it must taste overwhelmingly decadent. That's why every sponge is slow-baked from scratch using real French butter, pure Madagascar vanilla beans, imported Belgian cocoa, and velvety Swiss meringue buttercream.
          </p>
          <p style={{ fontSize: '14px', color: '#534344', lineHeight: '1.7' }}>
            Whether you saw a breathtaking 3-tier cake on Pinterest or have a visionary sketch for your daughter's birthday, our team replicates textures, color palettes, wafer-paper florals, and 24K edible gold leaves with astonishing precision.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#2b1613' }}>
              <CheckCircle size={16} className="text-primary" />
              <span><strong>100% Scratch-Baked:</strong> Zero preservatives, artificial box mixes, or frozen sponges.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#2b1613' }}>
              <CheckCircle size={16} className="text-primary" />
              <span><strong>Temperature-Controlled Delivery:</strong> Arrives pristine at your doorstep anywhere in Lagos.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#2b1613' }}>
              <CheckCircle size={16} className="text-primary" />
              <span><strong>Seamless Diaspora Gifting:</strong> Order from the UK, USA, or Canada in GBP/USD for family in Lagos.</span>
            </div>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div
            style={{
              borderRadius: '20px',
              overflow: 'hidden',
              border: '6px solid #fdf2f4',
              boxShadow: '0 12px 30px rgba(148, 69, 82, 0.15)',
              aspectRatio: '4/3',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop"
              alt="Artisanal Bakery Kitchen"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              referrerPolicy="no-referrer"
            />
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '-20px',
              left: '-20px',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '16px 20px',
              boxShadow: '0 10px 25px rgba(43, 22, 19, 0.12)',
              border: '1px solid #ffd9dd',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fdf2f4', color: '#944552', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={22} />
            </div>
            <div>
              <span style={{ fontSize: '16px', fontWeight: '800', color: '#2b1613', display: 'block' }}>
                Lagos Top Artisan Baker
              </span>
              <span style={{ fontSize: '11px', color: '#79545c' }}>
                Featured in top lifestyle publications
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          backgroundColor: '#944552',
          borderRadius: '20px',
          padding: '30px',
          color: '#ffffff',
          textAlign: 'center',
          marginBottom: '50px',
        }}
      >
        <div>
          <span className="font-serif" style={{ fontSize: '38px', fontWeight: '700', color: '#ffd9dd', display: 'block' }}>
            3,500+
          </span>
          <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#f8d1cc' }}>
            Celebration Cakes Baked
          </span>
        </div>

        <div>
          <span className="font-serif" style={{ fontSize: '38px', fontWeight: '700', color: '#ffd9dd', display: 'block' }}>
            99.8%
          </span>
          <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#f8d1cc' }}>
            On-Time Event Delivery
          </span>
        </div>

        <div>
          <span className="font-serif" style={{ fontSize: '38px', fontWeight: '700', color: '#ffd9dd', display: 'block' }}>
            450+
          </span>
          <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#f8d1cc' }}>
            5-Star Glowing Reviews
          </span>
        </div>

        <div>
          <span className="font-serif" style={{ fontSize: '38px', fontWeight: '700', color: '#ffd9dd', display: 'block' }}>
            6+
          </span>
          <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#f8d1cc' }}>
            Years of Sweet Passion
          </span>
        </div>
      </div>

      {/* Studio Location & Hours */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '32px',
          border: '1px solid #ffd9dd',
        }}
      >
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#fdf2f4', color: '#944552', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <MapPin size={22} />
          </div>
          <div>
            <h4 className="font-serif" style={{ fontSize: '18px', marginBottom: '6px' }}>Baking Studio &amp; Pickup</h4>
            <p style={{ fontSize: '13px', color: '#534344', lineHeight: '1.6' }}>
              {BAKERY_INFO.address}
            </p>
            <p style={{ fontSize: '12px', color: '#79545c', marginTop: '6px' }}>
              Free pickup available Monday – Saturday from 9:00 AM.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#fdf2f4', color: '#944552', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Clock size={22} />
          </div>
          <div>
            <h4 className="font-serif" style={{ fontSize: '18px', marginBottom: '6px' }}>Operating Hours</h4>
            <p style={{ fontSize: '13px', color: '#534344', lineHeight: '1.6' }}>
              {BAKERY_INFO.workingHours}
            </p>
            <div style={{ marginTop: '12px' }}>
              <button
                onClick={onOpenBespoke}
                className="btn btn-primary"
                style={{ padding: '8px 18px', fontSize: '12px' }}
              >
                <span>Customize Your Cake</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
