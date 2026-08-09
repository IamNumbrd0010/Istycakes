import React from 'react';
import { Cake, Palette, Truck, HeartHandshake } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Cake className="w-6 h-6 text-[#944552]" />,
      title: 'Freshly Baked Daily',
      description: 'Every cake is baked fresh to order for the ultimate moist crumb, authentic flavor, and quality.',
    },
    {
      icon: <Palette className="w-6 h-6 text-[#944552]" />,
      title: 'Custom Designs',
      description: 'Your vision, our creativity. We recreate your dream Pinterest designs with flawless artistry.',
    },
    {
      icon: <Truck className="w-6 h-6 text-[#944552]" />,
      title: 'Fast Delivery',
      description: 'Timely, careful delivery across Lagos Island & Mainland to make your special moments effortless.',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#944552]" />,
      title: 'Premium Ingredients',
      description: 'We use real French butter, pure Belgian chocolate, and organic extracts for unmatched taste.',
    },
  ];

  return (
    <section className="bg-[#FFF8F7] py-14 border-y border-[#ffd9dd]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#944552]">
            Why Choose IstyCakes?
          </span>
          <h2 className="font-['DM_Serif_Display',serif] text-2xl sm:text-3xl text-[#2b1613] mt-1">
            Crafted for <span className="text-[#944552]">Perfection</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-[#ffd9dd] hover:border-[#944552]/40 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center space-y-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#fdf2f4] flex items-center justify-center shadow-inner">
                {feat.icon}
              </div>
              <h3 className="font-['DM_Serif_Display',serif] text-lg text-[#2b1613]">
                {feat.title}
              </h3>
              <p className="text-xs text-[#534344] leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
