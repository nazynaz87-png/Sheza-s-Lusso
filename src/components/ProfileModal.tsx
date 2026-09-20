import React, { useState, useRef } from 'react';
import { 
  X, 
  Crown, 
  Sparkles, 
  Upload, 
  Check, 
  ShieldCheck, 
  Truck, 
  User, 
  Mail, 
  MapPin, 
  Phone, 
  Award,
  Gem,
  RefreshCw,
  Camera,
  Trophy
} from 'lucide-react';
import { UserProfile, Currency, VipTier } from '../types';
import { VipBadge, getVipTier } from './VipBadge';
import { Leaderboard } from './Leaderboard';

const TIER_BENEFITS: Record<VipTier, { 
  discount: string; 
  shipping: string; 
  concierge: string; 
  perks: string[];
}> = {
  Bronze: {
    discount: 'None',
    shipping: 'Standard',
    concierge: 'Standard Email',
    perks: ['24/7 Global Support', 'Maison Newsletter Access'],
  },
  Silver: {
    discount: '5% Off',
    shipping: 'Express',
    concierge: 'Priority Email',
    perks: ['Early Collection Access', 'Silver Anniversary Gift'],
  },
  Gold: {
    discount: '10% Off',
    shipping: 'Priority Air',
    concierge: 'Private Dedicated Desk',
    perks: ['Personal AI Stylist', 'Private Sale Invitations', 'Complimentary Alterations'],
  },
  Emerald: {
    discount: '15% Off',
    shipping: 'Free Global Express',
    concierge: '24/7 Royal Concierge',
    perks: ['Unlimited Bespoke Consultations', 'Lifetime Product Warranty', 'VIP Event Passes', 'Home Fitting Service'],
  },
};

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  currentCurrency: Currency;
  onShowToast: (msg: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
  currentCurrency,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'logo' | 'benefits' | 'leaderboard'>('profile');
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone || '+44 20 7946 0912');
  const [streetAddress, setStreetAddress] = useState(userProfile.streetAddress || 'Suite 704, New Bond Street');
  const [city, setCity] = useState(userProfile.city || 'London, Mayfair');
  const [country, setCountry] = useState(userProfile.country || 'United Kingdom');
  const [logoUrl, setLogoUrl] = useState(userProfile.logoUrl || '/sheza_logo.jpg');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Preset Luxury Logos to choose from
  const presetLogos = [
    {
      id: 'sheza-royal-emblem',
      name: "Sheza's Royal Diamond & Gold Rose Monogram",
      url: '/sheza_logo.jpg',
      badge: 'Official Maison Crest',
    },
    {
      id: 'gold-crown-crest',
      name: 'Imperial Golden Crown Monogram',
      url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80',
      badge: 'Royal Heritage',
    },
    {
      id: 'diamond-minimal',
      name: 'Champagne Pavé Diamond Tile',
      url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80',
      badge: 'Haute Joaillerie',
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onShowToast('Please upload a valid image file (PNG, JPG, SVG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setLogoUrl(dataUrl);
        onShowToast('Your custom logo has been uploaded to your profile!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...userProfile,
      name,
      email,
      phone,
      streetAddress,
      city,
      country,
      logoUrl,
      tier: getVipTier(userProfile.loyaltyPoints),
      customLogoUploaded: logoUrl !== '/sheza_logo.jpg',
    };
    onUpdateProfile(updated);
    setSavedSuccess(true);
    onShowToast('Profile display and royal logo saved successfully!');
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      {/* Dark backdrop with gold ambient blur */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-2xl bg-[#0e0e13] border border-[#2d281f] rounded-2xl shadow-2xl overflow-hidden z-10 text-[#f7f6f2]">
        {/* Top Ornate Header */}
        <div className="bg-gradient-to-r from-[#171720] via-[#1f1d17] to-[#171720] px-6 py-4 border-b border-[#2d281f] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#c5a059] p-0.5 overflow-hidden bg-black shadow-sm">
              <img 
                src={logoUrl} 
                alt="Profile Logo" 
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/sheza_logo.jpg';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg text-[#f7f6f2] font-medium tracking-wide">
                  {name || 'VIP Client Profile'}
                </span>
                <VipBadge points={userProfile.loyaltyPoints} />
              </div>
              <span className="text-[10px] text-[#9e9a91] tracking-wider block">
                Maison Member ID: SL-88492 • {userProfile.loyaltyPoints.toLocaleString()} Crown Points
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#181822] text-[#9e9a91] hover:text-[#f7f6f2] hover:bg-[#252533] flex items-center justify-center transition-colors border border-[#2d281f]"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#26221a] bg-[#111117] px-6 text-xs">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 font-medium tracking-wider uppercase text-[10px] sm:text-[11px] border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-[#c5a059] text-[#e5c583]'
                : 'border-transparent text-[#9e9a91] hover:text-[#f7f6f2]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile Details</span>
          </button>
          <button
            onClick={() => setActiveTab('logo')}
            className={`py-3 px-4 font-medium tracking-wider uppercase text-[10px] sm:text-[11px] border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'logo'
                ? 'border-[#c5a059] text-[#e5c583]'
                : 'border-transparent text-[#9e9a91] hover:text-[#f7f6f2]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Royal Logo & Emblem</span>
          </button>
          <button
            onClick={() => setActiveTab('benefits')}
            className={`py-3 px-4 font-medium tracking-wider uppercase text-[10px] sm:text-[11px] border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'benefits'
                ? 'border-[#c5a059] text-[#e5c583]'
                : 'border-transparent text-[#9e9a91] hover:text-[#f7f6f2]'
            }`}
          >
            <Gem className="w-3.5 h-3.5" />
            <span>VIP Rewards & Perks</span>
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`py-3 px-4 font-medium tracking-wider uppercase text-[10px] sm:text-[11px] border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'leaderboard'
                ? 'border-[#c5a059] text-[#e5c583]'
                : 'border-transparent text-[#9e9a91] hover:text-[#f7f6f2]'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Global Elite</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[72vh] overflow-y-auto">
          {/* TAB 1: Profile Information */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSave} className="space-y-4">
              {/* Profile Card Highlight */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#171722] to-[#14141c] border border-[#2e291f] flex flex-col sm:flex-row items-center gap-4">
                <div className="relative group shrink-0">
                  <div className="w-20 h-20 rounded-xl border-2 border-[#c5a059] overflow-hidden bg-black p-1 shadow-lg">
                    <img
                      src={logoUrl}
                      alt="Selected Profile Logo"
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/sheza_logo.jpg';
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('logo')}
                    className="absolute inset-0 bg-black/60 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] font-medium tracking-wider uppercase text-[#e5c583] transition-opacity"
                  >
                    Change
                  </button>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-medium block">
                    Profile Badge Display
                  </span>
                  <h4 className="text-lg font-serif font-light text-[#f7f6f2]">{name}</h4>
                  <p className="text-xs text-[#9e9a91] mb-2">{email}</p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#1f1d17] border border-[#3d3424] text-[10px] text-[#e5c583]">
                      <Crown className="w-3 h-3 text-[#c5a059]" />
                      Royal Patron
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#171722] border border-[#2a2736] text-[10px] text-emerald-400">
                      <Truck className="w-3 h-3 text-emerald-400" />
                      Free Worldwide Air Express
                    </span>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#a39f97] block mb-1">
                    Display Name
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-[#a39f97] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full bg-[#13131a] border border-[#2b271f] rounded-lg pl-9 pr-3 py-2 text-xs text-[#f7f6f2] focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#a39f97] block mb-1">
                    Client Email
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-[#a39f97] absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nazn4940@gmail.com"
                      className="w-full bg-[#13131a] border border-[#2b271f] rounded-lg pl-9 pr-3 py-2 text-xs text-[#f7f6f2] focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#a39f97] block mb-1">
                    Phone / WhatsApp (For courier dispatch)
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-[#a39f97] absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+44 20 7946 0912"
                      className="w-full bg-[#13131a] border border-[#2b271f] rounded-lg pl-9 pr-3 py-2 text-xs text-[#f7f6f2] focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#a39f97] block mb-1">
                    Country
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-[#a39f97] absolute left-3 top-3" />
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g. United Kingdom, USA, UAE, India"
                      className="w-full bg-[#13131a] border border-[#2b271f] rounded-lg pl-9 pr-3 py-2 text-xs text-[#f7f6f2] focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>
              </div>

              {/* Saved Shipping Address */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#a39f97] block mb-1">
                  Default Worldwide Delivery Address
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="Street Address, Villa, or Suite"
                    className="w-full bg-[#13131a] border border-[#2b271f] rounded-lg px-3 py-2 text-xs text-[#f7f6f2] focus:outline-none focus:border-[#c5a059]"
                  />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City, State / Province, Postal Code"
                    className="w-full bg-[#13131a] border border-[#2b271f] rounded-lg px-3 py-2 text-xs text-[#f7f6f2] focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-[#26221a] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('logo')}
                  className="text-xs text-[#c5a059] hover:text-[#e5c583] flex items-center gap-1.5 transition-colors"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Customize Logo / Emblem</span>
                </button>

                <button
                  type="submit"
                  disabled={savedSuccess}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#aa882c] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2 shadow-md"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-black" />
                      <span>Profile Saved</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-black" />
                      <span>Save Profile & Logo</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Royal Logo & Emblem Selection / Upload */}
          {activeTab === 'logo' && (
            <div className="space-y-6">
              <div className="text-center max-w-md mx-auto">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-medium block mb-1">
                  Logo Display Configuration
                </span>
                <h3 className="font-serif text-xl text-[#f7f6f2]">
                  Set Your Profile & Brand Logo
                </h3>
                <p className="text-xs text-[#a39f97] mt-1 leading-relaxed">
                  Your chosen logo will be featured on your Profile display badge in the top navigation bar, on VIP order invoices, and on bespoke inquiries.
                </p>
              </div>

              {/* Large Current Logo Preview inside Ornate Plaque */}
              <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#161622] to-[#0e0e14] rounded-2xl border border-[#3b3425] shadow-xl relative overflow-hidden">
                <div className="text-[9px] uppercase tracking-widest text-[#e5c583] mb-3 font-mono">
                  Current Profile Display Logo
                </div>

                {/* Plaque matching user's uploaded image with gold beaded rim */}
                <div className="p-3 bg-gradient-to-br from-[#e5c583] via-[#c5a059] to-[#8d6f2e] rounded-2xl shadow-2xl">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-xl overflow-hidden bg-white p-1 flex items-center justify-center shadow-inner border border-[#d4af37]">
                    <img
                      src={logoUrl}
                      alt="Active Logo"
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/sheza_logo.jpg';
                      }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-[#f7f6f2] font-serif tracking-wide">
                    {logoUrl === '/sheza_logo.jpg' 
                      ? "Sheza's Official Gold & Diamond Rose Emblem" 
                      : "Custom Profile Logo"}
                  </span>
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
              </div>

              {/* Upload Custom Logo Button */}
              <div className="p-4 bg-[#14141d] border border-dashed border-[#3d3527] rounded-xl text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Upload className="w-6 h-6 text-[#c5a059] mx-auto mb-2" />
                <h4 className="text-xs font-semibold text-[#f7f6f2] mb-1">
                  Upload Your Own Custom Logo
                </h4>
                <p className="text-[11px] text-[#9e9a91] mb-3">
                  Upload PNG, JPG, or SVG image file to display your personalized logo across the store.
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-lg bg-[#22212d] hover:bg-[#2d2c3d] border border-[#3b3528] text-xs text-[#e5c583] tracking-wider uppercase font-medium transition-colors"
                >
                  Choose Logo Image
                </button>
              </div>

              {/* Preset Royal Emblems */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#a39f97] block mb-3 font-medium">
                  Or Select Maison Signature Emblems:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {presetLogos.map((preset) => {
                    const isSelected = logoUrl === preset.url;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => {
                          setLogoUrl(preset.url);
                          onShowToast(`Selected ${preset.name}`);
                        }}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                          isSelected
                            ? 'bg-[#1e1c15] border-[#c5a059] shadow-md'
                            : 'bg-[#121219] border-[#29251f] hover:border-[#423c2e]'
                        }`}
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#3d3526] p-0.5 bg-black mb-2">
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <span className="text-[9px] uppercase tracking-wider text-[#c5a059] block mb-0.5">
                          {preset.badge}
                        </span>
                        <span className="text-xs text-[#f7f6f2] font-medium leading-tight">
                          {preset.name}
                        </span>
                        {isSelected && (
                          <div className="mt-2 text-[9px] text-emerald-400 flex items-center gap-1 font-semibold">
                            <Check className="w-3 h-3" /> Active Display
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Apply button */}
              <div className="pt-3 border-t border-[#26221a] flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#aa882c] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2 shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>Apply Logo To Profile Display</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: VIP Rewards & Privileges */}
          {activeTab === 'benefits' && (() => {
            const currentTier = getVipTier(userProfile.loyaltyPoints);
            const benefits = TIER_BENEFITS[currentTier];
            
            return (
              <div className="space-y-4">
                {/* Rewards Card */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-[#1b1912] via-[#15141c] to-[#0f0e15] border border-[#c5a059]/40 relative overflow-hidden shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#e5c583] font-medium block">
                        Royal Privilege Pass
                      </span>
                      <h3 className="font-serif text-2xl text-[#f7f6f2] font-light">
                        {currentTier} Status Benefits
                      </h3>
                    </div>
                    <Crown className="w-8 h-8 text-[#c5a059]" />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[#3b3425] text-xs">
                    <div>
                      <span className="text-[10px] text-[#9e9a91] block">Loyalty Balance</span>
                      <span className="font-serif text-lg text-[#e5c583] font-semibold">
                        {userProfile.loyaltyPoints.toLocaleString()} Pts
                      </span>
                      <span className="text-[10px] text-emerald-400 block">≈ {(userProfile.loyaltyPoints * 0.01).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} Credit</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#9e9a91] block">Member Discount</span>
                      <span className="font-serif text-lg text-[#f7f6f2] font-semibold">
                        {benefits.discount}
                      </span>
                      <span className="text-[10px] text-[#c5a059] block">Auto-applied</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#9e9a91] block">Global Courier</span>
                      <span className="font-serif text-lg text-[#f7f6f2] font-semibold">
                        {benefits.shipping}
                      </span>
                      <span className="text-[10px] text-emerald-400 block">Worldwide Air</span>
                    </div>
                  </div>
                </div>

                {/* Privilege List */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold mb-1">
                    Your Unlocked Privileges:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="p-3 rounded-lg bg-[#13131a] border border-[#28241d] flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#c5a059] shrink-0" />
                      <div>
                        <h5 className="text-[11px] font-semibold text-[#f7f6f2]">
                          {benefits.concierge}
                        </h5>
                        <p className="text-[10px] text-[#9e9a91]">
                          Dedicated support desk for your royal inquiries.
                        </p>
                      </div>
                    </div>
                    
                    {benefits.perks.map((perk, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-[#13131a] border border-[#28241d] flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-[#e5c583] shrink-0" />
                        <span className="text-[11px] text-[#f7f6f2] font-medium">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* VIP Roadmap */}
              <div className="pt-2">
                <h6 className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold mb-3 flex items-center gap-2">
                  <Award className="w-3 h-3" /> VIP Status Roadmap
                </h6>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { tier: 'Bronze', points: 0, color: '#cd7f32' },
                    { tier: 'Silver', points: 500, color: '#c0c0c0' },
                    { tier: 'Gold', points: 1500, color: '#d4af37' },
                    { tier: 'Emerald', points: 5000, color: '#34d399' }
                  ].map((level) => {
                    const isReached = userProfile.loyaltyPoints >= level.points;
                    return (
                      <div key={level.tier} className={`p-2 rounded-lg border text-center transition-all ${isReached ? 'bg-[#1a1810] border-[#d4af37]/30' : 'bg-[#0a0a0e] border-[#222] opacity-50'}`}>
                        <div className="text-[9px] font-bold mb-1" style={{ color: level.color }}>{level.tier}</div>
                        <div className="text-[8px] text-[#9e9a91]">{level.points}+ Pts</div>
                        {isReached && <div className="mt-1 h-0.5 w-full rounded-full" style={{ backgroundColor: level.color }}></div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}
          {/* TAB 4: Global Elite Leaderboard */}
          {activeTab === 'leaderboard' && (
            <Leaderboard currentUser={userProfile} />
          )}
        </div>
      </div>
    </div>
  );
};
