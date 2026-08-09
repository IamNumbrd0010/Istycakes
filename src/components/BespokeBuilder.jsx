import React, { useState } from 'react';
import { BESPOKE_OPTIONS, BAKERY_INFO } from '../data/cakes';
import { formatPrice } from '../utils/formatters';
import { Sparkles, Check, Upload, MessageCircle, ShoppingBag } from 'lucide-react';

export const BespokeBuilder = ({
  currency,
  onAddCustomToCart,
}) => {
  // State for all builder choices
  const [selectedBase, setSelectedBase] = useState(BESPOKE_OPTIONS.bases[0]);
  const [selectedSize, setSelectedSize] = useState(BESPOKE_OPTIONS.sizes[1]); // Default 8"
  const [selectedFlavor, setSelectedFlavor] = useState(BESPOKE_OPTIONS.flavors[0]);
  const [selectedFrosting, setSelectedFrosting] = useState(BESPOKE_OPTIONS.frostings[0]);
  const [selectedAddOns, setSelectedAddOns] = useState(['gold-leaf']);
  const [selectedInspiration, setSelectedInspiration] = useState(BESPOKE_OPTIONS.inspirationPresets[0]);
  const [customMessage, setCustomMessage] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [customUploadedImg, setCustomUploadedImg] = useState(null);

  // Toggle add-ons
  const toggleAddOn = (addonId) => {
    setSelectedAddOns((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  // Price calculations
  const calculateTotal = () => {
    let total = 0;
    if (currency === 'NGN') {
      total += selectedSize.basePriceNGN;
      total += selectedBase.priceNGN;
      total += selectedFlavor.priceNGN;
      selectedAddOns.forEach((id) => {
        const addon = BESPOKE_OPTIONS.addOns.find((a) => a.id === id);
        if (addon) total += addon.priceNGN;
      });
    } else if (currency === 'GBP') {
      total += selectedSize.basePriceGBP;
      total += selectedBase.priceGBP;
      total += selectedFlavor.priceGBP;
      selectedAddOns.forEach((id) => {
        const addon = BESPOKE_OPTIONS.addOns.find((a) => a.id === id);
        if (addon) total += addon.priceGBP;
      });
    } else {
      total += selectedSize.basePriceUSD;
      total += selectedBase.priceUSD;
      total += selectedFlavor.priceUSD;
      selectedAddOns.forEach((id) => {
        const addon = BESPOKE_OPTIONS.addOns.find((a) => a.id === id);
        if (addon) total += addon.priceUSD;
      });
    }
    return total;
  };

  const totalPrice = calculateTotal();

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomUploadedImg(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    const activeImage = customUploadedImg || selectedInspiration.image;
    const addOnNames = selectedAddOns
      .map((id) => BESPOKE_OPTIONS.addOns.find((a) => a.id === id)?.name)
      .filter(Boolean);

    const customData = {
      baseType: selectedBase.name,
      size: `${selectedSize.label} (${selectedSize.serves})`,
      flavor: selectedFlavor.name,
      frosting: selectedFrosting.name,
      addOns: addOnNames,
      message: customMessage,
      inspirationImage: activeImage,
      inspirationNote: specialInstructions,
    };

    const cakeItem = {
      id: `custom-${Date.now()}`,
      name: `Bespoke ${selectedBase.name} (${selectedSize.label})`,
      category: 'signature',
      priceNGN: currency === 'NGN' ? totalPrice : totalPrice * 1000,
      priceGBP: currency === 'GBP' ? totalPrice : totalPrice / 1000,
      priceUSD: currency === 'USD' ? totalPrice : totalPrice / 800,
      description: `Custom handcrafted cake with ${selectedFlavor.name} and ${selectedFrosting.name}.`,
      image: activeImage,
      rating: 5.0,
      reviewCount: 1,
      servingSize: selectedSize.serves,
    };

    const cartItem = {
      cartId: `cart-${Date.now()}`,
      item: cakeItem,
      quantity: 1,
      selectedSize: selectedSize.label,
      selectedFlavor: selectedFlavor.name,
      customMessage: customMessage,
      customDetails: customData,
      unitPrice: totalPrice,
      currency: currency,
    };

    onAddCustomToCart(cartItem);
  };

  const handleQuickWhatsApp = () => {
    const addOnNames = selectedAddOns
      .map((id) => BESPOKE_OPTIONS.addOns.find((a) => a.id === id)?.name)
      .join(', ');

    const msg = `Hello IstyCakes! 🎂✨ I customized a bespoke cake on your website:
• Size: ${selectedSize.label} (${selectedSize.serves})
• Base Sponge: ${selectedBase.name}
• Flavor Profile: ${selectedFlavor.name}
• Frosting Style: ${selectedFrosting.name}
• Luxury Add-ons: ${addOnNames || 'None'}
${customMessage ? `• Message on Cake: "${customMessage}"\n` : ''}${specialInstructions ? `• Notes: ${specialInstructions}\n` : ''}• Estimated Price: ${formatPrice(totalPrice, currency)}

Can you confirm availability and preparation timeline?`;

    window.open(`https://wa.me/${BAKERY_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="container" style={{ padding: '30px 20px 60px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 36px' }}>
        <div className="badge-tag badge-pink" style={{ marginBottom: '8px' }}>
          <Sparkles size={13} className="text-gold" />
          <span>Interactive Bespoke Studio</span>
        </div>
        <h1 className="font-serif" style={{ fontSize: '42px' }}>
          Build Your <span className="text-primary" style={{ fontStyle: 'italic' }}>Own Cake</span>
        </h1>
        <p style={{ fontSize: '15px', color: '#534344', marginTop: '6px' }}>
          Craft a masterpiece tailored to your exact taste. Select your preferences below and let our artisans bring your vision to life.
        </p>
      </div>

      <div className="builder-layout">
        {/* Left Column: Multi-Step Configuration Studio */}
        <div>

          {/* STEP 1: Select Base Sponge */}
          <div className="builder-step-card">
            <div className="step-header">
              <h3 className="font-serif" style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}>
                <span className="step-number">1</span>
                Select Base Sponge
              </h3>
              <span style={{ fontSize: '11px', color: '#79545c' }}>Required</span>
            </div>

            <div className="options-grid-2">
              {BESPOKE_OPTIONS.bases.map((base) => {
                const isSelected = selectedBase.id === base.id;
                const extraPrice = currency === 'NGN' ? base.priceNGN : currency === 'GBP' ? base.priceGBP : base.priceUSD;

                return (
                  <button
                    key={base.id}
                    onClick={() => setSelectedBase(base)}
                    className={`option-btn ${isSelected ? 'selected' : ''}`}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: '700', fontSize: '14px', color: '#2b1613' }}>{base.name}</span>
                        {isSelected && <Check size={16} className="text-primary" />}
                      </div>
                      <p style={{ fontSize: '12px', color: '#534344', marginTop: '4px' }}>{base.desc}</p>
                    </div>
                    {extraPrice > 0 && (
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#944552', marginTop: '6px', display: 'block' }}>
                        +{formatPrice(extraPrice, currency)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Choose Size & Tiers */}
          <div className="builder-step-card">
            <div className="step-header">
              <h3 className="font-serif" style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}>
                <span className="step-number">2</span>
                Choose Size &amp; Portions
              </h3>
              <span style={{ fontSize: '11px', color: '#79545c' }}>Required</span>
            </div>

            <div className="options-grid-3">
              {BESPOKE_OPTIONS.sizes.map((sz) => {
                const isSelected = selectedSize.id === sz.id;
                const baseP = currency === 'NGN' ? sz.basePriceNGN : currency === 'GBP' ? sz.basePriceGBP : sz.basePriceUSD;

                return (
                  <button
                    key={sz.id}
                    onClick={() => setSelectedSize(sz)}
                    className={`option-btn ${isSelected ? 'selected' : ''}`}
                    style={{ textAlign: 'center', alignItems: 'center' }}
                  >
                    <span className="font-serif" style={{ fontSize: '18px', color: '#2b1613', display: 'block' }}>
                      {sz.label}
                    </span>
                    <span style={{ fontSize: '12px', color: '#79545c', display: 'block' }}>{sz.serves}</span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#944552', marginTop: '4px', display: 'block' }}>
                      {formatPrice(baseP, currency)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Flavor Profile & Fillings */}
          <div className="builder-step-card">
            <div className="step-header">
              <h3 className="font-serif" style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}>
                <span className="step-number">3</span>
                Flavor Profile &amp; Filling
              </h3>
              <span style={{ fontSize: '11px', color: '#79545c' }}>Included</span>
            </div>

            <div className="options-grid-2">
              {BESPOKE_OPTIONS.flavors.map((flav) => {
                const isSelected = selectedFlavor.id === flav.id;
                const flavPrice = currency === 'NGN' ? flav.priceNGN : currency === 'GBP' ? flav.priceGBP : flav.priceUSD;

                return (
                  <button
                    key={flav.id}
                    onClick={() => setSelectedFlavor(flav)}
                    className={`option-btn ${isSelected ? 'selected' : ''}`}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: '700', fontSize: '13px', color: '#2b1613' }}>{flav.name}</span>
                        {isSelected && <Check size={16} className="text-primary" />}
                      </div>
                      <p style={{ fontSize: '11px', color: '#534344', marginTop: '4px' }}>{flav.desc}</p>
                    </div>
                    {flavPrice > 0 && (
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#944552', marginTop: '6px', display: 'block' }}>
                        +{formatPrice(flavPrice, currency)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 4: Frosting & Exterior Finish */}
          <div className="builder-step-card">
            <h3 className="font-serif" style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}>
              <span className="step-number">4</span>
              Frosting &amp; Finish Style
            </h3>

            <div className="options-grid-2">
              {BESPOKE_OPTIONS.frostings.map((fr) => {
                const isSelected = selectedFrosting.id === fr.id;
                return (
                  <button
                    key={fr.id}
                    onClick={() => setSelectedFrosting(fr)}
                    className={`option-btn ${isSelected ? 'selected' : ''}`}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: '700', fontSize: '13px', color: '#2b1613' }}>{fr.name}</span>
                      {isSelected && <Check size={16} className="text-primary" />}
                    </div>
                    <p style={{ fontSize: '11px', color: '#534344', marginTop: '4px' }}>{fr.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 5: Luxury Add-ons & Toppers */}
          <div className="builder-step-card">
            <h3 className="font-serif" style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}>
              <span className="step-number">5</span>
              Luxury Add-ons &amp; Toppers
            </h3>

            <div className="options-grid-2">
              {BESPOKE_OPTIONS.addOns.map((addon) => {
                const isSelected = selectedAddOns.includes(addon.id);
                const addPrice = currency === 'NGN' ? addon.priceNGN : currency === 'GBP' ? addon.priceGBP : addon.priceUSD;

                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddOn(addon.id)}
                    className={`option-btn ${isSelected ? 'selected' : ''}`}
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          border: isSelected ? '1px solid #944552' : '1px solid #c0b4b6',
                          backgroundColor: isSelected ? '#944552' : '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff',
                        }}
                      >
                        {isSelected && <Check size={12} />}
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#2b1613' }}>{addon.name}</span>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#944552' }}>
                      +{formatPrice(addPrice, currency)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 6: Inspiration & Custom Photo Upload */}
          <div className="builder-step-card">
            <h3 className="font-serif" style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}>
              <span className="step-number">6</span>
              Inspiration Reference
            </h3>

            <p style={{ fontSize: '13px', color: '#534344' }}>
              Choose from our popular style presets or upload your own screenshot from Pinterest/Instagram.
            </p>

            {/* Presets */}
            <div className="options-grid-4">
              {BESPOKE_OPTIONS.inspirationPresets.map((insp) => (
                <button
                  key={insp.id}
                  onClick={() => {
                    setSelectedInspiration(insp);
                    setCustomUploadedImg(null);
                  }}
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: selectedInspiration.id === insp.id && !customUploadedImg ? '2px solid #944552' : '1px solid #ffd9dd',
                    position: 'relative',
                    aspectRatio: '1/1',
                    opacity: selectedInspiration.id === insp.id && !customUploadedImg ? 1 : 0.75,
                  }}
                >
                  <img
                    src={insp.image}
                    alt={insp.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    referrerPolicy="no-referrer"
                  />
                  <div style={{ position: 'absolute', inset: 'auto 0 0 0', background: 'rgba(0,0,0,0.6)', padding: '4px', textAlign: 'center', fontSize: '10px', color: '#ffffff', fontWeight: '600' }}>
                    {insp.name}
                  </div>
                </button>
              ))}
            </div>

            {/* Upload custom image */}
            <div style={{ paddingTop: '10px' }}>
              <label style={{ border: '2px dashed #ffd9dd', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#FFF8F7' }}>
                <Upload size={22} className="text-primary" style={{ marginBottom: '4px' }} />
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#2b1613' }}>Upload Your Own Image</span>
                <span style={{ fontSize: '11px', color: '#79545c' }}>PNG, JPG up to 10MB</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>

              {customUploadedImg && (
                <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#fdf2f4', borderRadius: '12px', border: '1px solid #ffd9dd' }}>
                  <img
                    src={customUploadedImg}
                    alt="Uploaded inspiration"
                    style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1, fontSize: '12px' }}>
                    <p style={{ fontWeight: '700', color: '#944552' }}>Custom Image Attached ✨</p>
                    <p style={{ fontSize: '11px', color: '#79545c' }}>Our master baker will review this.</p>
                  </div>
                  <button
                    onClick={() => setCustomUploadedImg(null)}
                    style={{ fontSize: '12px', color: '#c53030' }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* STEP 7: Custom Inscription & Notes */}
          <div className="builder-step-card">
            <h3 className="font-serif" style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}>
              <span className="step-number">7</span>
              Message on Cake &amp; Special Notes
            </h3>

            <div className="form-group">
              <label className="form-label">Piped Text on Cake / Topper Plaque</label>
              <input
                type="text"
                placeholder="e.g. Happy 30th Birthday Chioma! ♡"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Color Theme &amp; Dietary Requests</label>
              <textarea
                rows={2}
                placeholder="e.g. Please use blush pink & gold color palette, eggless sponge if possible..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="form-textarea"
              />
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Live Preview & Price Card */}
        <div>
          <div className="sticky-sidebar">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="badge-tag badge-pink">Live Cake Preview</span>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#944552' }}>
                {selectedSize.label}
              </span>
            </div>

            {/* Visual Image Preview */}
            <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: '16px', overflow: 'hidden', border: '1px solid #ffd9dd', background: '#FFF8F7' }}>
              <img
                src={customUploadedImg || selectedInspiration.image}
                alt="Custom Cake Live Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                referrerPolicy="no-referrer"
              />
              <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(0,0,0,0.6)', color: '#ffffff', fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '6px' }}>
                {customUploadedImg ? 'Your Uploaded Design' : selectedInspiration.name}
              </div>
              {customMessage && (
                <div style={{ position: 'absolute', bottom: '8px', left: '8px', right: '8px', background: 'rgba(255,255,255,0.92)', color: '#944552', fontSize: '12px', fontWeight: '700', padding: '6px 10px', borderRadius: '8px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  "{customMessage}"
                </div>
              )}
            </div>

            {/* Summary List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', borderTop: '1px solid #ffd9dd', borderBottom: '1px solid #ffd9dd', padding: '14px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#79545c' }}>Sponge Base:</span>
                <span style={{ fontWeight: '700', color: '#2b1613' }}>{selectedBase.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#79545c' }}>Size &amp; Portions:</span>
                <span style={{ fontWeight: '700', color: '#2b1613' }}>{selectedSize.label} ({selectedSize.serves})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#79545c' }}>Flavor:</span>
                <span style={{ fontWeight: '700', color: '#2b1613' }}>{selectedFlavor.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#79545c' }}>Frosting Style:</span>
                <span style={{ fontWeight: '700', color: '#2b1613' }}>{selectedFrosting.name}</span>
              </div>
              {selectedAddOns.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ color: '#79545c' }}>Add-ons:</span>
                  <span style={{ fontWeight: '700', color: '#2b1613', textAlign: 'right', maxWidth: '65%' }}>
                    {selectedAddOns
                      .map((id) => BESPOKE_OPTIONS.addOns.find((a) => a.id === id)?.name)
                      .join(', ')}
                  </span>
                </div>
              )}
            </div>

            {/* Total Price Display */}
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#79545c', display: 'block' }}>Estimated Total</span>
                <span style={{ fontSize: '11px', color: '#2b8a3e', fontWeight: '600' }}>Baking slot guaranteed</span>
              </div>
              <span className="font-serif" style={{ fontSize: '28px', fontWeight: '700', color: '#944552' }}>
                {formatPrice(totalPrice, currency)}
              </span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={handleAddToCart}
                className="btn btn-primary"
                style={{ padding: '14px', fontSize: '14px', width: '100%' }}
              >
                <ShoppingBag size={18} />
                <span>Add Custom Cake to Tray</span>
              </button>

              <button
                onClick={handleQuickWhatsApp}
                className="btn btn-secondary"
                style={{ padding: '12px', fontSize: '13px', width: '100%' }}
              >
                <MessageCircle size={16} />
                <span>Direct WhatsApp Consultation</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
