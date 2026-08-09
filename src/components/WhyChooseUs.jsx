import React from 'react';
import { Cake, Palette, Truck, HeartHandshake } from 'lucide-react';

export const WhyChooseUs = () => {
  const features = [
    {
      icon: <Cake size={26} />,
      title: 'Freshly Baked Daily',
      description: 'Every cake is baked fresh to order for the ultimate moist crumb, authentic flavor, and quality.',
    },
    {
      icon: <Palette size={26} />,
      title: 'Custom Designs',
      description: 'Your vision, our creativity. We recreate your dream Pinterest designs with flawless artistry.',
    },
    {
      icon: <Truck size={26} />,
      title: 'Fast Delivery',
      description: 'Timely, careful delivery across Lagos Island & Mainland to make your special moments effortless.',
    },
    {
      icon: <HeartHandshake size={26} />,
      title: 'Premium Ingredients',
      description: 'We use real French butter, pure Belgian chocolate, and organic extracts for unmatched taste.',
    },
  ];

  return (
    <section className="why-us-sec">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="badge-tag badge-pink">Why Choose IstyCakes?</span>
          <h2 className="font-serif" style={{ fontSize: '32px', marginTop: '6px' }}>
            Crafted for <span className="text-primary">Perfection</span>
          </h2>
        </div>

        <div className="features-grid">
          {features.map((feat, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-box">{feat.icon}</div>
              <h3 className="font-serif" style={{ fontSize: '18px' }}>
                {feat.title}
              </h3>
              <p style={{ fontSize: '13px', color: '#534344', lineHeight: '1.5' }}>
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
