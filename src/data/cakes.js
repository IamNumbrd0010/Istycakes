// IstyCakes & Surprises - Product and Business Data

export const BAKERY_INFO = {
  name: 'IstyCakes & Surprises',
  tagline: 'Lagos Premier Artisanal Cake & Surprise Studio',
  description:
    'Handcrafting luxurious celebration cakes, bespoke wedding centerpieces, and surprise experiences across Lagos, Nigeria.',
  phone: '+234 814 000 1234',
  internationalPhone: '+234 814 000 1234',
  whatsappNumber: '2348140001234',
  instagram: '@istycakes',
  instagramUrl: 'https://instagram.com/istycakes',
  address: '14 Admiralty Way, Lekki Phase 1, Lagos, Nigeria',
  email: 'orders@istycakes.com',
  hours: 'Mon – Sat: 8:00 AM – 7:00 PM | Sun: 11:00 AM – 5:00 PM',
  workingHours: 'Mon – Sat: 8:00 AM – 7:00 PM | Sun: 11:00 AM – 5:00 PM',
  deliveryAreas: [
    { name: 'Lekki Phase 1 / Ikoyi / Victoria Island', feeNGN: 2500, feeGBP: 2, feeUSD: 3 },
    { name: 'Ajah / Chevron / Orchid / Sangotedo', feeNGN: 3500, feeGBP: 3, feeUSD: 4 },
    { name: 'Ikeja / Surulere / Yaba / Maryland', feeNGN: 4500, feeGBP: 4, feeUSD: 5 },
    { name: 'Festac / Magodo / Gbagada / Ogudu', feeNGN: 5000, feeGBP: 4.5, feeUSD: 6 },
    { name: 'Store Pickup (Lekki Studio)', feeNGN: 0, feeGBP: 0, feeUSD: 0 },
  ],
};

