// Utility functions for formatting prices and generating WhatsApp order messages
import { BAKERY_INFO } from '../data/cakes';

/**
 * Format numerical prices according to selected currency
 */
export const formatPrice = (amount, currency = 'NGN') => {
  if (currency === 'GBP') {
    return `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  }
  if (currency === 'USD') {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  }
  // Default NGN
  return `₦${amount.toLocaleString('en-NG')}`;
};

/**
 * Get item price based on active currency
 */
export const getItemPrice = (cake, currency = 'NGN') => {
  if (currency === 'GBP') return cake.priceGBP;
  if (currency === 'USD') return cake.priceUSD;
  return cake.priceNGN;
};

/**
 * Generate formatted WhatsApp message for direct ordering
 */
export const generateWhatsAppOrderMessage = (
  cartItems,
  customerDetails,
  deliveryFee,
  totalAmount,
  currency = 'NGN'
) => {
  const dateStr = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const formattedItems = cartItems
    .map((item, index) => {
      let itemText = `${index + 1}. *${item.item.name}* (Qty: ${item.quantity})\n   - Price: ${formatPrice(
        item.unitPrice * item.quantity,
        currency
      )}`;
      if (item.selectedSize) {
        itemText += `\n   - Size/Tier: ${item.selectedSize}`;
      }
      if (item.selectedFlavor) {
        itemText += `\n   - Flavor: ${item.selectedFlavor}`;
      }
      if (item.customMessage) {
        itemText += `\n   - Piped Inscription: "${item.customMessage}"`;
      }
      if (item.customDetails?.addOns && item.customDetails.addOns.length > 0) {
        itemText += `\n   - Luxury Add-ons: ${item.customDetails.addOns.join(', ')}`;
      }
      if (item.customDetails?.inspirationNote) {
        itemText += `\n   - Custom Notes: ${item.customDetails.inspirationNote}`;
      }
      return itemText;
    })
    .join('\n\n');

  const message = `*🎂 NEW CAKE ORDER INQUIRY - ISTYCAKES & SURPRISES*
━━━━━━━━━━━━━━━━━━━━━
📅 *Date Created:* ${dateStr}
👤 *Customer Name:* ${customerDetails.customerName || 'Valued Customer'}
📞 *Phone / WhatsApp:* ${customerDetails.customerPhone || 'Not provided'}
📍 *Fulfillment:* ${customerDetails.deliveryType === 'pickup' ? 'Studio Pickup (Lekki Phase 1)' : `Doorstep Delivery (${customerDetails.deliveryArea})`}
${customerDetails.deliveryType === 'delivery' && customerDetails.deliveryAddress ? `🏠 *Address:* ${customerDetails.deliveryAddress}\n` : ''}🎉 *Needed Date:* ${customerDetails.eventDate || 'Pending confirmation'} (${customerDetails.eventTimeSlot})
${customerDetails.specialNotes ? `📝 *Special Notes:* ${customerDetails.specialNotes}\n` : ''}
━━━━━━━━━━━━━━━━━━━━━
🛒 *ORDER ITEMS:*
${formattedItems}

━━━━━━━━━━━━━━━━━━━━━
💰 *PRICING BREAKDOWN:*
• Items Subtotal: ${formatPrice(totalAmount - deliveryFee, currency)}
• Delivery Fee: ${deliveryFee === 0 ? 'FREE (Pickup)' : formatPrice(deliveryFee, currency)}
*⭐ TOTAL AMOUNT: ${formatPrice(totalAmount, currency)}*
━━━━━━━━━━━━━━━━━━━━━

Hello IstyCakes! I would like to confirm availability and proceed with payment for this order. Thank you!`;

  return message;
};

/**
 * Generate clickable wa.me direct link
 */
export const getWhatsAppUrl = (message, phone = BAKERY_INFO.whatsappNumber) => {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
