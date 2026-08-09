export type Currency = 'NGN' | 'GBP' | 'USD';

export interface CakeItem {
  id: string;
  name: string;
  category: 'signature' | 'wedding' | 'birthday' | 'cupcakes' | 'pastries';
  priceNGN: number;
  priceGBP: number;
  priceUSD: number;
  description: string;
  fullDescription?: string;
  image: string;
  badge?: 'Bestseller' | 'Vegan Available' | 'New' | 'Chef Choice' | 'Popular';
  servingSize?: string;
  flavorNotes?: string[];
  ingredients?: string[];
  dietary?: ('vegan' | 'gluten-free' | 'eggless' | 'nut-free' | 'dairy-free')[];
  rating: number;
  reviewCount: number;
}

export interface CustomCakeOrder {
  baseType: string;
  size: string;
  flavor: string;
  frosting: string;
  addOns: string[];
  message: string;
  inspirationImage?: string;
  inspirationNote?: string;
  tierCount?: number;
}

export interface CartItem {
  cartId: string;
  item: CakeItem;
  quantity: number;
  selectedSize?: string;
  selectedFlavor?: string;
  customMessage?: string;
  customDetails?: CustomCakeOrder;
  unitPrice: number;
  currency: Currency;
}

export interface Testimonial {
  id: string;
  name: string;
  location?: string;
  rating: number;
  comment: string;
  cakeOrdered?: string;
  date: string;
  avatar: string;
}

export interface CustomerOrderDetails {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryType: 'delivery' | 'pickup';
  deliveryAddress: string;
  deliveryArea: string;
  eventDate: string;
  eventTimeSlot: string;
  specialNotes?: string;
}
