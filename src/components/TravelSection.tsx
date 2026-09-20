import React from 'react';
import { LuxuryExperience, Currency } from '../types';
import { LUXURY_TRAVEL_PLANS } from '../data/luxuryData';
import { formatPrice } from '../utils/format';
import { Plane, Sparkles, MapPin, Calendar, Eye, ShoppingBag, Star, Flame } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TiltCard3D } from './TiltCard3D';
import { ScrollReveal } from './ScrollReveal';

interface TravelSectionProps {
  currentCurrency: Currency;
  onSelectExperience: (exp: LuxuryExperience) => void;
  onAddToInquiry: (exp: LuxuryExperience) => void;
  onToggleWishlist: (item: LuxuryExperience) => void;
  wishlistItems: LuxuryExperience[];
  searchFilter: string;
}

export const TravelSection: React.FC<TravelSectionProps> = ({
  currentCurrency,
  onSelectExperience,
  onAddToInquiry,
  onToggleWishlist,
  wishlistItems,
  searchFilter,
}) => {
  const { t } = useLanguage();

  const filteredTravel = LUXURY_TRAVEL_PLANS.filter((trav) => {
    if (!searchFilter) return true;
    return (
      trav.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      trav.subtitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
      trav.location.toLowerCase().includes(searchFilter.toLowerCase()) ||
      trav.fullDescription.toLowerCase().includes(searchFilter.toLowerCase())
    );
  });

  return (
    <section id="travel" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#242018] text-[#f7f6f2]">
      <ScrollReveal>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.3em] uppercase text-[#d4af37] mb-2 font-sans">
            <Plane className="w-3.5 h-3.5" />
            <span>Affordable Worldwide Travel Getaways</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-[#f7f6f2] mb-3">
            {t('secTravelTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-[#a8a49c] font-light leading-relaxed max-w-2xl mx-auto">
            {t('secTravelSubtitle')}
          </p>
        </div>

        {/* Travel Itineraries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredTravel.map((trav) => (
            <TiltCard3D key={trav.id} maxTilt={7} glare={true} scaleOnHover={1.02}>
              <div
                id={`travel-card-${trav.id}`}
                className="group flex flex-col h-full bg-[#121218] border border-[#26221a] hover:border-[#d4af37] rounded-2xl overflow-hidden transition-all duration-300 shadow-xl preserve-3d"
              >
                {/* Image Banner */}
                <div className="relative aspect-[16/9] overflow-hidden bg-black">
                  <img
                    src={trav.image}
                    alt={trav.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-xs border border-[#3d3625] text-[9px] tracking-widest uppercase font-medium text-[#e5c583] flex items-center gap-1.5 translate-z-40 shadow-lg">
                    <MapPin className="w-3 h-3 text-[#d4af37]" />
                    <span>{trav.location}</span>
                  </div>

                  {/* Wishlist Toggle Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(trav);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/85 border border-[#3d3625] hover:border-[#d4af37] text-[#a8a49c] hover:text-[#e5c583] shadow-lg translate-z-40 transition-all group/heart"
                    aria-label={wishlistItems.some(i => i.id === trav.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Flame className={`w-3.5 h-3.5 ${wishlistItems.some(i => i.id === trav.id) ? 'text-[#d4af37] fill-[#d4af37]' : 'text-[#7d7971]'} group-hover/heart:scale-125 transition-transform`} />
                  </button>

                  <div className="absolute bottom-2 right-3 px-2.5 py-0.5 rounded bg-black/80 text-[8px] tracking-widest uppercase text-[#a8a49c] flex items-center gap-1 border border-white/10 translate-z-10">
                    <Calendar className="w-3 h-3 text-[#d4af37]" />
                    <span>{trav.duration}</span>
                  </div>
                </div>

                {/* Travel Details */}
                <div className="p-5 flex-1 flex flex-col justify-between preserve-3d">
                  <div className="translate-z-20">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-[#d4af37] font-sans">
                        All-Inclusive Vacation
                      </span>
                      {trav.rating && (
                        <div className="flex items-center gap-1 text-[10px] text-[#f7f6f2]">
                          <Star className="w-2.5 h-2.5 fill-[#d4af37] text-[#d4af37]" />
                          <span className="font-medium">{trav.rating}</span>
                          <span className="text-[#7d7971]">({trav.reviewCount})</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-serif font-light text-[#f7f6f2] group-hover:text-[#e5c583] transition-colors mb-1 leading-snug translate-z-30">
                      {trav.title}
                    </h3>
                    <p className="text-xs text-[#a8a49c] mb-3 font-light leading-relaxed line-clamp-2">
                      {trav.subtitle}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 mb-5">
                      {trav.highlights.slice(0, 3).map((hl, i) => (
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
                        <span className="text-xl font-serif font-medium text-[#e5c583]">
                          {formatPrice(trav.priceFrom, currentCurrency)}
                        </span>
                        {trav.originalPrice && (
                          <span className="text-xs text-[#736f66] line-through font-light">
                            {formatPrice(trav.originalPrice, currentCurrency)}
                          </span>
                        )}
                      </div>
                      <span className="text-[8px] uppercase tracking-wider text-[#7d7971] block">
                        Per Person • Hotel & Excursions Included
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onSelectExperience(trav)}
                        className="p-2 rounded-xl bg-[#181822] text-[#a8a49c] hover:text-[#f7f6f2] hover:border-[#d4af37] border border-[#2b271f] transition-colors"
                        title="View Itinerary"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onAddToInquiry(trav)}
                        className="px-3.5 py-2 rounded-xl btn-3d-gold font-semibold font-sans text-[9px] tracking-widest uppercase flex items-center gap-1 shadow-md"
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
