import React, { useState, useEffect } from 'react';
import { Currency, CakeItem, CartItem, Testimonial } from './types';
import { INITIAL_CAKES, TESTIMONIALS, BAKERY_INFO } from './data/cakes';
import { getItemPrice } from './utils/formatters';

// Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BespokeBanner } from './components/BespokeBanner';
import { CakesCatalog } from './components/CakesCatalog';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CustomerReviews } from './components/CustomerReviews';
import { InstagramGallery } from './components/InstagramGallery';
import { BespokeBuilder } from './components/BespokeBuilder';
import { CartCheckout } from './components/CartCheckout';
import { AboutSection } from './components/AboutSection';
import { CakeDetailModal } from './components/CakeDetailModal';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { NotificationToast } from './components/NotificationToast';

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<string>('home');

  // Currency
  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('istycakes_currency');
    return (saved as Currency) || 'NGN';
  });

  // Cart items
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('istycakes_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('istycakes_favorites');
      return saved ? JSON.parse(saved) : ['blush-romance', 'chocolate-bliss'];
    } catch {
      return ['blush-romance', 'chocolate-bliss'];
    }
  });

  // Testimonials
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem('istycakes_reviews');
      return saved ? JSON.parse(saved) : TESTIMONIALS;
    } catch {
      return TESTIMONIALS;
    }
  });

  // Quick Customize Modal for a specific cake
  const [selectedCakeForModal, setSelectedCakeForModal] = useState<CakeItem | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist currency
  useEffect(() => {
    localStorage.setItem('istycakes_currency', currency);
  }, [currency]);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('istycakes_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem('istycakes_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Persist testimonials
  useEffect(() => {
    localStorage.setItem('istycakes_reviews', JSON.stringify(testimonials));
  }, [testimonials]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3500);
  };

  // Cart operations
  const handleAddToCart = (cake: CakeItem) => {
    const unitPrice = getItemPrice(cake, currency);
    const existingIndex = cartItems.findIndex(
      (item) => item.item.id === cake.id && !item.customDetails && !item.customMessage
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        cartId: `${cake.id}-${Date.now()}`,
        item: cake,
        quantity: 1,
        selectedSize: cake.servingSize || '8" (Serves 15–20)',
        selectedFlavor: cake.flavorNotes?.[0] || 'Madagascar Vanilla',
        unitPrice,
        currency,
      };
      setCartItems((prev) => [...prev, newItem]);
    }
    showToast(`Added "${cake.name}" to your selection tray! 🍰`);
  };

  const handleAddCustomToCart = (cartItem: CartItem) => {
    setCartItems((prev) => [...prev, cartItem]);
    showToast(`Your bespoke custom cake has been added to selection tray! ✨`);
    setActiveTab('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateQuantity = (cartId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
    showToast('Item removed from selection.');
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your selection tray?')) {
      setCartItems([]);
      showToast('Selection tray cleared.');
    }
  };

  const handleToggleFavorite = (cakeId: string) => {
    setFavorites((prev) => {
      const isFav = prev.includes(cakeId);
      const next = isFav ? prev.filter((id) => id !== cakeId) : [...prev, cakeId];
      showToast(isFav ? 'Removed from favorites' : 'Added to favorites ♡');
      return next;
    });
  };

  const handleAddReview = (newRev: Omit<Testimonial, 'id' | 'date'>) => {
    const fullRev: Testimonial = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: 'Just now',
    };
    setTestimonials((prev) => [fullRev, ...prev]);
    showToast('Your review was posted successfully! Thank you for the love. 💖');
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF4F5] text-[#2b1613]">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItemCount}
        currency={currency}
        setCurrency={setCurrency}
        onOpenCart={() => {
          setActiveTab('cart');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        favoriteCount={favorites.length}
      />

      {/* Main Content Area based on activeTab */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <HeroSection
              onBrowseCakes={() => {
                setActiveTab('cakes');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenBespoke={() => {
                setActiveTab('bespoke');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Bespoke Recreate Banner with Before/After Widget */}
            <BespokeBanner
              onStartCustomizing={() => {
                setActiveTab('bespoke');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Featured Collection Showcase */}
            <CakesCatalog
              cakes={INITIAL_CAKES}
              currency={currency}
              onAddToCart={handleAddToCart}
              onQuickCustomize={(cake) => setSelectedCakeForModal(cake)}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />

            {/* Why Choose IstyCakes Features */}
            <WhyChooseUs />

            {/* Customer Testimonials */}
            <CustomerReviews
              testimonials={testimonials.slice(0, 3)}
              onAddReview={handleAddReview}
            />

            {/* Instagram Live Moments Gallery */}
            <InstagramGallery />
          </>
        )}

        {activeTab === 'cakes' && (
          <CakesCatalog
            cakes={INITIAL_CAKES}
            currency={currency}
            onAddToCart={handleAddToCart}
            onQuickCustomize={(cake) => setSelectedCakeForModal(cake)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            isFullPage={true}
          />
        )}

        {activeTab === 'bespoke' && (
          <BespokeBuilder
            currency={currency}
            onAddCustomToCart={handleAddCustomToCart}
          />
        )}

        {activeTab === 'cart' && (
          <CartCheckout
            cartItems={cartItems}
            currency={currency}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onBrowseCakes={() => {
              setActiveTab('cakes');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'about' && (
          <AboutSection
            onOpenBespoke={() => {
              setActiveTab('bespoke');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'reviews' && (
          <CustomerReviews
            testimonials={testimonials}
            onAddReview={handleAddReview}
            isFullPage={true}
          />
        )}
      </main>

      {/* Quick Customize Modal for any catalog cake */}
      {selectedCakeForModal && (
        <CakeDetailModal
          cake={selectedCakeForModal}
          currency={currency}
          onClose={() => setSelectedCakeForModal(null)}
          onAddToCart={(item) => {
            setCartItems((prev) => [...prev, item]);
            showToast(`Added custom "${item.item.name}" to selection! 🍰`);
          }}
          isFavorite={favorites.includes(selectedCakeForModal.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* Floating WhatsApp Action Button with Quick Chat Launcher */}
      <WhatsAppFloatingButton />

      {/* Toast Notification Alert */}
      <NotificationToast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      {/* Website Footer */}
      <Footer
        onNavClick={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onShowToast={showToast}
      />
    </div>
  );
}
