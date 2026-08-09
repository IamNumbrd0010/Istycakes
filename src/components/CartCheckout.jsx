import React, { useState } from 'react';
import { BAKERY_INFO } from '../data/cakes';
import { formatPrice, generateWhatsAppOrderMessage, getWhatsAppUrl } from '../utils/formatters';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Copy,
  Check,
  User,
  ArrowRight,
  X,
} from 'lucide-react';

export const CartCheckout = ({
  cartItems,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onBrowseCakes,
  onShowToast,
}) => {
  // Customer delivery details
  const [customerDetails, setCustomerDetails] = useState({
    customerName: '',
    customerPhone: '',
    deliveryType: 'delivery',
    deliveryAddress: '',
    deliveryArea: BAKERY_INFO.deliveryAreas[0]?.name || 'Lekki Phase 1 / Ikoyi / VI',
    eventDate: '',
    eventTimeSlot: 'Morning (9:00 AM – 1:00 PM)',
    specialNotes: '',
  });

  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Subtotal calculation
  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  // Delivery fee calculation
  const selectedAreaObj = BAKERY_INFO.deliveryAreas.find((a) => a.name === customerDetails.deliveryArea);
  const deliveryFee =
    customerDetails.deliveryType === 'pickup'
      ? 0
      : currency === 'NGN'
      ? selectedAreaObj?.feeNGN || 3500
      : currency === 'GBP'
      ? selectedAreaObj?.feeGBP || 3
      : selectedAreaObj?.feeUSD || 4;

  const totalAmount = subtotal + deliveryFee;

  const generatedWhatsAppMessage = generateWhatsAppOrderMessage(
    cartItems,
    customerDetails,
    deliveryFee,
    totalAmount,
    currency
  );

  const handleCopyReceipt = () => {
    navigator.clipboard.writeText(generatedWhatsAppMessage);
    setCopied(true);
    onShowToast('WhatsApp Order Receipt copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsApp = () => {
    const url = getWhatsAppUrl(generatedWhatsAppMessage);
    window.open(url, '_blank');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center', maxWidth: '600px' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#fdf2f4',
            border: '1px solid #ffd9dd',
            color: '#944552',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}
        >
          <ShoppingBag size={38} />
        </div>
        <h2 className="font-serif" style={{ fontSize: '32px' }}>Your Selection is Empty</h2>
        <p style={{ fontSize: '14px', color: '#534344', marginTop: '8px', lineHeight: '1.6' }}>
          You haven’t added any artisanal cakes or pastries to your tray yet. Explore our handcrafted collection or build your bespoke dream cake.
        </p>
        <div style={{ marginTop: '24px' }}>
          <button
            onClick={onBrowseCakes}
            className="btn btn-primary"
            style={{ padding: '12px 28px', fontSize: '14px' }}
          >
            <span>Explore Cakes Collection</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '30px 20px 60px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', paddingBottom: '16px', borderBottom: '1px solid #ffd9dd' }}>
        <div>
          <span className="badge-tag badge-pink" style={{ marginBottom: '6px' }}>
            Order Confirmation
          </span>
          <h1 className="font-serif" style={{ fontSize: '36px' }}>
            Your <span className="text-primary" style={{ fontStyle: 'italic' }}>Selection</span>
          </h1>
        </div>
        <button
          onClick={onClearCart}
          style={{ fontSize: '12px', fontWeight: '600', color: '#c53030', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <Trash2 size={14} />
          <span>Clear Selection Tray</span>
        </button>
      </div>

      <div className="cart-layout">
        {/* Left Column: Cart Items List & Customer Form */}
        <div>
          {/* Cart Item Cards */}
          <div style={{ marginBottom: '28px' }}>
            {cartItems.map((cartItem) => (
              <div key={cartItem.cartId} className="cart-item-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="cart-item-img"
                    referrerPolicy="no-referrer"
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <h4 className="font-serif" style={{ fontSize: '18px', color: '#2b1613' }}>
                      {cartItem.item.name}
                    </h4>

                    {cartItem.selectedSize && (
                      <p style={{ fontSize: '12px', color: '#79545c' }}>
                        Size: <strong>{cartItem.selectedSize}</strong>
                      </p>
                    )}

                    {cartItem.selectedFlavor && (
                      <p style={{ fontSize: '12px', color: '#79545c' }}>
                        Flavor: <strong>{cartItem.selectedFlavor}</strong>
                      </p>
                    )}

                    {cartItem.customMessage && (
                      <p style={{ fontSize: '12px', color: '#944552', fontWeight: '600' }}>
                        Piped: "{cartItem.customMessage}"
                      </p>
                    )}

                    {cartItem.customDetails?.addOns && cartItem.customDetails.addOns.length > 0 && (
                      <p style={{ fontSize: '11px', color: '#534344' }}>
                        Add-ons: {cartItem.customDetails.addOns.join(', ')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right controls for item */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Quantity adjustment */}
                  <div className="qty-control">
                    <button
                      onClick={() => onUpdateQuantity(cartItem.cartId, cartItem.quantity - 1)}
                      className="qty-btn"
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{ fontSize: '12px', fontWeight: '700', minWidth: '16px', textAlign: 'center' }}>
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(cartItem.cartId, cartItem.quantity + 1)}
                      className="qty-btn"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  {/* Price */}
                  <div style={{ textAlign: 'right', minWidth: '80px' }}>
                    <span className="font-serif" style={{ fontSize: '16px', fontWeight: '700', color: '#944552', display: 'block' }}>
                      {formatPrice(cartItem.unitPrice * cartItem.quantity, currency)}
                    </span>
                    <span style={{ fontSize: '10px', color: '#79545c', display: 'block' }}>
                      {formatPrice(cartItem.unitPrice, currency)} each
                    </span>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => onRemoveItem(cartItem.cartId)}
                    style={{ color: '#79545c', padding: '6px' }}
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Customer & Delivery Details Form */}
          <div className="builder-step-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <User size={20} className="text-primary" />
              <h3 className="font-serif" style={{ fontSize: '20px' }}>
                Delivery &amp; Event Details
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Your Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Chioma Adeleke"
                  value={customerDetails.customerName}
                  onChange={(e) =>
                    setCustomerDetails({ ...customerDetails, customerName: e.target.value })
                  }
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">WhatsApp / Phone Number *</label>
                <input
                  type="tel"
                  placeholder="e.g. 0801 234 5678"
                  value={customerDetails.customerPhone}
                  onChange={(e) =>
                    setCustomerDetails({ ...customerDetails, customerPhone: e.target.value })
                  }
                  className="form-input"
                />
              </div>
            </div>

            {/* Delivery Type Option */}
            <div className="form-group">
              <label className="form-label">Fulfillment Preference</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setCustomerDetails({ ...customerDetails, deliveryType: 'delivery' })}
                  className={`option-btn ${customerDetails.deliveryType === 'delivery' ? 'selected' : ''}`}
                  style={{ textAlign: 'center', alignItems: 'center', padding: '12px' }}
                >
                  <span style={{ fontWeight: '700', fontSize: '13px', color: '#2b1613' }}>
                    🚚 Doorstep Delivery
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setCustomerDetails({ ...customerDetails, deliveryType: 'pickup' })}
                  className={`option-btn ${customerDetails.deliveryType === 'pickup' ? 'selected' : ''}`}
                  style={{ textAlign: 'center', alignItems: 'center', padding: '12px' }}
                >
                  <span style={{ fontWeight: '700', fontSize: '13px', color: '#2b1613' }}>
                    🏬 Free Studio Pickup
                  </span>
                </button>
              </div>
            </div>

            {/* Delivery Area & Address */}
            {customerDetails.deliveryType === 'delivery' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Select Delivery Zone (Lagos)</label>
                  <select
                    value={customerDetails.deliveryArea}
                    onChange={(e) =>
                      setCustomerDetails({ ...customerDetails, deliveryArea: e.target.value })
                    }
                    className="form-select"
                  >
                    {BAKERY_INFO.deliveryAreas
                      .filter((a) => a.feeNGN > 0)
                      .map((area) => (
                        <option key={area.name} value={area.name}>
                          {area.name} (+
                          {formatPrice(
                            currency === 'NGN' ? area.feeNGN : currency === 'GBP' ? area.feeGBP : area.feeUSD,
                            currency
                          )}
                          )
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Full Delivery Street Address</label>
                  <textarea
                    rows={2}
                    placeholder="House/Apartment number, Street name, Estate, Landmarks..."
                    value={customerDetails.deliveryAddress}
                    onChange={(e) =>
                      setCustomerDetails({ ...customerDetails, deliveryAddress: e.target.value })
                    }
                    className="form-textarea"
                  />
                </div>
              </div>
            )}

            {/* Event Date & Time Slot */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Needed Date / Event Date *</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={customerDetails.eventDate}
                  onChange={(e) =>
                    setCustomerDetails({ ...customerDetails, eventDate: e.target.value })
                  }
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Time Slot</label>
                <select
                  value={customerDetails.eventTimeSlot}
                  onChange={(e) =>
                    setCustomerDetails({ ...customerDetails, eventTimeSlot: e.target.value })
                  }
                  className="form-select"
                >
                  <option value="Morning (9:00 AM – 1:00 PM)">Morning (9:00 AM – 1:00 PM)</option>
                  <option value="Afternoon (1:00 PM – 5:00 PM)">Afternoon (1:00 PM – 5:00 PM)</option>
                  <option value="Evening (5:00 PM – 8:00 PM)">Evening (5:00 PM – 8:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="form-group">
              <label className="form-label">Special Delivery / Surprise Instructions</label>
              <input
                type="text"
                placeholder="e.g. This is a surprise for my husband, please don't ring the doorbell..."
                value={customerDetails.specialNotes}
                onChange={(e) =>
                  setCustomerDetails({ ...customerDetails, specialNotes: e.target.value })
                }
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & WhatsApp Receipt Generator */}
        <div>
          <div className="sticky-sidebar">
            <h3 className="font-serif" style={{ fontSize: '22px' }}>
              Order Summary
            </h3>

            {/* Breakdown table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', borderTop: '1px solid #ffd9dd', borderBottom: '1px solid #ffd9dd', padding: '14px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#79545c' }}>Items Subtotal ({cartItems.length}):</span>
                <span style={{ fontWeight: '700', color: '#2b1613' }}>{formatPrice(subtotal, currency)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#79545c' }}>
                  Delivery ({customerDetails.deliveryType === 'pickup' ? 'Store Pickup' : 'Lagos Doorstep'}):
                </span>
                <span style={{ fontWeight: '700', color: '#2b1613' }}>
                  {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee, currency)}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '8px', borderTop: '1px solid #ffd9dd' }}>
                <div>
                  <span style={{ fontWeight: '700', fontSize: '14px', color: '#2b1613', display: 'block' }}>Total Amount</span>
                  <span style={{ fontSize: '10px', color: '#79545c' }}>No hidden charges</span>
                </div>
                <span className="font-serif" style={{ fontSize: '26px', fontWeight: '700', color: '#944552' }}>
                  {formatPrice(totalAmount, currency)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => setReceiptModalOpen(true)}
                className="btn btn-primary"
                style={{ padding: '14px', fontSize: '14px', width: '100%' }}
              >
                <MessageCircle size={18} />
                <span>Generate WhatsApp Receipt</span>
              </button>

              <button
                onClick={handleSendWhatsApp}
                className="btn btn-whatsapp"
                style={{ padding: '12px', fontSize: '13px', width: '100%' }}
              >
                <MessageCircle size={16} />
                <span>Send Directly via WhatsApp</span>
              </button>

              <div style={{ textAlign: 'center', fontSize: '12px', color: '#79545c', marginTop: '6px' }}>
                <p>Hotline: <strong style={{ color: '#944552' }}>{BAKERY_INFO.phone}</strong></p>
                <p style={{ fontSize: '10px', marginTop: '2px' }}>We respond within 5–15 minutes during baking hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive WhatsApp Receipt Preview Modal */}
      {receiptModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={() => setReceiptModalOpen(false)}
              className="modal-close-btn"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid #ffd9dd' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#dcf8c6', color: '#1EBE5D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-serif" style={{ fontSize: '20px' }}>
                  WhatsApp Order Receipt
                </h3>
                <p style={{ fontSize: '11px', color: '#79545c' }}>Ready to send to IstyCakes &amp; Surprises</p>
              </div>
            </div>

            {/* WhatsApp Styled Message Bubble */}
            <div className="whatsapp-chat-bubble">
              <div className="chat-bubble-inner">
                {generatedWhatsAppMessage}
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '14px' }}>
              <button
                onClick={handleCopyReceipt}
                className="btn btn-secondary"
                style={{ padding: '10px', fontSize: '12px' }}
              >
                {copied ? <Check size={14} style={{ color: '#2b8a3e' }} /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handleSendWhatsApp}
                className="btn btn-whatsapp"
                style={{ padding: '10px', fontSize: '12px' }}
              >
                <MessageCircle size={14} />
                <span>Open in WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
