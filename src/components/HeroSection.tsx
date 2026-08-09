import React from 'react';
import { MessageCircle, ArrowRight, Heart, Sparkles, Star, Award, Clock } from 'lucide-react';
import { BAKERY_INFO } from '../data/cakes';

interface HeroSectionProps {
  onBrowseCakes: () => void;
  onOpenBespoke: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBrowseCakes, onOpenBespoke }) => {
  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Hello IstyCakes! 🎂 I saw your signature cakes on the website and would like to place an order.`
    );
    window.open(`https://wa.me/${BAKERY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Subtle decorative background glow circles */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#ffd9dd]/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#feced7]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdf2f4] border border-[#ffd9dd] text-[#944552] text-xs font-bold uppercase tracking-wider shadow-sm">
            <span>Handcrafted with love</span>
            <Heart className="w-3.5 h-3.5 fill-[#944552] text-[#944552]" />
          </div>

          {/* Main Headline */}
          <h1 className="font-['DM_Serif_Display',serif] text-4xl sm:text-5xl lg:text-6xl text-[#2b1613] leading-[1.12] tracking-tight">
            Life’s Sweetest Moments Deserve{' '}
            <span className="text-[#944552] italic underline decoration-[#ffd9dd] decoration-wavy underline-offset-8">
              the Perfect Cake
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#534344] leading-relaxed max-w-xl">
            From intimate celebrations to once-in-a-lifetime moments, we create stunning cakes that
            taste as good as they look. Baked fresh to order in Lagos with premium ingredients.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
            <button
              onClick={handleWhatsAppOrder}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#944552] hover:bg-[#7a2e3b] text-white font-bold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg shadow-[#944552]/20 hover:shadow-xl transition-all duration-300 hover:scale-102"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Order on WhatsApp</span>
            </button>

            <button
              onClick={onBrowseCakes}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#fdf2f4] border-2 border-[#944552] text-[#944552] font-bold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all duration-300 shadow-sm"
            >
              <span>Browse Cakes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust Highlights Strip */}
          <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#ffd9dd]/60 w-full">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#fdf2f4] flex items-center justify-center text-[#944552]">
                <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#2b1613]">4.9 / 5.0</p>
                <p className="text-[11px] text-[#79545c]">500+ Happy Orders</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#fdf2f4] flex items-center justify-center text-[#944552]">
                <Clock className="w-4 h-4 text-[#944552]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#2b1613]">Fresh Daily</p>
                <p className="text-[11px] text-[#79545c]">Never Frozen</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#fdf2f4] flex items-center justify-center text-[#944552]">
                <Award className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#2b1613]">100% Artisan</p>
                <p className="text-[11px] text-[#79545c]">Custom Crafted</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Cake Visual with Floating Badges */}
        <div className="lg:col-span-6 relative">
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            {/* Background card frame */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ffd9dd] to-[#fff0ee] rounded-[2.5rem] transform rotate-1 scale-98 -z-10 shadow-inner" />

            {/* Main Hero Cake Image Card */}
            <div className="relative rounded-[2rem] overflow-hidden bg-white p-3 shadow-2xl border border-white/80">
              <div className="relative h-[380px] sm:h-[460px] md:h-[520px] rounded-[1.6rem] overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3ehP7VO9AYCb7Ch7TGEqtZ6i4G5DLhCyO8vj5J45gLgQ4BcKvE8Pez6tkQ2nzP1Aq_uB0AtOgGDAjwbhOM5FQLkhI_TbkAig5A0Wk3yX_hLL0Oio11MSliG6y9SDjIgNZDw1uni9jMvn1ZHa57pwMWXscydRR0INsX0dk0X6WDZsgbX71QLMSaQULNzJde3pigj1ccIkd1PaOc9g4lkIW8P1fvCwnyW6Yb36TSxw0B1IJ2Xg43ste3A"
                  alt="IstyCakes signature pink drip birthday cake with gold Happy Birthday topper and fresh floral arrangement"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Gradient overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Tag over image */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-lg flex items-center justify-between border border-white">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#944552]">Signature Creation</span>
                    <h4 className="font-['DM_Serif_Display',serif] text-base text-[#2b1613]">Blush Romance Birthday Tier</h4>
                  </div>
                  <button
                    onClick={onOpenBespoke}
                    className="text-xs font-bold bg-[#944552] text-white px-3.5 py-2 rounded-lg hover:bg-[#7a2e3b] transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <span>Customize</span>
                    <Sparkles className="w-3 h-3 text-[#ffe088]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Floating pill: Gold Quality Badge */}
            <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-3 shadow-xl border border-[#ffd9dd] flex items-center gap-2.5 animate-in fade-in zoom-in duration-500 hidden sm:flex">
              <div className="w-10 h-10 rounded-full bg-[#fdf2f4] flex items-center justify-center text-[#D4AF37]">
                <Sparkles className="w-5 h-5 fill-[#D4AF37]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#2b1613]">Bespoke Designs</p>
                <p className="text-[10px] text-[#79545c]">Recreate Any Pinterest Photo</p>
              </div>
            </div>

            {/* Floating pill: Lagos Fast Delivery */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-3 shadow-xl border border-[#ffd9dd] flex items-center gap-2.5 animate-in fade-in zoom-in duration-500 hidden sm:flex">
              <div className="w-10 h-10 rounded-full bg-[#ffd9dd] flex items-center justify-center text-[#944552]">
                <MessageCircle className="w-5 h-5 fill-[#944552] text-[#944552]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#2b1613]">Instant Chat &amp; Receipt</p>
                <p className="text-[10px] text-[#79545c]">Fast Confirmation on WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
