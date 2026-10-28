import { CategoryType, ServiceItem, Stylist, ProductItem, ClientReview } from '../types';

export const MASTER_STYLISTS: Record<string, Stylist> = {
  aaliyah: {
    id: 'aaliyah',
    name: 'Aaliyah Hale',
    title: 'Master Braider & Texture Specialist',
    experience: '8+ Yrs Exp',
    bio: 'Specializing in precision stitch braiding, clean knotless patterns, and restorative loc care. Trained in Lagos VIP studios with zero-tension edge protection.',
    rating: 4.95,
    reviewsCount: 312,
    avatar: '/src/assets/images/stylist_aaliyah_1792949106708.jpg',
    specialties: ['Precision Knotless', 'Boho Human Hair Mix', 'Soft Locs'],
    location: 'Ugbor GRA Studio Suite A, Benin City'
  },
  tiwa: {
    id: 'tiwa',
    name: 'Tiwa Osemwengie',
    title: 'Editorial Braider & Cornrow Artist',
    experience: '6+ Yrs Exp',
    bio: 'Celebrity stylist specializing in intricate geometric stitch feed-ins, tribal patterns, and sleek runway finishes.',
    rating: 4.92,
    reviewsCount: 184,
    avatar: '/src/assets/images/stylist_aaliyah_1792949106708.jpg',
    specialties: ['Stitch Braids', 'Tribal Cornrows', 'Scalp Spa'],
    location: 'Adesuwa Road Studio, Benin City'
  },
  folake: {
    id: 'folake',
    name: 'Folake Alade',
    title: 'Lace & Revamp Master',
    experience: '7+ Yrs Exp',
    bio: 'Master of HD lace melting, deep conditioning stem treatments, and bone straight styling for luxury hair extensions.',
    rating: 4.89,
    reviewsCount: 145,
    avatar: '/src/assets/images/stylist_aaliyah_1792949106708.jpg',
    specialties: ['Wig Revamp', 'Lace Melt', 'Silk Press'],
    location: 'Ugbor GRA Studio Suite B, Benin City'
  }
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'boho-box-braids',
    title: 'Boho Box Braids (Human Curls)',
    category: 'Braids',
    image: '/src/assets/images/hero_boho_braids_1792949103763.jpg',
    rating: 4.9,
    reviewsCount: 248,
    priceNGN: 58000,
    duration: '4.5 hrs',
    stylist: MASTER_STYLISTS.aaliyah,
    location: 'Ugbor GRA, Benin City',
    hairIncluded: true,
    depositPercentage: 30,
    description: 'Our signature Bohemian Braids crafted with lightweight kanekalon and 100% human hair wavy curls for a natural, effortless bounce that does not tangle.',
    features: ['100% Raw Human Hair Curls', 'Pain-Free Scalp Parting', 'Anti-Frizz Setting Foam', 'Complimentary Scalp Oil Treatment'],
    recommendedHairType: 'All textures (3A - 4C)',
    popular: true
  },
  {
    id: 'waist-knotless-braids',
    title: 'Waist-Length Knotless Braids',
    category: 'Knotless',
    image: '/src/assets/images/style_knotless_braids_1792949104430.jpg',
    rating: 4.98,
    reviewsCount: 384,
    priceNGN: 45000,
    duration: '4 hrs',
    stylist: MASTER_STYLISTS.aaliyah,
    location: 'Ugbor GRA, Benin City',
    hairIncluded: true,
    depositPercentage: 30,
    description: 'Immaculately neat square or triangle parts starting directly from your natural hair for seamless, tension-free movement from day one.',
    features: ['Feathered Pre-Stretched Hair Included', 'Edge Tension Protection', 'Hot Water Finish with Soft Curls or Straight Ends', 'Lightweight Feel'],
    recommendedHairType: 'Type 4A - 4C',
    popular: true
  },
  {
    id: 'soft-locs-24',
    title: 'Soft Locs 24" Bohemian Finish',
    category: 'Locs',
    image: '/src/assets/images/style_soft_locs_1792949103926.jpg',
    rating: 4.88,
    reviewsCount: 196,
    priceNGN: 48000,
    duration: '3.5 hrs',
    stylist: MASTER_STYLISTS.tiwa,
    location: 'Adesuwa Rd Corridor, Benin City',
    hairIncluded: true,
    depositPercentage: 30,
    description: 'Ultra-pliable, lightweight 24-inch faux soft locs textured with spring twists and curly ends for royal, goddess vibes with high longevity.',
    features: ['Pre-Fluffed Soft Loc Strands', 'Gold Wire Jewelry Option', 'Waterproof & Lightweight', 'Zero Stiff Neck Period'],
    recommendedHairType: 'All natural or relaxed hair',
    popular: true
  },
  {
    id: 'stitch-feedin-braids',
    title: '6 Feed-In Precision Stitch Braids',
    category: 'Braids',
    image: '/src/assets/images/style_stitch_braids_1792949105360.jpg',
    rating: 5.0,
    reviewsCount: 162,
    priceNGN: 35000,
    duration: '2.5 hrs',
    stylist: MASTER_STYLISTS.tiwa,
    location: 'Ugbor GRA, Benin City',
    hairIncluded: true,
    depositPercentage: 30,
    description: 'Razor-clean geometric stitch lines with graduated thickness that contour your face shape perfectly. Sleek, clean and durable.',
    features: ['Razor-Sharp Clean Parting', 'Anti-Humidity Edge Gel', 'Baby Hair Styling', 'Long-lasting 3+ Weeks'],
    recommendedHairType: 'Natural or pressed hair',
    popular: false
  },
  {
    id: 'french-curl-braids',
    title: 'French Curl Goddess Braids',
    category: 'Braids',
    image: '/src/assets/images/hero_boho_braids_1792949103763.jpg',
    rating: 4.94,
    reviewsCount: 210,
    priceNGN: 52000,
    duration: '4 hrs',
    stylist: MASTER_STYLISTS.aaliyah,
    location: 'Ugbor GRA, Benin City',
    hairIncluded: true,
    depositPercentage: 30,
    description: 'Super silky French curl braids with voluminous bouncy spiral curls. Breathtaking movement suitable for weddings, dinner galas, and VIP appearances.',
    features: ['Original Pre-Curled French Fiber', 'Silky Gloss Texture', 'Tangle-Free Maintenance Spray Included', 'Custom Ombré Blend Available'],
    recommendedHairType: 'Type 3B - 4C',
    popular: true
  },
  {
    id: 'luxury-wig-revamp',
    title: 'Luxury Wig Revamp & HD Lace Melt',
    category: 'Wig Revamp',
    image: '/src/assets/images/style_knotless_braids_1792949104430.jpg',
    rating: 4.91,
    reviewsCount: 178,
    priceNGN: 32000,
    duration: '24 hr turnaround / 1.5 hr install',
    stylist: MASTER_STYLISTS.folake,
    location: 'Ugbor GRA Studio Suite B, Benin City',
    hairIncluded: false,
    depositPercentage: 50,
    description: 'Full detox bath, deep hydration steam, knot bleaching, custom hairline plucked to perfection, and undetectable HD lace melt with bone-straight styling.',
    features: ['Deep Steam Hydration', 'Invisible Knot Bleaching', 'Precision Baby Hair Plucking', 'Heat Protection Ceramic Press'],
    recommendedHairType: 'Raw Virgin or Human Hair Wigs',
    popular: false
  },
  {
    id: 'butterfly-locs-goddess',
    title: 'Butterfly Distressed Locs 18"',
    category: 'Locs',
    image: '/src/assets/images/style_soft_locs_1792949103926.jpg',
    rating: 4.87,
    reviewsCount: 134,
    priceNGN: 44000,
    duration: '3.5 hrs',
    stylist: MASTER_STYLISTS.tiwa,
    location: 'Adesuwa Rd Corridor, Benin City',
    hairIncluded: true,
    depositPercentage: 30,
    description: 'Carefully handcrafted textured loops and distress effect that look like natural Bohemian locs with organic fullness and charm.',
    features: ['Handcrafted Butterfly Loops', 'Lightweight Free-Falling Body', 'Includes Hair & Edge Conditioning', '4-6 Weeks Longevity'],
    recommendedHairType: 'Natural Hair (Medium to Thick)',
    popular: false
  },
  {
    id: 'silk-press-organic-spa',
    title: 'Silk Press & Detox Scalp Spa',
    category: 'Styling',
    image: '/src/assets/images/style_stitch_braids_1792949105360.jpg',
    rating: 4.96,
    reviewsCount: 152,
    priceNGN: 28000,
    duration: '2 hrs',
    stylist: MASTER_STYLISTS.folake,
    location: 'Ugbor GRA, Benin City',
    hairIncluded: false,
    depositPercentage: 30,
    description: 'Clarifying peppermint tea tree wash, ozone steam treatment, customized protein mask, and featherlight titanium silk press with glass hair mirror shine.',
    features: ['Ozone Deep Steam Treatment', 'Split End Dusting', 'Zero Heat Damage Guarantee', 'Glass-Shine Lightweight Movement'],
    recommendedHairType: 'All Natural Textures',
    popular: false
  }
];

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'argan-silk-growth-oil',
    title: 'Argan Silk Growth Oil',
    subtitle: 'Nourishing Scalp & Braid Elixir',
    description: 'Cold-pressed Moroccan argan with rosemary & peppermint to soothe braid tension, stimulate growth, and eliminate flakes.',
    priceNGN: 8500,
    image: '/src/assets/images/product_argan_oil_1793145590310.jpg',
    volumeOrSize: '50ml Glass Dropper',
    badge: 'Bestseller'
  },
  {
    id: 'edge-control-pomade',
    title: 'Edge Control Pomade',
    subtitle: '48H Sleek Maximum Hold',
    description: 'Non-greasy, crystal-clear formulation infused with Jamaican black castor oil for glass-slick edges with zero white residue.',
    priceNGN: 6000,
    image: '/src/assets/images/product_edge_control_1793145590801.jpg',
    volumeOrSize: '100g Matte Jar',
    badge: 'Zero Flakes'
  },
  {
    id: 'luxury-satin-bonnet',
    title: 'Luxury Satin Bonnet',
    subtitle: 'Reversible Mulberry Silk Touch',
    description: 'Double-layered champagne gold and obsidian black bonnet that locks in moisture and keeps your knotless braids pristine for weeks.',
    priceNGN: 7500,
    image: '/src/assets/images/product_satin_bonnet_1793145591451.jpg',
    volumeOrSize: 'Extra Large Jumbo Size',
    badge: 'Hair Protection'
  },
  {
    id: 'deep-repair-hair-mask',
    title: 'Deep Repair Hair Mask',
    subtitle: 'Keratin & Botanical Steam Treatment',
    description: 'Ultra-rich regenerative restorative treatment that intensely hydrates dry curls, mends cuticles, and revitalizes natural hair.',
    priceNGN: 12000,
    image: '/src/assets/images/product_hair_mask_1793145592236.jpg',
    volumeOrSize: '150ml Salon Pot',
    badge: 'Intense Moisture'
  }
];

