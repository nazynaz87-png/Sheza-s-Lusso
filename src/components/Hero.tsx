import React from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight,
  Gem,
  Crown,
  HeartHandshake,
  Flame,
  Plane,
  Globe,
  Truck,
  ShieldCheck,
  Tag,
  Star,
  Award,
  Layers,
  RotateCw,
  Compass
} from 'lucide-react';
import { MAISON_STATS } from '../data/luxuryData';
import { UserProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { TiltCard3D } from './TiltCard3D';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectCategory: (cat: string) => void;
  onOpenConcierge: () => void;
  userProfile?: UserProfile;
  onOpenProfile?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onSelectCategory,
  onOpenConcierge,
  userProfile,
  onOpenProfile,
}) => {
  const { t } = useLanguage();

  const categoryShortcuts = [
    { label: t('catJewelry'), id: 'products', icon: Gem },
    { label: t('catCouture'), id: 'couture', icon: Crown },
    { label: '3D Royal Atelier', id: 'royal-3d-atelier', icon: Layers, highlight: true },
    { label: t('catWeddings'), id: 'weddings', icon: HeartHandshake },
    { label: t('catDating'), id: 'dating', icon: Flame },
    { label: t('catSurprises'), id: 'surprises', icon: Sparkles },
    { label: t('catTravel'), id: 'travel', icon: Plane },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#09090d] via-[#0e0e16] to-[#08080b] pt-12 sm:pt-16 pb-16 border-b border-[#242018] text-[#f7f6f2] perspective-1000">
      {/* 3D Ambient Holographic Light Spheres in Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-[#d4af37]/8 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-amber-500/5 blur-[100px] pointer-events-none rounded-full" />

      {/* 3D Perspective Floating Floor Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[1400px] h-[600px] grid-3d-plane" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Royal Monogram Center Plaque in 3D Tilt Card */}
        <div className="flex flex-col items-center justify-center mb-6">
          <TiltCard3D maxTilt={15} glare={true} scaleOnHover={1.05}>
            <div 
              onClick={onOpenProfile}
              className="cursor-pointer relative p-2.5 sm:p-3 rounded-2xl plaque-3d-dark border border-[#d4af37]/60 shadow-2xl preserve-3d"
              title="Click to view VIP Lounge & Royal Emblem"
            >
              {/* Floating 3D Glow Ring Behind Logo */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#d4af37]/20 to-transparent blur-md -z-10" />

              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-black p-1 shadow-2xl border border-[#e5c583]/70 preserve-3d">
                <img
                  src={userProfile?.logoUrl || '/sheza_logo.jpg'}
                  alt="Sheza's Lusso Royal Emblem"
                  className="w-full h-full object-cover rounded-lg transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/sheza_logo.jpg';
                  }}
                />
              </div>

              {/* 3D Elevated Royal Badge */}
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#1b1912] border border-[#d4af37] text-[8px] uppercase tracking-widest text-[#e5c583] font-bold whitespace-nowrap shadow-xl translate-z-30">
                Royal 3D Atelier
              </span>
            </div>
          </TiltCard3D>
        </div>

        {/* 3D Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14141c] border border-[#3d3525] shadow-lg mb-5 preserve-3d hover:scale-105 transition-transform">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#e5c583] font-medium font-sans">
            {t('heroBadge')}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </div>

        {/* Hero Title */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#f7f6f2] leading-[1.2] mb-4 max-w-4xl mx-auto tracking-tight">
          <span className="block italic font-normal text-2xl sm:text-4xl lg:text-5xl text-[#d4af37] mb-1 drop-shadow-sm">
            {t('heroTitleLead')}
          </span>
          {t('heroTitleAccent')}
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-[#a8a49c] tracking-wide font-sans font-light leading-relaxed mb-8">
          {t('heroSubtitle')}
        </p>

        {/* Action Buttons: 3D Atelier & AI Stylist */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
          <a
            href="#royal-3d-atelier"
            className="px-6 py-3 rounded-full btn-3d-gold text-black font-semibold text-xs tracking-widest uppercase flex items-center gap-2 shadow-xl"
          >
            <Layers className="w-4 h-4 text-black" />
            <span>Enter 3D Royal Vault</span>
            <ArrowRight className="w-3.5 h-3.5 text-black" />
          </a>

          <button
            onClick={onOpenConcierge}
            className="px-5 py-3 rounded-full bg-[#13131c] hover:bg-[#1c1c28] border border-[#3d3525] hover:border-[#d4af37] text-xs uppercase tracking-widest font-sans font-medium text-[#e5c583] transition-all flex items-center gap-2 shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{t('heroSearchAI')}</span>
          </button>
        </div>

        {/* Royal 3D Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative flex items-center bg-[#13131b] border border-[#332e22] rounded-full p-1.5 pl-5 shadow-2xl focus-within:border-[#d4af37] focus-within:shadow-[0_0_25px_rgba(212,175,55,0.2)] transition-all">
            <Search className="w-4 h-4 text-[#d4af37] mr-3 shrink-0" />
            <input
              id="hero-global-search"
              type="text"
              placeholder={t('heroSearchPlaceholder')}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-transparent text-[#f7f6f2] placeholder-[#7d7971] text-xs sm:text-sm focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-xs text-[#a8a49c] hover:text-[#f7f6f2] px-2 py-1 mr-1"
              >
                {t('heroClear')}
              </button>
            )}
            <button
              onClick={onOpenConcierge}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full btn-3d-gold font-sans text-[10px] sm:text-[11px] tracking-widest uppercase font-bold shrink-0 shadow-md"
            >
              <span>{t('heroSearchAI')}</span>
              <ArrowRight className="w-3 h-3 text-black" />
            </button>
          </div>
        </div>

        {/* Category Navigation Pills with 3D Tactile Styling */}
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto mb-10">
          {categoryShortcuts.map((cat) => {
            const Icon = cat.icon;
            return (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all shadow-sm ${
                  cat.highlight
                    ? 'bg-gradient-to-r from-[#241f14] to-[#1a1710] border-[#d4af37] text-[#e5c583] hover:scale-105 shadow-[#d4af37]/20'
                    : 'bg-[#13131b] border-[#2b271f] hover:border-[#d4af37] hover:bg-[#1f1d16] text-xs text-[#a8a49c] hover:text-[#e5c583]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[#d4af37] transition-colors" />
                <span className="tracking-widest uppercase text-[10px] font-sans font-medium">{cat.label}</span>
              </a>
            );
          })}
        </div>

        {/* Value Trust Grid in 3D Tilt Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-10 text-left">
          <TiltCard3D maxTilt={8} glare={true} scaleOnHover={1.03}>
            <div className="p-3.5 bg-[#121218] border border-[#26221a] hover:border-[#d4af37]/60 rounded-2xl flex items-center gap-3 transition-colors shadow-lg h-full">
              <div className="w-10 h-10 rounded-xl bg-[#1a1922] border border-[#332e22] flex items-center justify-center shrink-0 shadow-inner">
                <Truck className="w-4 h-4 text-[#d4af37]" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#f7f6f2]">{t('valWorldwideTitle')}</div>
                <div className="text-[10px] text-[#a8a49c]">{t('valWorldwideDesc')}</div>
              </div>
            </div>
          </TiltCard3D>

          <TiltCard3D maxTilt={8} glare={true} scaleOnHover={1.03}>
            <div className="p-3.5 bg-[#121218] border border-[#26221a] hover:border-[#d4af37]/60 rounded-2xl flex items-center gap-3 transition-colors shadow-lg h-full">
              <div className="w-10 h-10 rounded-xl bg-[#1a1922] border border-[#332e22] flex items-center justify-center shrink-0 shadow-inner">
                <Tag className="w-4 h-4 text-[#d4af37]" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#f7f6f2]">{t('valPricingTitle')}</div>
                <div className="text-[10px] text-[#a8a49c]">{t('valPricingDesc')}</div>
              </div>
            </div>
          </TiltCard3D>

          <TiltCard3D maxTilt={8} glare={true} scaleOnHover={1.03}>
            <div className="p-3.5 bg-[#121218] border border-[#26221a] hover:border-[#d4af37]/60 rounded-2xl flex items-center gap-3 transition-colors shadow-lg h-full">
              <div className="w-10 h-10 rounded-xl bg-[#1a1922] border border-[#332e22] flex items-center justify-center shrink-0 shadow-inner">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#f7f6f2]">{t('valGuaranteeTitle')}</div>
                <div className="text-[10px] text-[#a8a49c]">{t('valGuaranteeDesc')}</div>
              </div>
            </div>
          </TiltCard3D>

          <TiltCard3D maxTilt={8} glare={true} scaleOnHover={1.03}>
            <div className="p-3.5 bg-[#121218] border border-[#26221a] hover:border-[#d4af37]/60 rounded-2xl flex items-center gap-3 transition-colors shadow-lg h-full">
              <div className="w-10 h-10 rounded-xl bg-[#1a1922] border border-[#332e22] flex items-center justify-center shrink-0 shadow-inner">
                <Star className="w-4 h-4 text-[#d4af37]" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#f7f6f2]">{t('valRatingTitle')}</div>
                <div className="text-[10px] text-[#a8a49c]">{t('valRatingDesc')}</div>
              </div>
            </div>
          </TiltCard3D>
        </div>

        {/* Maison Accolades / Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-6 border-t border-[#242018]">
          {MAISON_STATS.map((stat, idx) => (
            <div key={idx} className="p-1">
              <div className="font-serif text-2xl sm:text-3xl font-light text-[#e5c583]">
                {stat.value}
              </div>
              <div className="text-[10px] tracking-widest uppercase text-[#a8a49c] font-sans mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