export const CAKES_DATA = [
  {
    id: 'pink-bliss-delight',
    name: 'Blush Velvet Raspberry',
    category: 'signature',
    priceNGN: 38000,
    priceGBP: 25,
    priceUSD: 32,
    description:
      'Tender pink sponge infused with organic Madagascar vanilla, layered with fresh raspberry compote and silky Swiss meringue buttercream.',
    image:
      'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 48,
    badge: 'Bestseller',
    servingSize: '6-8 Servings (6")',
    leadTimeHours: 24,
    flavorNotes: ['Madagascar Vanilla', 'Wild Raspberry', 'Swiss Meringue'],
    dietary: ['eggless'],
    availableSizes: ['6 Inch (6–8 Servings)', '8 Inch Standard (15–20)', '10 Inch Grand (25–30)', '2-Tier Luxury (35–40)'],
    availableFlavors: ['Madagascar Vanilla Bean', 'Raspberry Chantilly', 'Red Velvet', 'Rich Chocolate Truffle'],
    sizesAvailable: ['6 inch (8-10 serves)', '8 inch (16-20 serves)', '10 inch (28-32 serves)'],
  },
  {
    id: 'choc-overload-luxury',
    name: 'Belgian Chocolate Truffle',
    category: 'signature',
    priceNGN: 45000,
    priceGBP: 30,
    priceUSD: 38,
    description:
      'Decadent triple-layered moist chocolate sponge soaked with dark cocoa syrup, filled with 70% Callebaut dark chocolate ganache.',
    image:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewCount: 62,
    badge: 'Chef Favorite',
    servingSize: '8-12 Servings (8")',
    leadTimeHours: 24,
    flavorNotes: ['Belgian Callebaut 70%', 'Espresso Ganache', 'Gold Dust'],
    dietary: ['vegan'],
    availableSizes: ['6 Inch (6–8 Servings)', '8 Inch Standard (15–20)', '10 Inch Grand (25–30)', '2-Tier Luxury (35–40)'],
    availableFlavors: ['Belgian Dark Chocolate', 'Nutella Fudge Swirl', 'Salted Caramel Crunch', 'Mocha Espresso'],
    sizesAvailable: ['6 inch', '8 inch', '10 inch', '2-Tier 6"+8"'],
  },
  {
    id: 'royal-wedding-gold',
    name: 'Royal Blossom 3-Tier Luxury',
    category: 'wedding',
    priceNGN: 185000,
    priceGBP: 125,
    priceUSD: 160,
    description:
      'Grand 3-tiered wedding centerpiece wrapped in hand-painted 24k edible gold leaf, cascading wafer paper sugar peonies, and white chocolate ganache.',
    image:
      'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewCount: 31,
    badge: 'Bridal Choice',
    servingSize: '75-100 Servings (3 Tiers)',
    leadTimeHours: 72,
    flavorNotes: ['Champagne & Strawberry', 'Red Velvet Gold', 'Lemon Elderflower'],
    dietary: [],
    availableSizes: ['2-Tier (40–50 Servings)', '3-Tier Grand (80–100 Servings)', '4-Tier Gala (150+ Servings)'],
    availableFlavors: ['Champagne Strawberry', 'Madagascar Vanilla Bean', 'Red Velvet Gold', 'Lemon Elderflower'],
    sizesAvailable: ['2-Tier (50 serves)', '3-Tier (90 serves)', '4-Tier (150 serves)'],
  },
  {
    id: 'vintage-heart-lambeth',
    name: 'Vintage Lambeth Coquette Heart',
    category: 'birthday',
    priceNGN: 42000,
    priceGBP: 28,
    priceUSD: 36,
    description:
      'Trendy retro heart-shaped piped cake with intricate Victorian frills, maraschino cherries, and customizable piped messages.',
    image:
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 39,
    badge: 'Trending on TikTok',
    servingSize: '6-8 Servings (7" Heart)',
    leadTimeHours: 24,
    flavorNotes: ['Red Velvet', 'Cream Cheese Buttercream', 'Maraschino Cherries'],
    dietary: ['eggless'],
    availableSizes: ['6 Inch Heart (4–6 Servings)', '8 Inch Heart (8–12 Servings)', '10 Inch Heart (15–20 Servings)'],
    availableFlavors: ['Red Velvet & Cream Cheese', 'Vanilla Bean Confetti', 'Strawberry Velvet', 'Chocolate Fudge'],
    sizesAvailable: ['Small Heart (4-6)', 'Standard Heart (8-10)', 'Large Heart (12-16)'],
  },
  {
    id: 'red-velvet-supreme',
    name: 'Red Velvet Empress',
    category: 'signature',
    priceNGN: 40000,
    priceGBP: 26,
    priceUSD: 34,
    description:
      'Our iconic scarlet buttermilk sponge with subtle hints of cocoa, filled with rich tangy Philadelphia cream cheese frosting.',
    image:
      'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 54,
    badge: 'Bestseller',
    servingSize: '8-10 Servings (8")',
    leadTimeHours: 24,
    flavorNotes: ['Buttermilk Cocoa', 'Philadelphia Cream Cheese', 'White Chocolate Curls'],
    dietary: [],
    availableSizes: ['6 Inch (6–8 Servings)', '8 Inch Standard (15–20)', '10 Inch Grand (25–30)'],
    availableFlavors: ['Classic Cream Cheese', 'Whipped Vanilla Mascarpone', 'White Chocolate Silk'],
    sizesAvailable: ['6 inch', '8 inch', '10 inch', '12 inch'],
  },
  {
    id: 'salted-caramel-biscoff',
    name: 'Lotus Biscoff & Salted Caramel',
    category: 'signature',
    priceNGN: 46000,
    priceGBP: 31,
    priceUSD: 39,
    description:
      'Spiced brown sugar sponge, speculoos crunch drip, filled with homemade salted fleur de sel caramel and crunchy Biscoff buttercream.',
    image:
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 27,
    badge: 'New',
    servingSize: '8-10 Servings (8")',
    leadTimeHours: 24,
    flavorNotes: ['Speculoos Cookie Butter', 'Salted Fleur de Sel', 'Brown Sugar'],
    dietary: ['vegan'],
    availableSizes: ['6 Inch (6–8 Servings)', '8 Inch Standard (15–20)', '10 Inch Grand (25–30)'],
    availableFlavors: ['Lotus Speculoos Crunch', 'Salted Caramel Fleur de Sel', 'Caramel Macchiato'],
    sizesAvailable: ['6 inch', '8 inch', '10 inch'],
  },
  {
    id: 'luxury-cupcake-box',
    name: 'Artisan Cupcake Bouquet (Box of 12)',
    category: 'cupcakes',
    priceNGN: 24000,
    priceGBP: 16,
    priceUSD: 20,
    description:
      'Dozen gourmet cupcakes hand-piped like blooming garden roses, hydrangeas, and peonies in 4 distinct delicious flavors.',
    image:
      'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 35,
    badge: 'Popular Gift',
    servingSize: '12 Individual Cupcakes',
    leadTimeHours: 12,
    flavorNotes: ['Red Velvet', 'Salted Caramel', 'Madagascar Vanilla', 'Double Fudge'],
    dietary: ['eggless'],
    availableSizes: ['Box of 6', 'Box of 12', 'Box of 24 (Party Pack)'],
    availableFlavors: ['Assorted Gourmet Quad', 'All Red Velvet', 'All Belgian Chocolate', 'All Vanilla Blossom'],
    sizesAvailable: ['Box of 6', 'Box of 12', 'Box of 24'],
  },
  {
    id: 'pastry-small-chops-platter',
    name: 'Gourmet Small Chops & Pastry Platter',
    category: 'pastries',
    priceNGN: 32000,
    priceGBP: 22,
    priceUSD: 28,
    description:
      'Lagos event crowd-pleaser: Golden samosas, crispy spring rolls, spicy peppered puff-puff, mini chicken pies, and mini sausage rolls.',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewCount: 42,
    badge: 'Party Must-Have',
    servingSize: 'Feeds 10-15 Guests',
    leadTimeHours: 12,
    flavorNotes: ['Savory Herbs', 'Spicy Peppered Beef', 'Golden Flaky Puff'],
    dietary: [],
    availableSizes: ['Platter for 10 Guests', 'Platter for 25 Guests', 'Platter for 50 Guests'],
    availableFlavors: ['Classic Lagos Mix', 'All-Chicken Deluxe', 'Mild Seasoned'],
    sizesAvailable: ['Platter for 10', 'Platter for 25', 'Platter for 50'],
  },
];

