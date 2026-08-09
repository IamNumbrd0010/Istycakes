import React, { useState, useMemo } from 'react';
import { formatPrice, getItemPrice } from '../utils/formatters';
import { Heart, Plus, Search, Filter } from 'lucide-react';

export const CakesCatalog = ({
  cakes,
  currency,
  onAddToCart,
  onQuickCustomize,
  favorites,
  onToggleFavorite,
  isFullPage = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState('all');

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'signature', label: 'Signature' },
    { id: 'wedding', label: 'Wedding & Luxury' },
    { id: 'birthday', label: 'Birthday & Special' },
    { id: 'cupcakes', label: 'Cupcakes' },
    { id: 'pastries', label: 'Pastries & Small Chops' },
  ];

  const filteredCakes = useMemo(() => {
    return cakes.filter((cake) => {
      const matchesCategory = selectedCategory === 'all' || cake.category === selectedCategory;
      const matchesSearch =
        cake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cake.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cake.flavorNotes && cake.flavorNotes.some((fn) => fn.toLowerCase().includes(searchQuery.toLowerCase())));
      const matchesDietary =
        selectedDietary === 'all' || (cake.dietary && cake.dietary.includes(selectedDietary));
      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [cakes, selectedCategory, searchQuery, selectedDietary]);

  return (
    <section className="catalog-sec" style={{ paddingTop: isFullPage ? '30px' : '60px' }}>
      <div className="container">
        {/* Header Section */}
        <div className="catalog-header">
          <span className="badge-tag badge-pink" style={{ alignSelf: 'center' }}>
            Our Collection
          </span>
          <h2 className="font-serif" style={{ fontSize: '38px' }}>
            Our <span className="text-primary" style={{ fontStyle: 'italic' }}>Perfect Cakes</span>
          </h2>
          <p style={{ color: '#534344', fontSize: '15px' }}>
            Handcrafted with premium ingredients, our cakes are designed to be the perfect centerpiece
            for your most cherished celebrations.
          </p>
        </div>

        {/* Filter and Search Controls Bar */}
        <div style={{ marginBottom: '36px' }}>
          {/* Category Pills */}
          <div className="category-filter-row">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Dietary filter row */}
          <div className="search-filter-bar">
            {/* Search bar */}
            <div className="search-box-wrap">
              <Search size={16} className="search-icon-pos" />
              <input
                type="text"
                placeholder="Search flavor, chocolate, red velvet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '11px', color: '#79545c' }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dietary shortcuts */}
            <div className="diet-pills">
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#79545c', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Filter size={12} /> Diet:
              </span>
              {[
                { id: 'all', label: 'All' },
                { id: 'vegan', label: 'Vegan' },
                { id: 'eggless', label: 'Eggless' },
              ].map((diet) => (
                <button
                  key={diet.id}
                  onClick={() => setSelectedDietary(diet.id)}
                  className={`diet-btn ${selectedDietary === diet.id ? 'active' : ''}`}
                >
                  {diet.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cake Grid */}
        {filteredCakes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid #ffd9dd', maxWidth: '480px', margin: '0 auto' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fdf2f4', color: '#944552', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <Search size={24} />
            </div>
            <h3 className="font-serif" style={{ fontSize: '20px' }}>No cakes found</h3>
            <p style={{ fontSize: '13px', color: '#79545c', marginTop: '4px' }}>
              Try adjusting your search or filters to see our sweet creations.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSelectedDietary('all');
              }}
              className="btn btn-primary"
              style={{ marginTop: '16px', padding: '8px 18px', fontSize: '12px' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="cakes-grid">
            {filteredCakes.map((cake) => {
              const price = getItemPrice(cake, currency);
              const isFav = favorites.includes(cake.id);

              return (
                <div key={cake.id} className="cake-card">
                  {/* Image Container */}
                  <div className="cake-card-img-wrap">
                    <img
                      src={cake.image}
                      alt={cake.name}
                      className="cake-card-img"
                      referrerPolicy="no-referrer"
                    />

                    {/* Badge */}
                    {cake.badge && (
                      <div className="cake-badge">
                        {cake.badge}
                      </div>
                    )}

                    {/* Favorite Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(cake.id);
                      }}
                      className="cake-fav-btn"
                      title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                    >
                      <Heart size={16} fill={isFav ? '#944552' : 'none'} color={isFav ? '#944552' : '#79545c'} />
                    </button>

                    {/* Serving size pill */}
                    {cake.servingSize && (
                      <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(0,0,0,0.6)', color: '#ffffff', fontSize: '10px', padding: '2px 8px', borderRadius: '6px' }}>
                        {cake.servingSize}
                      </div>
                    )}
                  </div>

                  {/* Cake Content Details */}
                  <div className="cake-card-body">
                    <div>
                      <h3 className="cake-card-title font-serif">{cake.name}</h3>
                      <p className="cake-card-desc" style={{ marginTop: '6px' }}>{cake.description}</p>

                      {/* Flavor tags */}
                      {cake.flavorNotes && (
                        <div className="cake-flavor-tags" style={{ marginTop: '8px' }}>
                          {cake.flavorNotes.slice(0, 2).map((note, idx) => (
                            <span key={idx} className="flavor-tag">
                              {note}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price and Action Buttons */}
                    <div className="cake-card-footer">
                      <div className="cake-price-row">
                        <span className="price-label">Starting from</span>
                        <span className="price-value">{formatPrice(price, currency)}</span>
                      </div>

                      <div className="cake-action-grid">
                        <button
                          onClick={() => onQuickCustomize(cake)}
                          className="btn btn-secondary"
                          style={{ padding: '8px 12px', fontSize: '12px' }}
                        >
                          Customize
                        </button>

                        <button
                          onClick={() => onAddToCart(cake)}
                          className="btn btn-primary"
                          style={{ padding: '8px 12px', fontSize: '12px' }}
                        >
                          <Plus size={14} />
                          <span>Order Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
