import React, { useState } from 'react';
import { CartItem, Currency, CustomerOrderDetails } from '../types';
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
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  ArrowRight,
  Sparkles,
  X,
  FileText
} from 'lucide-react';

interface CartCheckoutProps {
  cartItems: CartItem[];
  currency: Currency;
  onUpdateQuantity: (cartId: string, newQuantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  onBrowseCakes: () => void;
  onShowToast: (message: string) => void;
}

export const CartCheckout: React.FC<CartCheckoutProps> = ({
  cartItems,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onBrowseCakes,
  onShowToast,
}) => {
  // Customer delivery details
  const [customerDetails, setCustomerDetails] = useState<CustomerOrderDetails>({
    customerName: '',
    customerPhone: '',
    deliveryType: 'delivery',
    deliveryAddress: '',
    deliveryArea: BAKERY_INFO.deliveryAreas[0].name,
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
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-[#fdf2f4] rounded-full flex items-center justify-center mx-auto text-[#944552] border border-[#ffd9dd]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="font-['DM_Serif_Display',serif] text-3xl text-[#2b1613]">
            Your Selection is Empty
          </h2>
          <p className="text-sm text-[#534344] max-w-md mx-auto">
            You haven’t added any artisanal cakes to your tray yet. Explore our handcrafted collection or build your bespoke dream cake.
          </p>
        </div>
        <div className="pt-2">
          <button
            onClick={onBrowseCakes}
            className="inline-flex items-center gap-2 bg-[#944552] hover:bg-[#7a2e3b] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <span>Explore Cakes Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#ffd9dd]/80">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#944552]">
            Order Confirmation
          </span>
          <h1 className="font-['DM_Serif_Display',serif] text-3xl sm:text-4xl text-[#2b1613]">
            Your <span className="text-[#944552] italic">Selection</span>
          </h1>
        </div>
        <button
          onClick={onClearCart}
          className="text-xs font-semibold text-red-600 hover:text-red-800 flex items-center gap-1 self-start sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Selection Tray</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items List & Customer Form */}
        <div className="lg:col-span-7 space-y-6">
          {/* Cart Item Cards */}
          <div className="space-y-4">
            {cartItems.map((cartItem) => (
              <div
                key={cartItem.cartId}
                className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#ffd9dd] flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-[#ffd9dd] shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1">
                    <h4 className="font-['DM_Serif_Display',serif] text-base sm:text-lg text-[#2b1613]">
                      {cartItem.item.name}
                    </h4>

                    {cartItem.selectedSize && (
                      <p className="text-xs text-[#79545c]">Size: {cartItem.selectedSize}</p>
                    )}

                    {cartItem.selectedFlavor && (
                      <p className="text-xs text-[#79545c]">Flavor: {cartItem.selectedFlavor}</p>
                    )}

                    {cartItem.customMessage && (
                      <p className="text-xs text-[#944552] font-semibold">
                        Piped Message: "{cartItem.customMessage}"
                      </p>
                    )}

                    {cartItem.customDetails?.addOns && cartItem.customDetails.addOns.length > 0 && (
                      <p className="text-[11px] text-[#534344]">
                        Add-ons: {cartItem.customDetails.addOns.join(', ')}
                      </p>
                    )}

                    <p className="text-xs font-bold text-[#944552] sm:hidden">
                      {formatPrice(cartItem.unitPrice * cartItem.quantity, currency)}
                    </p>
                  </div>
                </div>

                {/* Right controls for item */}
                <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-[#ffd9dd]">
                  {/* Quantity adjustment */}
                  <div className="flex items-center gap-2 bg-[#fdf2f4] rounded-full p-1 border border-[#ffd9dd]">
                    <button
                      onClick={() => onUpdateQuantity(cartItem.cartId, cartItem.quantity - 1)}
                      className="w-6 h-6 rounded-full bg-white text-[#944552] flex items-center justify-center hover:bg-[#ffd9dd] transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold px-1.5 text-[#2b1613]">{cartItem.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(cartItem.cartId, cartItem.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-white text-[#944552] flex items-center justify-center hover:bg-[#ffd9dd] transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Desktop Item Price */}
                  <div className="hidden sm:block text-right">
                    <span className="font-['DM_Serif_Display',serif] text-base font-bold text-[#944552]">
                      {formatPrice(cartItem.unitPrice * cartItem.quantity, currency)}
                    </span>
                    <span className="block text-[10px] text-[#79545c]">
                      {formatPrice(cartItem.unitPrice, currency)} each
                    </span>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => onRemoveItem(cartItem.cartId)}
                    className="p-2 text-[#79545c] hover:text-red-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Customer & Delivery Details Form */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-[#ffd9dd] space-y-5">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[#944552]" />
              <h3 className="font-['DM_Serif_Display',serif] text-xl text-[#2b1613]">
                Delivery &amp; Event Details
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#534344] uppercase mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chioma Adeleke"
                  value={customerDetails.customerName}
                  onChange={(e) =>
                    setCustomerDetails({ ...customerDetails, customerName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-sm border border-[#ffd9dd] rounded-xl focus:ring-2 focus:ring-[#944552] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#534344] uppercase mb-1">
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 0801 234 5678"
                  value={customerDetails.customerPhone}
                  onChange={(e) =>
                    setCustomerDetails({ ...customerDetails, customerPhone: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-sm border border-[#ffd9dd] rounded-xl focus:ring-2 focus:ring-[#944552] focus:outline-none"
                />
              </div>
            </div>

            {/* Delivery Type Option */}
            <div>
              <label className="block text-xs font-bold text-[#534344] uppercase mb-1.5">
                Fulfillment Preference
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCustomerDetails({ ...customerDetails, deliveryType: 'delivery' })}
                  className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                    customerDetails.deliveryType === 'delivery'
                      ? 'bg-[#fdf2f4] border-[#944552] text-[#944552] ring-1 ring-[#944552]'
                      : 'bg-white border-[#ffd9dd] text-[#534344]'
                  }`}
                >
                  🚚 Doorstep Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setCustomerDetails({ ...customerDetails, deliveryType: 'pickup' })}
                  className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                    customerDetails.deliveryType === 'pickup'
                      ? 'bg-[#fdf2f4] border-[#944552] text-[#944552] ring-1 ring-[#944552]'
                      : 'bg-white border-[#ffd9dd] text-[#534344]'
                  }`}
                >
                  🏬 Free Studio Pickup
                </button>
              </div>
            </div>

            {/* Delivery Area & Address */}
            {customerDetails.deliveryType === 'delivery' && (
              <div className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-[#534344] uppercase mb-1">
                    Select Delivery Zone (Lagos)
                  </label>
                  <select
                    value={customerDetails.deliveryArea}
                    onChange={(e) =>
                      setCustomerDetails({ ...customerDetails, deliveryArea: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm border border-[#ffd9dd] rounded-xl bg-white focus:ring-2 focus:ring-[#944552] focus:outline-none"
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

                <div>
                  <label className="block text-xs font-bold text-[#534344] uppercase mb-1">
                    Full Delivery Street Address
                  </label>
                  <textarea
                    rows={2}
                    placeholder="House/Apartment number, Street name, Estate, Landmarks..."
                    value={customerDetails.deliveryAddress}
                    onChange={(e) =>
                      setCustomerDetails({ ...customerDetails, deliveryAddress: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm border border-[#ffd9dd] rounded-xl focus:ring-2 focus:ring-[#944552] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Event Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#534344] uppercase mb-1">
                  Needed Date / Event Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={customerDetails.eventDate}
                    onChange={(e) =>
                      setCustomerDetails({ ...customerDetails, eventDate: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm border border-[#ffd9dd] rounded-xl bg-white focus:ring-2 focus:ring-[#944552] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#534344] uppercase mb-1">
                  Preferred Time Slot
                </label>
                <select
                  value={customerDetails.eventTimeSlot}
                  onChange={(e) =>
                    setCustomerDetails({ ...customerDetails, eventTimeSlot: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-sm border border-[#ffd9dd] rounded-xl bg-white focus:ring-2 focus:ring-[#944552] focus:outline-none"
                >
                  <option value="Morning (9:00 AM – 1:00 PM)">Morning (9:00 AM – 1:00 PM)</option>
                  <option value="Afternoon (1:00 PM – 5:00 PM)">Afternoon (1:00 PM – 5:00 PM)</option>
                  <option value="Evening (5:00 PM – 8:00 PM)">Evening (5:00 PM – 8:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-bold text-[#534344] uppercase mb-1">
                Special Delivery / Surprise Instructions
              </label>
              <input
                type="text"
                placeholder="e.g. This is a surprise for my husband, please don't ring the doorbell..."
                value={customerDetails.specialNotes}
                onChange={(e) =>
                  setCustomerDetails({ ...customerDetails, specialNotes: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-sm border border-[#ffd9dd] rounded-xl focus:ring-2 focus:ring-[#944552] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & WhatsApp Receipt Generator */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-[#ffd9dd] space-y-5">
            <h3 className="font-['DM_Serif_Display',serif] text-2xl text-[#2b1613]">
              Order Summary
            </h3>

            {/* Breakdown table */}
            <div className="space-y-3 text-xs sm:text-sm border-y border-[#ffd9dd]/60 py-4">
              <div className="flex justify-between">
                <span className="text-[#79545c]">Items Subtotal ({cartItems.length}):</span>
                <span className="font-bold text-[#2b1613]">{formatPrice(subtotal, currency)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#79545c]">
                  Delivery ({customerDetails.deliveryType === 'pickup' ? 'Store Pickup' : 'Lagos Doorstep'}):
                </span>
                <span className="font-bold text-[#2b1613]">
                  {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee, currency)}
                </span>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t border-[#ffd9dd]/40">
                <div>
                  <span className="font-bold text-sm text-[#2b1613] block">Total Amount</span>
                  <span className="text-[10px] text-[#79545c]">No hidden charges</span>
                </div>
                <span className="font-['DM_Serif_Display',serif] text-3xl font-bold text-[#944552]">
                  {formatPrice(totalAmount, currency)}
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="space-y-2.5">
              <button
                onClick={() => setReceiptModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-[#944552] hover:bg-[#7a2e3b] text-white font-bold text-sm sm:text-base py-4 rounded-full shadow-lg shadow-[#944552]/20 hover:shadow-xl transition-all duration-200 hover:scale-102 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Generate WhatsApp Receipt</span>
              </button>

              <button
                onClick={handleSendWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm py-3 rounded-full shadow-md transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Send Directly via WhatsApp</span>
              </button>

              <div className="pt-2 text-center text-xs text-[#79545c]">
                <p>Hotline: <strong className="text-[#944552]">{BAKERY_INFO.phone}</strong></p>
                <p className="text-[10px] mt-0.5">We respond within 5–15 minutes during baking hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive WhatsApp Receipt Preview Modal */}
      {receiptModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#ffd9dd] relative max-h-[90vh] flex flex-col animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#ffd9dd]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#dcf8c6] text-[#1EBE5D] flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 fill-[#1EBE5D]" />
                </div>
                <div>
                  <h3 className="font-['DM_Serif_Display',serif] text-xl text-[#2b1613]">
                    WhatsApp Order Receipt
                  </h3>
                  <p className="text-[10px] text-[#79545c]">Ready to send to IstyCakes &amp; Surprises</p>
                </div>
              </div>
              <button
                onClick={() => setReceiptModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* WhatsApp Styled Message Bubble */}
            <div className="my-4 p-4 rounded-2xl bg-[#EFEAE2] overflow-y-auto flex-1 font-mono text-xs text-[#111b21] space-y-2 border border-[#d1c7bc] shadow-inner">
              <div className="bg-[#DCF8C6] p-4 rounded-xl rounded-tr-none shadow-sm whitespace-pre-wrap leading-relaxed">
                {generatedWhatsAppMessage}
              </div>
              <p className="text-[10px] text-gray-500 text-right pr-1">Formatted for WhatsApp</p>
            </div>

            {/* Modal Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleCopyReceipt}
                className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-full border border-[#944552] text-[#944552] font-bold text-xs hover:bg-[#fdf2f4] transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handleSendWhatsApp}
                className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Open in WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