export const INITIAL_CAKES = CAKES_DATA;

export const BESPOKE_OPTIONS = {
  bases: [
    { id: 'sponge-vanilla', name: 'Classic Vanilla Bean', priceNGN: 0, priceGBP: 0, priceUSD: 0, desc: 'Fluffy sponge with pure Bourbon vanilla caviar' },
    { id: 'sponge-red-velvet', name: 'Rich Red Velvet', priceNGN: 2000, priceGBP: 1.5, priceUSD: 2, desc: 'Scarlet buttermilk cocoa sponge with velvety crumb' },
    { id: 'sponge-chocolate', name: 'Belgian Dark Chocolate', priceNGN: 3000, priceGBP: 2, priceUSD: 2.5, desc: 'Dense, moist chocolate sponge infused with espresso' },
    { id: 'sponge-marble', name: 'Zebra Marble (Vanilla & Choc)', priceNGN: 2500, priceGBP: 1.8, priceUSD: 2.2, desc: 'Harmonious swirl of dark chocolate and vanilla' },
    { id: 'sponge-lemon', name: 'Zesty Lemon & Poppyseed', priceNGN: 2000, priceGBP: 1.5, priceUSD: 2, desc: 'Fresh citrus zest sponge with poppyseed crunch' },
    { id: 'sponge-coconut', name: 'Toasted Coconut Cream', priceNGN: 3500, priceGBP: 2.5, priceUSD: 3, desc: 'Moist coconut infused crumb with sweet shredded flakes' },
  ],
  sizes: [
    { id: 'size-6', label: '6" Mini Tier', serves: '6–8 Servings', basePriceNGN: 32000, basePriceGBP: 22, basePriceUSD: 28 },
    { id: 'size-8', label: '8" Standard Celebration', serves: '14–18 Servings', basePriceNGN: 42000, basePriceGBP: 28, basePriceUSD: 36 },
    { id: 'size-10', label: '10" Large Party', serves: '24–30 Servings', basePriceNGN: 58000, basePriceGBP: 39, basePriceUSD: 50 },
    { id: 'tier-2', label: '2-Tier Luxury (6" + 8")', serves: '35–45 Servings', basePriceNGN: 95000, basePriceGBP: 65, basePriceUSD: 82 },
    { id: 'tier-3', label: '3-Tier Grand Gala (6" + 8" + 10")', serves: '70–90 Servings', basePriceNGN: 175000, basePriceGBP: 118, basePriceUSD: 150 },
  ],
  flavors: [
    { id: 'flav-strawberry-cream', name: 'Fresh Strawberry & Vanilla Buttercream', priceNGN: 0, priceGBP: 0, priceUSD: 0, desc: 'Sweet strawberry jam layered with whipped buttercream' },
    { id: 'flav-cream-cheese', name: 'Philadelphia Cream Cheese Filling', priceNGN: 2500, priceGBP: 1.8, priceUSD: 2.2, desc: 'Tangy and silky smooth cream cheese layer' },
    { id: 'flav-nutella-ferrero', name: 'Nutella Fudge & Roasted Hazelnuts', priceNGN: 4500, priceGBP: 3, priceUSD: 4, desc: 'Gooey Italian Nutella with crispy Ferrero pieces' },
    { id: 'flav-salted-caramel', name: 'Salted Caramel Crunch & Dulce de Leche', priceNGN: 3500, priceGBP: 2.5, priceUSD: 3, desc: 'Rich artisanal caramel drizzle with crunchy pearls' },
    { id: 'flav-passionfruit', name: 'Tangy Mango & Passionfruit Curd', priceNGN: 4000, priceGBP: 2.8, priceUSD: 3.5, desc: 'Tropical citrus curd for refreshing, tart sweetness' },
  ],
  frostings: [
    { id: 'frost-swiss', name: 'Swiss Meringue Buttercream (Silky Smooth)', desc: 'Ultra-light, less sweet, perfect glossy finish' },
    { id: 'frost-fondant', name: 'Luxury Satin Fondant (Pristine Sculpted)', desc: 'Flawless ceramic-smooth finish ideal for luxury tiered cakes' },
    { id: 'frost-ganache', name: 'Whipped White Chocolate Ganache', desc: 'Rich, firm chocolate coating with clean crisp edges' },
    { id: 'frost-semi-naked', name: 'Rustic Semi-Naked with Gold Edging', desc: 'Boho-chic aesthetic revealing glimpses of cake sponge' },
  ],
  addOns: [
    { id: 'gold-leaf', name: '24K Edible Gold Leaf Accents', priceNGN: 3500, priceGBP: 2.5, priceUSD: 3 },
    { id: 'fresh-flowers', name: 'Fresh Organic Rose & Peony Bouquet', priceNGN: 6000, priceGBP: 4, priceUSD: 5 },
    { id: 'macarons', name: 'Box of 6 Hand-Gilded French Macarons', priceNGN: 4500, priceGBP: 3, priceUSD: 4 },
    { id: 'custom-topper', name: 'Custom Acrylic Mirror Cake Topper (Name/Age)', priceNGN: 4000, priceGBP: 2.8, priceUSD: 3.5 },
    { id: 'sparkler-candles', name: 'Luxury Champagne Sparkler & Metallic Candle Set', priceNGN: 2500, priceGBP: 1.8, priceUSD: 2.2 },
    { id: 'surprise-box', name: 'Surprise Explosion Box with Ribbon & Helium Balloon', priceNGN: 12000, priceGBP: 8, priceUSD: 10 },
  ],
  inspirationPresets: [
    {
      id: 'insp-1',
      name: 'Pastel Floral Dream',
      image:
        'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'insp-2',
      name: 'Architectural Gold Tier',
      image:
        'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'insp-3',
      name: 'Vintage Victorian Frills',
      image:
        'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'insp-4',
      name: 'Dripping Choc Glamour',
      image:
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    },
  ],
};

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Dr. Chioma Adeleke',
    location: 'Lekki Phase 1, Lagos',
    rating: 5,
    comment:
      'IstyCakes recreated my Pinterest wedding dream cake to absolute perfection! The red velvet tier was so moist, and all our guests kept raving about the gold leaf details.',
    cakeOrdered: '3-Tier Royal Blossom Wedding Cake',
    date: '2 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 't-2',
    name: 'Tunde Oladipo',
    location: 'Victoria Island, Lagos',
    rating: 5,
    comment:
      'I ordered the Surprise Package with the Belgian Chocolate Truffle for my fiancé’s 25th birthday. The delivery was on time, and the chocolate ganache was out of this world!',
    cakeOrdered: 'Belgian Chocolate Truffle + Surprise Box',
    date: '1 month ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 't-3',
    name: 'Fatima Sanusi',
    location: 'Ikoyi, Lagos',
    rating: 5,
    comment:
      'The Vintage Heart Lambeth cake was breathtaking! Beautiful pink piping and the cream cheese frosting was not overly sweet. My favorite bakery in Lagos hands down.',
    cakeOrdered: 'Vintage Lambeth Coquette Heart',
    date: '3 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  },
];

