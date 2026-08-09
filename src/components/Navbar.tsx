import React, { useState } from 'react';
import { Currency } from '../types';
import { BAKERY_INFO } from '../data/cakes';
import { MessageCircle, ShoppingBag, Menu, X, Heart, Sparkles, ChevronDown } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  onOpenCart: () => void;
  favoriteCount: number;
  onOpenFavorites?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  currency,
  setCurrency,
  onOpenCart,
  favoriteCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'cakes', label: 'Cakes' },
    { id: 'bespoke', label: 'Bespoke' },
    { id: 'about', label: 'About Us' },
    { id: 'reviews', label: 'Reviews' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDirectWhatsApp = () => {
    const defaultMsg = encodeURIComponent(
      `Hello IstyCakes! 🎂✨ I'm visiting your website and would like to inquire about ordering a cake for an upcoming celebration.`
    );
    window.open(`https://wa.me/${BAKERY_INFO.whatsappNumber}?text=${defaultMsg}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFF8F7]/90 backdrop-blur-md border-b border-[#ffd9dd]/60 transition-all duration-300">
      {/* Top micro banner */}
      <div className="bg-[#944552] text-white py-1.5 px-4 text-xs font-medium text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#ffe088]" />
        <span>Freshly baked daily in Lagos • Free pickup &amp; Island/Mainland deliveries available</span>
        <span className="hidden md:inline text-[#ffd9dd]">| Order Hotline: {BAKERY_INFO.phone}</span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          {/* Logo Icon matching Isty Cakes 3-tier chocolate cake mark */}
          <div className="w-10 h-10 rounded-full bg-[#fdf2f4] border border-[#ffd9dd] flex items-center justify-center shadow-sm overflow-hidden p-1 group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#944552]" fill="currentColor">
              {/* Cherry on top */}
              <circle cx="50" cy="18" r="7" fill="#ba1a1a" />
              <circle cx="42" cy="19" r="4" fill="#944552" />
              <circle cx="58" cy="19" r="4" fill="#944552" />
              <path d="M50 14 Q52 6 62 8" stroke="#5a1826" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {/* Tier 1 with drip */}
              <path d="M36 28 C36 24, 64 24, 64 28 L64 36 C64 38, 36 38, 36 36 Z" fill="#944552" />
              <path d="M34 33 C37 38, 41 33, 45 37 C48 40, 52 34, 56 38 C60 34, 63 39, 66 33 L66 30 L34 30 Z" fill="#7a2e3b" />
              {/* Tier 2 with drip */}
              <path d="M28 44 C28 40, 72 40, 72 44 L72 54 C72 56, 28 56, 28 54 Z" fill="#944552" />
              <path d="M26 49 C30 56, 35 49, 41 55 C47 60, 53 50, 59 56 C65 50, 70 57, 74 49 L74 46 L26 46 Z" fill="#7a2e3b" />
              {/* Tier 3 bottom cake tier with deep dripping fudge */}
              <path d="M20 62 C20 58, 80 58, 80 62 L80 76 C80 78, 20 78, 20 76 Z" fill="#944552" />
              <path d="M18 68 C22 78, 28 68, 36 78 C42 85, 48 70, 56 79 C64 71, 70 82, 76 72 C80 69, 82 74, 82 68 L82 64 L18 64 Z" fill="#7a2e3b" />
            </svg>
          </div>
          <div>
            <span className="font-['DM_Serif_Display',serif] text-2xl tracking-tight text-[#944552] block leading-none">
              IstyCakes
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#79545c] block">
              &amp; Surprises
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-sm font-semibold transition-all py-1 relative ${
                activeTab === link.id
                  ? 'text-[#944552]'
                  : 'text-[#534344] hover:text-[#944552]'
              }`}
            >
              {link.label}
              {activeTab === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#944552] rounded-full animate-in fade-in" />
              )}
            </button>
          ))}
        </div>

        {/* Action Controls (Currency, Cart, WhatsApp CTA) */}
        <div className="flex items-center gap-3">
          {/* Currency Toggle */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-full bg-[#fdf2f4] border border-[#ffd9dd] text-[#944552] hover:bg-[#ffd9dd] transition-colors"
              title="Change Currency"
            >
              <span>{currency === 'NGN' ? '₦ NGN' : currency === 'GBP' ? '£ GBP' : '$ USD'}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white rounded-xl shadow-lg border border-[#ffd9dd] py-1 z-50 animate-in fade-in zoom-in-95">
                {(['NGN', 'GBP', 'USD'] as Currency[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCurrency(c);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-[#fdf2f4] flex items-center justify-between ${
                      currency === c ? 'text-[#944552] bg-[#fdf2f4]' : 'text-[#534344]'
                    }`}
                  >
                    <span>{c === 'NGN' ? '₦ Naira' : c === 'GBP' ? '£ Pound' : '$ Dollar'}</span>
                    {currency === c && <span className="w-1.5 h-1.5 rounded-full bg-[#944552]"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cart Icon & Badge */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-[#fdf2f4] text-[#944552] hover:bg-[#ffd9dd] transition-all hover:scale-105"
            title="View Selection Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#944552] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary Order on WhatsApp Button */}
          <button
            onClick={handleDirectWhatsApp}
            className="hidden sm:inline-flex items-center gap-2 bg-[#944552] hover:bg-[#7a2e3b] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all hover:scale-102"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Order on WhatsApp</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#944552] hover:bg-[#fdf2f4] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFF8F7] border-b border-[#ffd9dd] px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top duration-200 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-base font-semibold transition-colors flex items-center justify-between ${
                  activeTab === link.id
                    ? 'bg-[#fdf2f4] text-[#944552] font-bold'
                    : 'text-[#534344] hover:bg-[#fff0ee]'
                }`}
              >
                <span>{link.label}</span>
                {activeTab === link.id && <span className="w-2 h-2 rounded-full bg-[#944552]"></span>}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#ffd9dd]/60 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenCart();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#fdf2f4] text-[#944552] rounded-xl font-semibold text-sm border border-[#ffd9dd]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Your Selection ({cartCount})</span>
            </button>

            <button
              onClick={handleDirectWhatsApp}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#944552] text-white rounded-xl font-semibold text-sm shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat / Order on WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
