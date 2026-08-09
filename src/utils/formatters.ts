import { Currency, CartItem, CustomerOrderDetails } from '../types';
import { BAKERY_INFO } from '../data/cakes';

export function formatPrice(amount: number, currency: Currency): string {
  if (currency === 'NGN') {
    return `₦${amount.toLocaleString('en-NG')}`;
  } else if (currency === 'GBP') {
    return `£${amount.toFixed(2)}`;
  } else {
    return `$${amount.toFixed(2)}`;
  }
}

export function getItemPrice(item: { priceNGN: number; priceGBP: number; priceUSD: number }, currency: Currency): number {
  if (currency === 'NGN') return item.priceNGN;
  if (currency === 'GBP') return item.priceGBP;
  return item.priceUSD;
}

export function generateWhatsAppOrderMessage(
  cartItems: CartItem[],
  customerDetails: CustomerOrderDetails,
  deliveryFee: number,
  totalAmount: number,
  currency: Currency
): string {
  const dateFormatted = customerDetails.eventDate
    ? new Date(customerDetails.eventDate).toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Not specified yet';

  let itemsList = '';
  cartItems.forEach((item, index) => {
    const itemTotal = formatPrice(item.unitPrice * item.quantity, currency);
    itemsList += `\n🍰 *Item ${index + 1}: ${item.item.name}* (x${item.quantity})\n`;
    if (item.selectedSize) itemsList += `   • Size: ${item.selectedSize}\n`;
    if (item.selectedFlavor) itemsList += `   • Flavor: ${item.selectedFlavor}\n`;
    if (item.customDetails) {
      itemsList += `   • Base: ${item.customDetails.baseType}\n`;
      itemsList += `   • Flavor: ${item.customDetails.flavor}\n`;
      itemsList += `   • Finish: ${item.customDetails.frosting}\n`;
      if (item.customDetails.addOns && item.customDetails.addOns.length > 0) {
        itemsList += `   • Add-ons: ${item.customDetails.addOns.join(', ')}\n`;
      }
    }
    if (item.customMessage) {
      itemsList += `   • Message on Cake: "${item.customMessage}"\n`;
    }
    itemsList += `   • Price: ${itemTotal}\n`;
  });

  const subtotal = cartItems.reduce((acc, curr) => acc + curr.unitPrice * curr.quantity, 0);

  const message = `Hello IstyCakes & Surprises! 🎂✨

I would like to place an order from your website:
----------------------------------------${itemsList}----------------------------------------
🧾 *ORDER SUMMARY:*
• Subtotal: ${formatPrice(subtotal, currency)}
• Delivery (${customerDetails.deliveryType === 'pickup' ? 'Store Pickup' : customerDetails.deliveryArea || 'Standard Delivery'}): ${formatPrice(deliveryFee, currency)}
• *TOTAL: ${formatPrice(totalAmount, currency)}*

👤 *CUSTOMER DETAILS:*
• Name: ${customerDetails.customerName || 'Valued Customer'}
• Phone/WhatsApp: ${customerDetails.customerPhone || 'Not provided'}
• Event / Needed Date: ${dateFormatted}
• Time Slot: ${customerDetails.eventTimeSlot || 'Standard working hours'}
• Delivery Type: ${customerDetails.deliveryType === 'pickup' ? 'Self Pickup at Bakery Studio' : 'Doorstep Delivery'}
${customerDetails.deliveryType === 'delivery' && customerDetails.deliveryAddress ? `• Delivery Address: ${customerDetails.deliveryAddress}\n` : ''}${customerDetails.specialNotes ? `• Special Instructions: ${customerDetails.specialNotes}\n` : ''}
Please confirm availability, baking schedule, and payment details. Thank you! 🧁💖`;

  return message;
}

export function getWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${BAKERY_INFO.whatsappNumber}?text=${encoded}`;
}
