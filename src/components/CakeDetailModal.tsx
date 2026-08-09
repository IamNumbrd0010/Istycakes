import React, { useState } from 'react';
import { CakeItem, Currency, CartItem } from '../types';
import { formatPrice, getItemPrice } from '../utils/formatters';
import { X, Plus, Minus, Heart, Star, Sparkles, Check, ShoppingBag, MessageCircle } from 'lucide-react';
import { BAKERY_INFO } from '../data/cakes';

interface CakeDetailModalProps {
  cake: CakeItem | null;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
  isFavorite: boolean;
  onToggleFavorite: (cakeId: string) => void;
}

export const CakeDetailModal: React.FC<CakeDetailModalProps> = ({
  cake,
  currency,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!cake) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('8" (Serves 15–20)');
  const [selectedFlavor, setSelectedFlavor] = useState(
    cake.flavorNotes?.[0] || 'Madagascar Vanilla'
  );
  const [customMessage, setCustomMessage] = useState('');
  const [hasAcrylicTopper, setHasAcrylicTopper] = useState(false);

  // Size multipliers
  const sizeMultipliers: Record<string, number> = {
    '6" (Serves 8–10)': 0.8,
    '8" (Serves 15–20)': 1.0,
    '10" (Serves 25–35)': 1.45,
    '2-Tier Grand (Serves 40+)': 2.1,
  };

  const basePrice = getItemPrice(cake, currency);
  const sizeMultiplier = sizeMultipliers[selectedSize] || 1.0;
  const topperPrice = hasAcrylicTopper ? (currency === 'NGN' ? 4500 : currency === 'GBP' ? 4.5 : 6) : 0;
  const unitPrice = Math.round(basePrice * sizeMultiplier + topperPrice);
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const cartItem: CartItem = {
      cartId: `cake-${cake.id}-${Date.now()}`,
      item: cake,
      quantity,
      selectedSize,
      selectedFlavor,
      customMessage: customMessage.trim() || undefined,
      unitPrice,
      currency,
    };
    onAddToCart(cartItem);
    onClose();
  };

  const handleWhatsAppInquiry = () => {
    const msg = `Hello IstyCakes! 🎂 I'm interested in ordering "${cake.name}" in ${selectedSize} with ${selectedFlavor} flavor.${customMessage ? ` Custom message: "${customMessage}".` : ''} Can you confirm availability?`;
    window.open(`https://wa.me/${BAKERY_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#ffd9dd] relative animate-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 shadow text-[#79545c] hover:text-[#944552] flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Visual */}
        <div className="relative aspect-[16/9] w-full bg-[#FFF8F7] overflow-hidden">
          <img
            src={cake.image}
            alt={cake.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <button
            onClick={() => onToggleFavorite(cake.id)}
            className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center text-[#944552]"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#944552]' : ''}`} />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            {cake.badge && (
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#944552] px-2.5 py-0.5 rounded-md shadow-sm">
                {cake.badge}
              </span>
            )}
            <h2 className="font-['DM_Serif_Display',serif] text-2xl sm:text-3xl mt-1">
              {cake.name}
            </h2>
          </div>
        </div>

        {/* Modal Form Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Description */}
          <p className="text-xs sm:text-sm text-[#534344] leading-relaxed">
            {cake.fullDescription || cake.description}
          </p>

          {/* Size selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#534344]">
              Select Cake Size &amp; Servings
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {Object.keys(sizeMultipliers).map((sizeKey) => {
                const isSelected = selectedSize === sizeKey;
                const adjusted = Math.round(basePrice * sizeMultipliers[sizeKey]);
                return (
                  <button
                    key={sizeKey}
                    onClick={() => setSelectedSize(sizeKey)}
                    className={`p-2.5 rounded-xl border text-center text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#944552] bg-[#fdf2f4] text-[#944552] font-bold ring-1 ring-[#944552]'
                        : 'border-[#ffd9dd] bg-white text-[#534344] hover:bg-[#fffbfb]'
                    }`}
                  >
                    <span className="block truncate">{sizeKey}</span>
                    <span className="block text-[11px] font-bold text-[#944552] mt-1">
                      {formatPrice(adjusted, currency)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Flavor options */}
          {cake.flavorNotes && cake.flavorNotes.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#534344]">
                Preferred Flavor Filling
              </label>
              <div className="flex flex-wrap gap-2">
                {cake.flavorNotes.map((flavor) => (
                  <button
                    key={flavor}
                    onClick={() => setSelectedFlavor(flavor)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                      selectedFlavor === flavor
                        ? 'bg-[#944552] text-white border-[#944552]'
                        : 'bg-white text-[#534344] border-[#ffd9dd] hover:border-[#944552]'
                    }`}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Piped Message on cake */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#534344]">
              Custom Piped Message (Complimentary)
            </label>
            <input
              type="text"
              placeholder="e.g. Happy 25th Birthday Tolu! ♡"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-[#ffd9dd] rounded-xl focus:ring-2 focus:ring-[#944552] focus:outline-none"
            />
          </div>

          {/* Acrylic topper add-on */}
          <div
            onClick={() => setHasAcrylicTopper(!hasAcrylicTopper)}
            className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              hasAcrylicTopper
                ? 'bg-[#fdf2f4] border-[#944552] ring-1 ring-[#944552]'
                : 'bg-white border-[#ffd9dd]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center ${
                  hasAcrylicTopper ? 'bg-[#944552] border-[#944552]' : 'border-gray-300'
                }`}
              >
                {hasAcrylicTopper && <Check className="w-3 h-3 text-white" />}
              </div>
              <div>
                <span className="font-bold text-xs text-[#2b1613]">
                  Add Gold Mirror Acrylic Cake Topper
                </span>
                <p className="text-[10px] text-[#79545c]">
                  "Happy Birthday", "Bride to Be", or Custom Name
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#944552]">
              +{formatPrice(currency === 'NGN' ? 4500 : currency === 'GBP' ? 4.5 : 6, currency)}
            </span>
          </div>

          {/* Quantity & Action Footer */}
          <div className="pt-4 border-t border-[#ffd9dd] flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Quantity selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#534344]">Quantity:</span>
              <div className="flex items-center gap-2 bg-[#fdf2f4] rounded-full p-1 border border-[#ffd9dd]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-full bg-white text-[#944552] flex items-center justify-center hover:bg-[#ffd9dd]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold px-2 text-[#2b1613]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded-full bg-white text-[#944552] flex items-center justify-center hover:bg-[#ffd9dd]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Total & Add Button */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="text-right hidden sm:block">
                <span className="text-[10px] text-[#79545c] block">Total</span>
                <span className="font-['DM_Serif_Display',serif] text-xl font-bold text-[#944552]">
                  {formatPrice(totalPrice, currency)}
                </span>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-[#944552] hover:bg-[#7a2e3b] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Selection ({formatPrice(totalPrice, currency)})</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
