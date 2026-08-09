import React, { useState } from 'react';
import { BAKERY_INFO } from '../data/cakes';
import { Instagram, MessageCircle, Phone, MapPin, Mail, Clock, Heart, Send, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
  onShowToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onShowToast }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    onShowToast('Thank you! You will receive our secret recipes and celebration perks.');
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-[#2b1613] text-[#f8d1cc] pt-16 pb-12 border-t border-[#534344]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#534344]">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#944552] border border-[#ffd9dd]/30 flex items-center justify-center p-1 text-white shadow-md">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="currentColor">
                  <circle cx="50" cy="18" r="7" fill="#ffe088" />
                  <path d="M36 28 C36 24, 64 24, 64 28 L64 36 C64 38, 36 38, 36 36 Z" fill="#ffd9dd" />
                  <path d="M28 44 C28 40, 72 40, 72 44 L72 54 C72 56, 28 56, 28 54 Z" fill="#feced7" />
                  <path d="M20 62 C20 58, 80 58, 80 62 L80 76 C80 78, 20 78, 20 76 Z" fill="#ffffff" />
                </svg>
              </div>
              <div>
                <span className="font-['DM_Serif_Display',serif] text-2xl text-white block leading-none">
                  IstyCakes
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[#d97d8a] block">
                  &amp; Surprises
                </span>
              </div>
            </div>

            <p className="text-xs text-[#f8d1cc]/80 italic">
              "{BAKERY_INFO.tagline}"
            </p>

            <p className="text-xs text-[#f8d1cc]/80 leading-relaxed max-w-sm">
              Artisanal cakes, decadent pastries, and luxury bespoke dessert centerpieces baked fresh to order for life’s most memorable celebrations in Lagos, Nigeria.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={BAKERY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#944552] text-white flex items-center justify-center hover:bg-[#d97d8a] transition-colors"
                title="Follow on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${BAKERY_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-[#1EBE5D] transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
              </a>

              <a
                href={`tel:${BAKERY_INFO.phone}`}
                className="w-8 h-8 rounded-full bg-[#944552] text-white flex items-center justify-center hover:bg-[#d97d8a] transition-colors"
                title="Call hotline"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-['DM_Serif_Display',serif] text-lg text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#f8d1cc]/80">
              <li>
                <button
                  onClick={() => onNavClick('home')}
                  className="hover:text-white hover:underline transition-colors"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('cakes')}
                  className="hover:text-white hover:underline transition-colors"
                >
                  All Cakes Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('bespoke')}
                  className="hover:text-white hover:underline transition-colors"
                >
                  Bespoke Cake Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('about')}
                  className="hover:text-white hover:underline transition-colors"
                >
                  About Our Bakery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('reviews')}
                  className="hover:text-white hover:underline transition-colors"
                >
                  Customer Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Opening Hours & Service (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-['DM_Serif_Display',serif] text-lg text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span>Baking Hours</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-[#f8d1cc]/80">
              <li>{BAKERY_INFO.openingHours.weekdays}</li>
              <li>{BAKERY_INFO.openingHours.saturday}</li>
              <li>{BAKERY_INFO.openingHours.sunday}</li>
              <li className="text-[#D4AF37] font-semibold pt-1">
                ✦ {BAKERY_INFO.openingHours.holidays}
              </li>
            </ul>

            <div className="pt-2 text-xs space-y-1 text-[#f8d1cc]/80">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d97d8a] shrink-0" />
                <span>{BAKERY_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#d97d8a] shrink-0" />
                <span>{BAKERY_INFO.internationalPhone}</span>
              </p>
            </div>
          </div>

          {/* Col 4: Newsletter & Celebration Club (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-['DM_Serif_Display',serif] text-lg text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Sweet Celebrations Club</span>
            </h4>
            <p className="text-xs text-[#f8d1cc]/80 leading-relaxed">
              Subscribe for exclusive seasonal flavors, birthday reminder perks, and priority booking slots.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#534344]/50 border border-[#79545c] rounded-l-xl text-white placeholder-[#f8d1cc]/50 focus:outline-none focus:ring-1 focus:ring-[#944552]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#944552] hover:bg-[#d97d8a] text-white rounded-r-xl text-xs font-bold transition-colors shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-[#25D366] font-medium animate-in fade-in">
                  ✓ Welcome to the family!
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#f8d1cc]/60 gap-4">
          <p>© {new Date().getFullYear()} IstyCakes &amp; Surprises. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Handcrafted with</span>
            <Heart className="w-3.5 h-3.5 fill-[#944552] text-[#944552]" />
            <span>for life’s sweetest moments</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
