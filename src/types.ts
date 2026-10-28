export type CategoryType = 'All' | 'Braids' | 'Locs' | 'Knotless' | 'Wig Revamp' | 'Styling';

export interface Stylist {
  id: string;
  name: string;
  title: string;
  experience: string;
  bio: string;
  rating: number;
  reviewsCount: number;
  avatar: string;
  specialties: string[];
  location: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: CategoryType;
  image: string;
  rating: number;
  reviewsCount: number;
  priceNGN: number;
  duration: string;
  stylist: Stylist;
  location: string;
  hairIncluded: boolean;
  depositPercentage: number;
  description: string;
  features: string[];
  recommendedHairType: string;
  popular: boolean;
}

export interface ProductItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  priceNGN: number;
  image: string;
  volumeOrSize: string;
  badge?: string;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface ClientReview {
  id: string;
  name: string;
  corridor: string;
  avatar: string;
  service: string;
  rating: number;
  date: string;
  text: string;
}

export interface BookingDetails {
  service: ServiceItem;
  date: string;
  timeSlot: string;
  hairLength: string;
  hairColor: string;
  hairLengthAddonPrice: number;
  addons: string[];
  addonsTotal: number;
  totalPriceNGN: number;
  clientName: string;
  clientPhone: string;
  clientNotes: string;
  bookingRef: string;
  createdAt: string;
}