export const INITIAL_TESTIMONIALS = TESTIMONIALS;

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image:
      'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80',
    likes: 542,
    comments: 38,
    caption: 'Soft pink elegance for Amanda’s intimate 30th celebration in Ikoyi. Hand-piped Swiss meringue petals ✨',
  },
  {
    id: 'ig-2',
    image:
      'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=600&q=80',
    likes: 1240,
    comments: 94,
    caption: 'Pure royalty! 3 Tiers of champagne sponge & 24K edible gold leaves for #TheAdelekes2024 💍🕊️',
  },
  {
    id: 'ig-3',
    image:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    likes: 891,
    comments: 46,
    caption: 'For the ultimate chocolate lovers! Triple dark Belgian fudge with gold sprinkles 🍫🍫',
  },
  {
    id: 'ig-4',
    image:
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80',
    likes: 723,
    comments: 52,
    caption: 'Coquette vibes only! Victorian piped Lambeth heart with custom cherry toppers 🍒💖',
  },
  {
    id: 'ig-5',
    image:
      'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80',
    likes: 615,
    comments: 29,
    caption: 'Cupcake floral boxes heading out to Lekki for Mother’s Day surprises! 🌸🧁',
  },
  {
    id: 'ig-6',
    image:
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&w=600&q=80',
    likes: 980,
    comments: 63,
    caption: 'Lotus Biscoff drip with homemade salted caramel layers. Slices disappearing in seconds! 🍯',
  },
];
