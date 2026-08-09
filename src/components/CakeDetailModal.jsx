import React, { useState } from 'react';
import { formatPrice } from '../utils/formatters';
import { X, Heart, ShoppingBag, Check, Plus, Minus, Clock, Sparkles } from 'lucide-react';

export const CakeDetailModal = ({
  cake,
  currency,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}) => {
  const [selectedSize, setSelectedSize] = useState(cake.availableSizes[0] || '8 Inch Standard (Feeds 15–20)');
  const [selectedFlavor, setSelectedFlavor] = useState(cake.availableFlavors[0] || 'Vanilla Bean Infused');
  const [customMessage, setCustomMessage] = useState('');
  const [hasAcrylicTopper, setHasAcrylicTopper] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Size multiplier
  const sizeMultiplier =
    selectedSize.includes('6 Inch')
      ? 0.8
      : selectedSize.includes('8 Inch')
      ? 1.0
      : selectedSize.includes('10 Inch')
      ? 1.35
      : selectedSize.includes('2-Tier')
      ? 1.85
      : selectedSize.includes('3-Tier')
      ? 2.8
      : 1.0;

  const basePriceValue = currency === 'NGN' ? cake.priceNGN : currency === 'GBP' ? cake.priceGBP : cake.priceUSD;
  const topperCost = hasAcrylicTopper ? (currency === 'NGN' ? 4500 : currency === 'GBP' ? 4.5 : 6) : 0;
  const unitPrice = Math.round(basePriceValue * sizeMultiplier) + topperCost;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart({
      cartId: `${cake.id}-${Date.now()}`,
      item: cake,
      quantity,
      selectedSize,
      selectedFlavor,
      customMessage: customMessage.trim() || undefined,
      unitPrice,
      customDetails: hasAcrylicTopper ? { addOns: ['Gold Mirror Acrylic Topper'] } : undefined,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '640px', padding: '0', overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="modal-close-btn"
          style={{ zIndex: 10 }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Top Banner / Image & Title */}
        <div style={{ position: 'relative', height: '220px', width: '100%' }}>
          <img
            src={cake.image}
            alt={cake.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            referrerPolicy="no-referrer"
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(43, 22, 19, 0.85) 0%, transparent 70%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span
                  style={{
                    backgroundColor: '#ffd9dd',
                    color: '#944552',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '2px 10px',
                    borderRadius: '9999px',
                    display: 'inline-block',
                    marginBottom: '4px',
                  }}
                >
                  {cake.category.toUpperCase()}
                </span>
                <h3 className="font-serif" style={{ fontSize: '24px', color: '#ffffff' }}>
                  {cake.name}
                </h3>
              </div>

              <button
                onClick={() => onToggleFavorite(cake.id)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: isFavorite ? '#944552' : '#79545c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Heart size={18} fill={isFavorite ? '#944552' : 'transparent'} />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <p style={{ fontSize: '13.5px', color: '#534344', lineHeight: '1.6' }}>
            {cake.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#79545c', borderBottom: '1px solid #ffd9dd', paddingBottom: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} className="text-primary" />
              Lead Time: <strong>{cake.leadTimeHours} Hours</strong>
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={14} className="text-primary" />
              100% Artisanal Scratch-Baked
            </span>
          </div>

          {/* Size Choice */}
          <div>
            <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>
              Select Cake Size &amp; Servings
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
              {cake.availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`option-btn ${selectedSize === size ? 'selected' : ''}`}
                  style={{ padding: '10px 12px' }}
                >
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#2b1613' }}>
                    {size}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Flavor Choice */}
          <div>
            <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>
              Select Sponge &amp; Filling Flavor
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
              {cake.availableFlavors.map((flv) => (
                <button
                  key={flv}
                  type="button"
                  onClick={() => setSelectedFlavor(flv)}
                  className={`option-btn ${selectedFlavor === flv ? 'selected' : ''}`}
                  style={{ padding: '10px 12px' }}
                >
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#2b1613' }}>
                    {flv}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Inscription */}
          <div className="form-group" style={{ marginBottom: '0' }}>
            <label className="form-label">
              Custom Cake Inscription / Piping Text (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Happy 30th Birthday Tolu! 🎉"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="form-input"
            />
          </div>

          {/* Add-on: Acrylic Topper */}
          <div
            onClick={() => setHasAcrylicTopper(!hasAcrylicTopper)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              borderRadius: '12px',
              border: hasAcrylicTopper ? '1px solid #944552' : '1px solid #ffd9dd',
              backgroundColor: hasAcrylicTopper ? '#fdf2f4' : '#ffffff',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '4px',
                  border: hasAcrylicTopper ? '1px solid #944552' : '1px solid #ccc',
                  backgroundColor: hasAcrylicTopper ? '#944552' : '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                {hasAcrylicTopper && <Check size={12} />}
              </div>
              <div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#2b1613', display: 'block' }}>
                  Add Gold Mirror Acrylic Cake Topper
                </span>
                <span style={{ fontSize: '10px', color: '#79545c' }}>
                  "Happy Birthday", "Bride to Be", or Custom Name
                </span>
              </div>
            </div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#944552' }}>
              +{formatPrice(currency === 'NGN' ? 4500 : currency === 'GBP' ? 4.5 : 6, currency)}
            </span>
          </div>

          {/* Quantity & Action Footer */}
          <div
            style={{
              paddingTop: '16px',
              borderTop: '1px solid #ffd9dd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            {/* Quantity selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#534344' }}>Qty:</span>
              <div className="qty-control">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-btn"
                >
                  <Minus size={12} />
                </button>
                <span style={{ fontSize: '12px', fontWeight: '700', minWidth: '16px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="qty-btn"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>

            {/* Total & Add Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '10px', color: '#79545c', display: 'block' }}>Total</span>
                <span className="font-serif" style={{ fontSize: '20px', fontWeight: '700', color: '#944552' }}>
                  {formatPrice(totalPrice, currency)}
                </span>
              </div>

              <button
                onClick={handleAdd}
                className="btn btn-primary"
                style={{ padding: '12px 24px', fontSize: '13px' }}
              >
                <ShoppingBag size={16} />
                <span>Add to Selection</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
