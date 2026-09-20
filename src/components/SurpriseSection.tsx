import React from 'react';
import { LuxuryExperience, Currency } from '../types';
import { LUXURY_SURPRISE_PLANS } from '../data/luxuryData';
import { formatPrice } from '../utils/format';
import { Sparkles, Eye, ShoppingBag, Gift, ShieldAlert, Camera, Star, Flame } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TiltCard3D } from './TiltCard3D';
import { ScrollReveal } from './ScrollReveal';

interface SurpriseSectionProps {
  currentCurrency: Currency;
  onSelectExperience: (exp: LuxuryExperience) => void;
  onAddToInquiry: (exp: LuxuryExperience) => void;
  onToggleWishlist: (item: LuxuryExperience) => void;
  wishlistItems: LuxuryExperience[];
  searchFilter: string;
}

export const SurpriseSection: React.FC<SurpriseSectionProps> = ({
  currentCurrency,
  onSelectExperience,
  onAddToInquiry,
  onToggleWishlist,
  wishlistItems,
  searchFilter,
}) => {
  const { t } = useLanguage();

  const filteredSurprises = LUXURY_SURPRISE_PLANS.filter((surp) => {
    if (!searchFilter) return true;
    return (
      surp.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      surp.subtitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
      surp.location.toLowerCase().includes(searchFilter.toLowerCase()) ||
      surp.fullDescription.toLowerCase().includes(searchFilter.toLowerCase())
    );
  });

  return (
    <section id="surprises" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#242018] text-[#f7f6f2]">
      <ScrollReveal>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.3em] uppercase text-[#d4af37] mb-2 font-sans">
            <Gift className="w-3.5 h-3.5" />
            <span>Affordable Surprise Plans & Curated Gifts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-[#f7f6f2] mb-3">
            {t('secSurprisesTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-[#a8a49c] font-light leading-relaxed max-w-2xl mx-auto">
            {t('secSurprisesSubtitle')}
          </p>
        </div>

        {/* Secret Protocols Banner in Royal Dark Theme with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <TiltCard3D maxTilt={6} glare={true} scaleOnHover={1.02}>
            <div className="p-4 rounded-xl bg-[#121218] border border-[#26221a] flex items-center gap-3.5 shadow-md h-full">
              <div className="w-9 h-9 rounded-lg bg-[#1a1922] border border-[#332e22] flex items-center justify-center shrink-0">
                <ShieldAlert className="w-4 h-4 text-[#d4af37]" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#f7f6f2]">100% Confidential Protocol</div>
                <div className="text-[10px] text-[#a8a49c]">Discrete coordination so the recipient suspects nothing.</div>
              </div>
            </div>
          </TiltCard3D>

          <TiltCard3D maxTilt={6} glare={true} scaleOnHover={1.02}>
            <div className="p-4 rounded-xl bg-[#121218] border border-[#26221a] flex items-center gap-3.5 shadow-md h-full">
              <div className="w-9 h-9 rounded-lg bg-[#1a1922] border border-[#332e22] flex items-center justify-center shrink-0">
                <Camera className="w-4 h-4 text-[#d4af37]" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#f7f6f2]">Secret Photo & Video Capture</div>
                <div className="text-[10px] text-[#a8a49c]">Every priceless reaction recorded with high-res cameras.</div>
              </div>
            </div>
          </TiltCard3D>

          <TiltCard3D maxTilt={6} glare={true} scaleOnHover={1.02}>
            <div className="p-4 rounded-xl bg-[#121218] border border-[#26221a] flex items-center gap-3.5 shadow-md h-full">
              <div className="w-9 h-9 rounded-lg bg-[#1a1922] border border-[#332e22] flex items-center justify-center shrink-0">
                <Gift className="w-4 h-4 text-[#d4af37]" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#f7f6f2]">Hand-Curated Gift Trunks</div>
                <div className="text-[10px] text-[#a8a49c]">Custom wax seals, calligraphy cards, and champagne.</div>
              </div>
            </div>
          </TiltCard3D>
        </div>

        {/* Surprises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {filteredSurprises.map((surp) => (
            <TiltCard3D key={surp.id} maxTilt={8} glare={true} scaleOnHover={1.02}>
              <div
                id={`surprise-card-${surp.id}`}
                className="group flex flex-col h-full bg-[#121218] border border-[#26221a] hover:border-[#d4af37] rounded-2xl overflow-hidden transition-all duration-300 shadow-xl preserve-3d"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={surp.image}
                    alt={surp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-xs border border-[#3d3625] text-[9px] tracking-widest uppercase font-medium text-[#e5c583] translate-z-40 shadow-lg">
                    {surp.location}
                  </div>

                  {/* Wishlist Toggle Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(surp);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/85 border border-[#3d3625] hover:border-[#d4af37] text-[#a8a49c] hover:text-[#e5c583] shadow-lg translate-z-40 transition-all group/heart"
                    aria-label={wishlistItems.some(i => i.id === surp.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Flame className={`w-3.5 h-3.5 ${wishlistItems.some(i => i.id === surp.id) ? 'text-[#d4af37] fill-[#d4af37]' : 'text-[#7d7971]'} group-hover/heart:scale-125 transition-transform`} />
                  </button>

                  <div className="absolute bottom-2 right-3 px-2 py-0.5 rounded bg-black/80 text-[8px] tracking-widest uppercase text-[#a8a49c] border border-white/10 translate-z-10">
                    {surp.duration}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between preserve-3d">
                  <div className="translate-z-20">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-[#d4af37] font-sans">
                        Complete Surprise
                      </span>
                      {surp.rating && (
                        <div className="flex items-center gap-1 text-[10px] text-[#f7f6f2]">
                          <Star className="w-2.5 h-2.5 fill-[#d4af37] text-[#d4af37]" />
                          <span className="font-medium">{surp.rating}</span>
                          <span className="text-[#7d7971]">({surp.reviewCount})</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-base font-serif font-light text-[#f7f6f2] group-hover:text-[#e5c583] transition-colors mb-1 leading-snug translate-z-30">
                      {surp.title}
                    </h3>
                    <p className="text-xs text-[#a8a49c] mb-3 font-light leading-relaxed line-clamp-2">
                      {surp.subtitle}
                    </p>

                    {/* Highlights List */}
                    <div className="space-y-1.5 mb-5">
                      {surp.highlights.slice(0, 3).map((hl, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#a8a49c]">
                          <Sparkles className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#221f18] flex items-center justify-between translate-z-40">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-serif font-medium text-[#e5c583]">
                          {formatPrice(surp.priceFrom, currentCurrency)}
                        </span>
                        {surp.originalPrice && (
                          <span className="text-xs text-[#736f66] line-through font-light">
                            {formatPrice(surp.originalPrice, currentCurrency)}
                          </span>
                        )}
                      </div>
                      <span className="text-[8px] uppercase tracking-wider text-[#7d7971] block">
                        All Setup & Materials Included
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onSelectExperience(surp)}
                        className="p-2 rounded-xl bg-[#181822] text-[#a8a49c] hover:text-[#f7f6f2] hover:border-[#d4af37] border border-[#2b271f] transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onAddToInquiry(surp)}
                        className="px-3 py-2 rounded-xl btn-3d-gold font-semibold font-sans text-[9px] tracking-widest uppercase flex items-center gap-1 shadow-md"
                      >
                        <ShoppingBag className="w-3 h-3 text-black" />
                        <span>{t('bookExperience')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};
