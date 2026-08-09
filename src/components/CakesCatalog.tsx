import React, { useState, useMemo } from 'react';
import { CakeItem, Currency } from '../types';
import { formatPrice, getItemPrice } from '../utils/formatters';
import { Heart, Plus, Sparkles, Filter, Search, Check, Info } from 'lucide-react';

interface CakesCatalogProps {
  cakes: CakeItem[];
  currency: Currency;
  onAddToCart: (cake: CakeItem) => void;
  onQuickCustomize: (cake: CakeItem) => void;
  favorites: string[];
  onToggleFavorite: (cakeId: string) => void;
  isFullPage?: boolean;
}

export const CakesCatalog: React.FC<CakesCatalogProps> = ({
  cakes,
  currency,
  onAddToCart,
  onQuickCustomize,
  favorites,
  onToggleFavorite,
  isFullPage = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');

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
        selectedDietary === 'all' || (cake.dietary && cake.dietary.includes(selectedDietary as any));
      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [cakes, selectedCategory, searchQuery, selectedDietary]);

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isFullPage ? 'py-10' : 'py-14'}`}>
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#944552]">
          Our Collection
        </span>
        <h2 className="font-['DM_Serif_Display',serif] text-3xl sm:text-4xl lg:text-5xl text-[#2b1613]">
          Our <span className="text-[#944552] italic">Perfect Cakes</span>
        </h2>
        <p className="text-[#534344] text-base leading-relaxed">
          Handcrafted with premium ingredients, our cakes are designed to be the perfect centerpiece
          for your most cherished celebrations.
        </p>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="space-y-4 mb-10">
        {/* Category Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#ffd9dd] text-[#944552] border border-[#d97d8a] shadow-sm scale-102'
                  : 'bg-white text-[#534344] border border-[#ffd9dd]/80 hover:bg-[#fdf2f4] hover:text-[#944552]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Dietary filter row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 max-w-4xl mx-auto">
          {/* Search bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#79545c] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search flavor, chocolate, red velvet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-[#ffd9dd] rounded-full focus:outline-none focus:ring-2 focus:ring-[#944552] text-[#2b1613] placeholder-[#79545c]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#79545c] hover:text-[#944552]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Dietary shortcuts */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <span className="text-xs font-semibold text-[#79545c] flex items-center gap-1 shrink-0">
              <Filter className="w-3 h-3" /> Diet:
            </span>
            {[
              { id: 'all', label: 'All' },
              { id: 'vegan', label: 'Vegan' },
              { id: 'eggless', label: 'Eggless' },
            ].map((diet) => (
              <button
                key={diet.id}
                onClick={() => setSelectedDietary(diet.id)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors shrink-0 ${
                  selectedDietary === diet.id
                    ? 'bg-[#944552] text-white border-[#944552]'
                    : 'bg-white text-[#79545c] border-[#ffd9dd] hover:border-[#944552]'
                }`}
              >
                {diet.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cake Grid */}
      {filteredCakes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#ffd9dd] max-w-lg mx-auto p-8 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#fdf2f4] text-[#944552] flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-['DM_Serif_Display',serif] text-xl text-[#2b1613]">No cakes found</h3>
          <p className="text-sm text-[#79545c] mt-1">
            Try adjusting your search or filters to see our sweet creations.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setSelectedDietary('all');
            }}
            className="mt-4 px-5 py-2 bg-[#944552] text-white rounded-full text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCakes.map((cake) => {
            const price = getItemPrice(cake, currency);
            const isFav = favorites.includes(cake.id);

            return (
              <div
                key={cake.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#ffd9dd]/80 shadow-[0_10px_25px_rgba(43,22,19,0.03)] hover:shadow-[0_18px_35px_rgba(148,69,82,0.09)] transition-all duration-300 flex flex-col group hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FFF8F7]">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Badge */}
                  {cake.badge && (
                    <div
                      className={`absolute top-3 left-3 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm ${
                        cake.badge === 'Bestseller'
                          ? 'bg-[#feced7] text-[#944552] border border-[#ffd9dd]'
                          : cake.badge === 'Vegan Available'
                          ? 'bg-[#d8f3dc] text-[#1b4332] border border-[#b7e4c7]'
                          : 'bg-white text-[#944552] border border-[#ffd9dd]'
                      }`}
                    >
                      {cake.badge}
                    </div>
                  )}

                  {/* Favorite Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(cake.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#944552] hover:scale-110 transition-transform shadow"
                    title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-[#944552] text-[#944552]' : 'text-[#79545c]'}`} />
                  </button>

                  {/* Serving size pill */}
                  {cake.servingSize && (
                    <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-0.5 rounded-md">
                      {cake.servingSize}
                    </div>
                  )}
                </div>

                {/* Cake Content Details */}
                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-['DM_Serif_Display',serif] text-lg text-[#2b1613] group-hover:text-[#944552] transition-colors leading-snug">
                        {cake.name}
                      </h3>
                    </div>

                    <p className="text-xs text-[#534344] line-clamp-2 leading-relaxed">
                      {cake.description}
                    </p>

                    {/* Flavor tags */}
                    {cake.flavorNotes && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {cake.flavorNotes.slice(0, 2).map((note, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-[#fdf2f4] text-[#79545c] px-2 py-0.5 rounded"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price and Action Buttons */}
                  <div className="pt-3 border-t border-[#ffd9dd]/60 space-y-2.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-[#79545c]">Starting from</span>
                      <span className="font-['DM_Serif_Display',serif] text-lg font-bold text-[#944552]">
                        {formatPrice(price, currency)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onQuickCustomize(cake)}
                        className="w-full text-xs font-semibold py-2 px-3 rounded-full border border-[#944552] text-[#944552] hover:bg-[#fdf2f4] transition-colors text-center"
                      >
                        Customize
                      </button>

                      <button
                        onClick={() => onAddToCart(cake)}
                        className="w-full text-xs font-bold py-2 px-3 rounded-full bg-[#944552] hover:bg-[#7a2e3b] text-white transition-all duration-200 flex items-center justify-center gap-1 shadow-sm hover:shadow"
                      >
                        <Plus className="w-3.5 h-3.5" />
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
    </section>
  );
};
