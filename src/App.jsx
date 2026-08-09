import React, { useState, useEffect } from 'react';
import { INITIAL_CAKES, INITIAL_TESTIMONIALS } from './data/cakes';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BespokeBanner } from './components/BespokeBanner';
import { CakesCatalog } from './components/CakesCatalog';
import { BespokeBuilder } from './components/BespokeBuilder';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CustomerReviews } from './components/CustomerReviews';
import { InstagramGallery } from './components/InstagramGallery';
import { AboutSection } from './components/AboutSection';
import { CartCheckout } from './components/CartCheckout';
import { CakeDetailModal } from './components/CakeDetailModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { NotificationToast } from './components/NotificationToast';
import { Footer } from './components/Footer';

export function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState('home');

  // Currency selection: NGN (Nigeria), GBP (UK Diaspora), USD (USA/Intl)
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('istycakes_currency') || 'NGN';
  });

  // Cart items persistence
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('istycakes_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Favorites persistence
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('istycakes_favs');
      return saved ? JSON.parse(saved) : ['cake-vintage-1', 'cake-bento-2'];
    } catch {
      return ['cake-vintage-1', 'cake-bento-2'];
    }
  });

  // Testimonials state
  const [testimonials, setTestimonials] = useState(() => {
    try {
      const saved = localStorage.getItem('istycakes_reviews');
      return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  });

  // Modal for quick customization
  const [selectedCakeForModal, setSelectedCakeForModal] = useState(null);

  // Toast notification message
  const [toastMessage, setToastMessage] = useState(null);

  // LocalStorage synchronizations
  useEffect(() => {
    localStorage.setItem('istycakes_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('istycakes_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('istycakes_favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('istycakes_reviews', JSON.stringify(testimonials));
  }, [testimonials]);

  // Toast notification helper
  const showToast = (msg) => {
    setToastMessage(msg);
  };

  // Cart actions
  const handleAddToCart = (cake) => {
    const defaultPrice = currency === 'NGN' ? cake.priceNGN : currency === 'GBP' ? cake.priceGBP : cake.priceUSD;
    const newItem = {
      cartId: `${cake.id}-${Date.now()}`,
      item: cake,
      quantity: 1,
      selectedSize: cake.availableSizes[0] || '8 Inch Standard',
      selectedFlavor: cake.availableFlavors[0] || 'Vanilla Bean',
      unitPrice: defaultPrice,
    };

    setCartItems((prev) => [...prev, newItem]);
    showToast(`Added "${cake.name}" to your selection tray! 🎂`);
  };

  const handleAddCustomToCart = (bespokeItem) => {
    setCartItems((prev) => [...prev, bespokeItem]);
    showToast(`Your Bespoke ${bespokeItem.item.name} has been added to tray! ✨`);
    setActiveTab('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateQuantity = (cartId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
    showToast('Item removed from selection tray');
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear all items in your selection?')) {
      setCartItems([]);
      showToast('Selection tray cleared');
    }
  };

  // Toggle favorite cake
  const handleToggleFavorite = (cakeId) => {
    setFavorites((prev) => {
      const exists = prev.includes(cakeId);
      if (exists) {
        showToast('Removed cake from your wishlist ❤️');
        return prev.filter((id) => id !== cakeId);
      } else {
        showToast('Added cake to your wishlist! ❤️');
        return [...prev, cakeId];
      }
    });
  };

  // Add new customer review
  const handleAddReview = (newReview) => {
    setTestimonials((prev) => [newReview, ...prev]);
    showToast('Thank you! Your sweet review has been published ⭐');
  };

  return (
    <div className="app-wrapper">
      {/* Site Navigation Header with Currency Selector & Cart Trigger */}
      <Navbar
        activeTab={activeTab}
        onNavClick={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currency={currency}
        onCurrencyChange={setCurrency}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <HeroSection
              onExploreCakes={() => {
                setActiveTab('cakes');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenBespoke={() => {
                setActiveTab('bespoke');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Bespoke Recreate Banner with Before/After Comparison */}
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

export default App;
