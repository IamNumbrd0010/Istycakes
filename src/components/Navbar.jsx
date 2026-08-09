import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Menu, X, Phone, Cake } from 'lucide-react';
import { BAKERY_INFO } from '../data/cakes';

export const Navbar = ({
  activeTab,
  onNavigate,
  cartCount,
  currency,
  onChangeCurrency,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'cakes', label: 'Cakes & Pastries' },
    { id: 'custom', label: 'Bespoke Builder' },
    { id: 'about', label: 'About Us' },
    { id: 'reviews', label: 'Reviews' },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Notification / Announcement Bar */}
      <div className="announcement-bar">
        <div className="container">
          <div className="announcement-inner">
            <div className="announcement-left">
              <span>✨ Freshly baked daily in Lekki Phase 1, Lagos</span>
              <span style={{ opacity: 0.6 }}>•</span>
              <span>🚚 Same-day &amp; scheduled doorstep delivery</span>
            </div>
            <div className="announcement-right">
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Phone size={12} /> {BAKERY_INFO.phone}
              </span>
              <select
                aria-label="Select Currency"
                value={currency}
                onChange={(e) => onChangeCurrency(e.target.value)}
                className="currency-select"
              >
                <option value="NGN">NGN (₦)</option>
                <option value="GBP">GBP (£)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar Header */}
      <header className="site-navbar">
        <div className="container">
          <div className="navbar-inner">
            {/* Brand Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="brand-logo"
            >
              <div className="brand-logo-icon">
                <Cake size={22} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div className="brand-title font-serif">IstyCakes</div>
                <div className="brand-tagline">&amp; Surprises</div>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="nav-links">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`nav-link-btn ${activeTab === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right Action Icons & Cart */}
            <div className="nav-actions">
              <button
                onClick={() => handleNavClick('custom')}
                className="btn btn-accent"
                style={{ fontSize: '13px', padding: '8px 16px' }}
              >
                <Sparkles size={15} />
                <span>Custom Order</span>
              </button>

              <button
                onClick={() => handleNavClick('cart')}
                className="cart-btn"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="mobile-menu-btn"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-list">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={activeTab === item.id ? 'active' : ''}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('cart')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <span>Shopping Tray</span>
              <span className="badge-tag badge-pink">{cartCount} items</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
