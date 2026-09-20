export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR' | 'AED' | 'AUD' | 'CAD' | 'JPY';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number; // relative to USD (1.0)
  name: string;
}

export type Language = 'EN' | 'FR' | 'AR' | 'IT' | 'ES' | 'DE' | 'JA' | 'UR';

export interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}

export type LuxuryCategory = 
  | 'all'
  | 'products'
  | 'couture'
  | 'weddings'
  | 'dating'
  | 'surprises'
  | 'travel';

export interface LuxuryProduct {
  id: string;
  title: string;
  brand: string;
  category: 'jewelry' | 'watches' | 'accessories' | 'couture' | 'charters';
  price: number; // in USD (affordable range: $29 - $249)
  originalPrice?: number; // e.g. MSRP comparison
  rating?: number;
  reviewCount?: number;
  image: string;
  tagline: string;
  description: string;
  details: string[];
  rarity: 'Best Seller' | 'Trending' | 'Affordable Luxury' | 'Handcrafted' | 'Bespoke Order' | 'Limited Edition';
  sizes?: string[];
  colors?: string[];
  inclusions?: string[];
  inStock?: boolean;
}

export interface LuxuryExperience {
  id: string;
  title: string;
  subtitle: string;
  type: 'wedding' | 'dating' | 'surprise' | 'travel';
  location: string;
  priceFrom: number; // in USD (accessible range: $59 - $899)
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  duration: string;
  image: string;
  gallery: string[];
  highlights: string[];
  fullDescription: string;
  itinerary?: { dayOrStep: string; title: string; description: string }[];
  inclusions: string[];
  bespokeOptions?: string[];
}

export interface InquiryItem {
  id: string;
  title: string;
  type: 'product' | 'experience';
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  notes?: string;
}

export interface BespokeTailoringOption {
  silhouette: string;
  fabric: string;
  embroidery: string;
  colorway: string;
  measurementsProvided: boolean;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number; // USD
  estimatedDays: string;
}

export interface OrderConfirmation {
  orderNumber: string;
  trackingNumber: string;
  customerName?: string;
  email?: string;
  country?: string;
  shippingAddress: string | {
    fullName?: string;
    street: string;
    city: string;
    postalCode?: string;
    country: string;
  };
  shippingOption: string;
  items: InquiryItem[];
  subtotal?: number;
  discount?: number;
  shippingFee: number;
  total?: number;
  totalAmount?: number;
  currency?: Currency;
  estimatedDelivery?: string;
  estimatedDeliveryDate?: string;
  placedAt?: string;
}

export type VipTier = 'Bronze' | 'Silver' | 'Gold' | 'Emerald';

export interface UserProfile {
  name: string;
  email: string;
  logoUrl: string;
  tier: VipTier;
  memberSince: string;
  loyaltyPoints: number;
  customLogoUploaded?: boolean;
  phone?: string;
  streetAddress?: string;
  city?: string;
  country?: string;
  vipCode?: string;
}