export const CATEGORIES: { id: CategoryType; label: string; count: number; image: string }[] = [
  { id: 'All', label: 'All Styles', count: 8, image: '/src/assets/images/hero_boho_braids_1792949103763.jpg' },
  { id: 'Braids', label: 'Braids', count: 3, image: '/src/assets/images/style_stitch_braids_1792949105360.jpg' },
  { id: 'Knotless', label: 'Knotless', count: 1, image: '/src/assets/images/style_knotless_braids_1792949104430.jpg' },
  { id: 'Locs', label: 'Soft Locs', count: 2, image: '/src/assets/images/style_soft_locs_1792949103926.jpg' },
  { id: 'Wig Revamp', label: 'Wig Revamp', count: 1, image: '/src/assets/images/hero_boho_braids_1792949103763.jpg' },
  { id: 'Styling', label: 'Silk Press', count: 1, image: '/src/assets/images/style_stitch_braids_1792949105360.jpg' }
];

export const LOCAL_REVIEWS: ClientReview[] = [
  {
    id: 'rev-1',
    name: 'Osariemen E.',
    corridor: 'Ugbor GRA, Benin City',
    avatar: '/src/assets/images/avatar_client_osariemen_1793145592061.jpg',
    service: 'Waist-Length Knotless Braids',
    rating: 5,
    date: '2 days ago',
    text: 'The best salon experience I have ever had in Edo State! Zero scalp tension, immaculate parting, and the private AC suite was freezing cold with 24/7 power. Completed in exactly 4 hours as promised!'
  },
  {
    id: 'rev-2',
    name: 'Dr. Ivie Nosa',
    corridor: 'Adesuwa Road Corridor',
    avatar: '/src/assets/images/avatar_client_ivie_1793145608745.jpg',
    service: 'Boho Box Braids (Human Curls)',
    rating: 5,
    date: 'Last week',
    text: 'My boho braids look breathtaking! The human hair curls are authentic raw curls that do not tangle. Transparent pricing on the app made booking peaceful with zero annoying DM loops. The concierge confirmed in minutes.'
  },
  {
    id: 'rev-3',
    name: 'Jessica M.',
    corridor: 'Sapele Road / Boundary Road',
    avatar: '/src/assets/images/avatar_client_jessica_1793145608427.jpg',
    service: '6 Feed-In Precision Stitch Braids',
    rating: 5,
    date: '2 weeks ago',
    text: 'Tiwa is a master artist. Cleanest razor parts I have ever seen and the gated VIP parking in Ugbor made my visit stress-free. From the chilled Chapman to the Starlink wifi, everything was pure luxury!'
  },
  {
    id: 'rev-4',
    name: 'Sophia L.',
    corridor: 'Boundary Road, GRA',
    avatar: '/src/assets/images/avatar_client_osariemen_1793145592061.jpg',
    service: 'Soft Locs 24" Bohemian Finish',
    rating: 5,
    date: '3 weeks ago',
    text: 'The soft locs are so light and flexible! I slept like a baby on night one without any headache. The Argan Silk Growth Oil they used on my scalp smells heavenly. Eterniou is in a league of its own.'
  }
];

export const STUDIO_POLICIES = [
  {
    title: 'Transparent 30% Deposit',
    description: 'Locks in your private stylist slot. Zero waiting in salon queues. Remaining 70% paid at studio upon complete satisfaction.'
  },
  {
    title: 'Premium Hair Included Options',
    description: 'No need to buy your own extensions unless you prefer custom blend. We supply sterile pre-stretched kanekalon & genuine human curl bundles.'
  },
  {
    title: 'VIP Studio Amenities',
    description: 'Guaranteed 24/7 silent generator power, chilled Chapman or espresso, high-speed Starlink Wi-Fi, and private gated parking.'
  },
  {
    title: 'Punctuality & Zero-DM Guarantee',
    description: 'Instant automated booking with immediate WhatsApp concierge confirmation. Your chair is prepped and ready when you walk in.'
  }
];
