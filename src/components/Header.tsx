import React, { useState } from 'react';
import { Currency, UserProfile, Language } from '../types';
import { CURRENCIES } from '../data/luxuryData';
import { SUPPORTED_LANGUAGES } from '../i18n/translations';
import { useLanguage } from '../context/LanguageContext';
import { VipBadge } from './VipBadge';
import { 
  Sparkles, 
  ShoppingBag, 
  Menu, 
  X, 
  Crown, 
  HeartHandshake, 
  Gem, 
  Plane, 
  Flame,
  Bot,
  Globe,
  Truck,
  ShieldCheck,
  User,
  Layers
} from 'lucide-react';

interface HeaderProps {
  currentCurrency: Currency;
  onCurrencyChange: (c: Currency) => void;
  inquiryCount: number;
  wishlistCount: number;
  onOpenInquiryDrawer: () => void;
  onOpenWishlistDrawer: () => void;
  onOpenConcierge: () => void;
  userProfile: UserProfile;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCurrency,
  onCurrencyChange,
  inquiryCount,
  wishlistCount,
  onOpenInquiryDrawer,
  onOpenWishlistDrawer,
  onOpenConcierge,
  userProfile,
  onOpenProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t, isRTL } = useLanguage();

  const navLinks = [
    { name: t('navJewelry'), href: '#products', icon: Gem },
    { name: t('navCouture'), href: '#couture', icon: Crown },
    { name: '3D Royal Atelier', href: '#royal-3d-atelier', icon: Layers },
    { name: t('navWeddings'), href: '#weddings', icon: HeartHandshake },
    { name: t('navDating'), href: '#dating', icon: Flame },
    { name: t('navSurprises'), href: '#surprises', icon: Sparkles },
    { name: t('navTravel'), href: '#travel', icon: Plane },
    { name: t('navAIStylist'), href: '#concierge', icon: Bot },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#09090d]/95 backdrop-blur-md border-b border-[#242018] text-[#f7f6f2] shadow-xl">
      {/* Top Worldwide Shipping & Royal Announcement Bar */}
      <div className="bg-gradient-to-r from-[#050508] via-[#15130f] to-[#050508] text-[#e5c583] py-2 px-4 text-center text-[10px] sm:text-[11px] tracking-widest uppercase font-medium flex items-center justify-center gap-2 sm:gap-6 flex-wrap border-b border-[#221e16]">
        <span className="flex items-center gap-1.5 text-[#e5c583]">
          <Globe className="w-3.5 h-3.5 shrink-0 text-[#d4af37]" />
          <span>{t('topWorldwideShipping')}</span>
        </span>
        <span className="hidden md:inline text-[#e5c583]/30">•</span>
        <span className="flex items-center gap-1.5 text-emerald-400">
          <Truck className="w-3.5 h-3.5 shrink-0" />
          <span>{t('freeShippingNotice')}</span>
        </span>
        <span className="hidden md:inline text-[#e5c583]/30">•</span>
        <span className="hidden sm:flex items-center gap-1.5 text-[#c5a059]">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span>{t('topCertified')} • {t('topReturns')}</span>
        </span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          id="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#e5c583] hover:text-white transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Brand Title with User's Royal Logo Monogram (with 3D subtle depth) */}
        <a href="#" className="flex items-center gap-3 group text-left">
          {/* Logo Plaque matching user's monogram with 3D bevel and glow */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-[#c5a059] p-0.5 overflow-hidden bg-black shadow-lg shrink-0 group-hover:border-[#e5c583] group-hover:scale-105 transition-all relative transform duration-300">
            <img 
              src={userProfile.logoUrl || '/sheza_logo.jpg'} 
              alt="Sheza's Lusso Logo" 
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/sheza_logo.jpg';
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl tracking-[0.16em] font-light uppercase text-[#f7f6f2] group-hover:text-[#e5c583] transition-colors flex items-center gap-1.5">
              <span>Sheza's Lusso</span>
            </span>
            <span className="font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.28em] text-[#a39f97] font-medium">
              World of Royal Luxury & 3D Atelier
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-5 text-[11px] uppercase tracking-widest text-[#a8a49c]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-[#e5c583] font-medium transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Actions: Language Switcher + Profile + Currency + Cart + AI Stylist */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* LANGUAGE SWITCHER DROPDOWN */}
          <div className="relative">
            <select
              id="header-language-switcher"
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-[#14141c] text-[#e5c583] text-[11px] font-sans font-medium tracking-wide rounded-lg border border-[#332e22] px-2 py-1.5 focus:outline-none focus:border-[#d4af37] cursor-pointer hover:border-[#c5a059] transition-colors shadow-sm"
              aria-label="Change Language"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-[#14141c] text-[#f7f6f2]">
                  {lang.flag} {lang.code} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>

          {/* CLIENT PROFILE DISPLAY BUTTON */}
          <button
            id="client-profile-display-btn"
            onClick={onOpenProfile}
            className="flex items-center gap-2 px-2 sm:px-2.5 py-1.5 rounded-lg bg-[#14141c] hover:bg-[#1f1e29] border border-[#332e22] hover:border-[#c5a059] text-[#f7f6f2] transition-all shadow-sm group"
            title="Open Client Profile & VIP Lounge"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#d4af37] p-0.5 overflow-hidden bg-black shrink-0">
              <img
                src={userProfile.logoUrl || '/sheza_logo.jpg'}
                alt="Profile Logo"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/sheza_logo.jpg';
                }}
              />
            </div>
            <div className="text-left hidden lg:block">
              <span className="text-[10px] font-semibold text-[#f7f6f2] block leading-tight group-hover:text-[#e5c583] transition-colors">
                {userProfile.name.split(' ')[0]}
              </span>
              <VipBadge points={userProfile.loyaltyPoints} className="mt-0.5" />
            </div>
          </button>

          {/* Currency Switcher */}
          <div className="relative">
            <select
              id="currency-selector"
              value={currentCurrency}
              onChange={(e) => onCurrencyChange(e.target.value as Currency)}
              className="bg-[#14141c] text-[#e5c583] text-[11px] font-sans font-medium tracking-wider rounded-lg border border-[#332e22] px-2 py-1.5 focus:outline-none focus:border-[#d4af37] cursor-pointer hover:border-[#c5a059] transition-colors shadow-sm"
              aria-label="Select local currency"
            >
              {Object.keys(CURRENCIES).map((curr) => (
                <option key={curr} value={curr} className="bg-[#14141c] text-[#f7f6f2]">
                  {curr} ({CURRENCIES[curr].symbol})
                </option>
              ))}
            </select>
          </div>

          {/* AI Concierge quick trigger */}
          <button
            id="ai-concierge-quick-btn"
            onClick={onOpenConcierge}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-widest font-sans bg-[#17161f] text-[#f7f6f2] border border-[#332e22] hover:bg-[#22212d] hover:border-[#c5a059] hover:text-[#e5c583] transition-all shadow-sm"
          >
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            <span>{t('navAIStylist')}</span>
          </button>

          {/* Wishlist Trigger */}
          <button
            id="wishlist-trigger"
            onClick={onOpenWishlistDrawer}
            className="relative p-2 rounded-lg bg-[#14141c] hover:bg-[#1f1e29] border border-[#332e22] hover:border-[#d4af37] text-[#a8a49c] hover:text-[#e5c583] transition-all shadow-sm group"
            title="My Wishlist"
          >
            <Flame className={`w-4 h-4 ${wishlistCount > 0 ? 'text-[#d4af37] fill-[#d4af37]' : ''} group-hover:scale-110 transition-transform`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#d4af37] text-black font-bold text-[8px] min-w-3.5 h-3.5 px-0.5 rounded-full flex items-center justify-center border border-black animate-pulse">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Cart Trigger with 3D tactile button */}
          <button
            id="inquiry-bag-trigger"
            onClick={onOpenInquiryDrawer}
            className="relative flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-lg btn-3d-gold font-semibold shadow-md"
            aria-label="View Shopping Cart & Checkout"
          >
            <ShoppingBag className="w-4 h-4 text-black" />
            <span className="text-[11px] tracking-wider uppercase hidden sm:inline font-bold">
              {t('cartBag')}
            </span>
            {inquiryCount > 0 && (
              <span className="bg-black text-[#e5c583] font-bold text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center border border-[#d4af37]">
                {inquiryCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e0e14] border-b border-[#242018] px-6 py-5 space-y-3">
          {/* Profile row */}
          <div className="flex items-center justify-between pb-2 border-b border-[#242018]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-[#d4af37] overflow-hidden bg-black p-0.5">
                <img
                  src={userProfile.logoUrl || '/sheza_logo.jpg'}
                  alt="Profile Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="text-xs font-semibold text-[#f7f6f2] block">{userProfile.name}</span>
                <span className="text-[9px] uppercase tracking-widest text-[#c5a059]">{userProfile.tier}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProfile();
              }}
              className="text-[10px] uppercase tracking-wider text-[#e5c583] px-2.5 py-1 rounded bg-[#1b1a24] border border-[#3b3425]"
            >
              My Profile
            </button>
          </div>

          {/* Language selector in mobile */}
          <div className="py-2 flex items-center justify-between border-b border-[#1c1b24]">
            <span className="text-xs text-[#a8a49c] uppercase tracking-wider font-medium flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
              Language:
            </span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-[#161622] text-[#e5c583] text-xs px-2.5 py-1 rounded border border-[#332e22]"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.nativeName}
                </option>
              ))}
            </select>
          </div>

          <div className="text-[10px] uppercase tracking-widest text-[#8a867e] font-sans pt-1">
            Shop Royal Collections
          </div>
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#a8a49c] hover:text-[#e5c583] py-2 border-b border-[#1c1b24]"
              >
                <Icon className="w-3.5 h-3.5 text-[#d4af37]" />
                {link.name}
              </a>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConcierge();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg btn-3d-gold font-sans text-xs tracking-widest uppercase font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              AI Styling & Event Planner
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
