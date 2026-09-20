import React, { useState } from 'react';
import { LuxuryExperience, Currency } from '../types';
import { LUXURY_WEDDINGS } from '../data/luxuryData';
import { formatPrice } from '../utils/format';
import { HeartHandshake, Sparkles, MapPin, Check, Eye, ShoppingBag, Music, Flame, Ship, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TiltCard3D } from './TiltCard3D';
import { ScrollReveal } from './ScrollReveal';

interface WeddingSectionProps {
  currentCurrency: Currency;
  onSelectExperience: (exp: LuxuryExperience) => void;
  onAddToInquiry: (exp: LuxuryExperience) => void;
  onToggleWishlist: (item: LuxuryExperience) => void;
  wishlistItems: LuxuryExperience[];
  searchFilter: string;
}

export const WeddingSection: React.FC<WeddingSectionProps> = ({
  currentCurrency,
  onSelectExperience,
  onAddToInquiry,
  onToggleWishlist,
  wishlistItems,
  searchFilter,
}) => {
  const { t } = useLanguage();
  // Affordable Wedding Planner Estimator
  const [estDestination, setEstDestination] = useState('Lake Como Historical Villa');
  const [estGuestTier, setEstGuestTier] = useState(10);
  const [violinist, setViolinist] = useState(true);
  const [cinematicVideo, setCinematicVideo] = useState(true);
  const [sunsetBoat, setSunsetBoat] = useState(true);
  const [estimatorSubmitted, setEstimatorSubmitted] = useState(false);

  const destinationBasePrices: Record<string, number> = {
    'Lake Como Historical Villa': 899,
    'Château de Versailles French Castle': 999,
    'Maldivian Beach & Sandbank Sanctuary': 849,
    'Amalfi Coast Clifftop Terrace': 799,
  };

  const calculatedWeddingTotal = 
    (destinationBasePrices[estDestination] || 899) +
    (estGuestTier === 2 ? 0 : estGuestTier === 10 ? 150 : estGuestTier === 25 ? 350 : 650) +
    (violinist ? 99 : 0) +
    (cinematicVideo ? 149 : 0) +
    (sunsetBoat ? 129 : 0);

  const filteredWeddings = LUXURY_WEDDINGS.filter((wed) => {
    if (!searchFilter) return true;
    return (
      wed.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      wed.subtitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
      wed.location.toLowerCase().includes(searchFilter.toLowerCase()) ||
      wed.fullDescription.toLowerCase().includes(searchFilter.toLowerCase())
    );
  });

  const handleBookCustomWedding = () => {
    onAddToInquiry({
      id: `custom-wedding-${Date.now()}`,
      title: `Custom Wedding: ${estDestination}`,
      subtitle: `All-Inclusive Destination Wedding for ${estGuestTier} Guests`,
      type: 'wedding',
      location: estDestination,
      priceFrom: calculatedWeddingTotal,
      duration: 'Full Day Ceremony & Celebration',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      gallery: ['https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'],
      highlights: [
        `Venue: ${estDestination}`,
        `Attendance: ${estGuestTier} Guests`,
        violinist ? 'Private Live Violinist' : '',
        cinematicVideo ? 'Drone & 4K Master Video' : '',
        sunsetBoat ? 'Sunset Private Boat Excursion' : '',
        'Dedicated Royal Wedding Coordinator',
      ].filter(Boolean),
      fullDescription: `A custom-tailored destination wedding package designed by Sheza's Lusso. Includes venue fees, celebrant, floral arrangements, photography, and selected luxury add-ons.`,
      inclusions: [
        'Venue Exclusive Rental',
        'Bridal Styling Support',
        'Champagne Toast & Gourmet Cake',
        'Official Digital Ceremony Certification',
      ],
      availabilityBadge: 'Instant Reservation',
      rating: 5.0,
      reviewCount: 38,
    });
    setEstimatorSubmitted(true);
    setTimeout(() => setEstimatorSubmitted(false), 3000);
  };

  return (
    <section id="weddings" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#242018] text-[#f7f6f2]">
      <ScrollReveal>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.3em] uppercase text-[#d4af37] mb-2 font-sans">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Affordable Destination Nuptials & Ceremonies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-[#f7f6f2] mb-3">
            {t('secWeddingsTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-[#a8a49c] font-light leading-relaxed max-w-2xl mx-auto">
            {t('secWeddingsSubtitle')}
          </p>
        </div>

      {/* Wedding Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-14">
        {filteredWeddings.map((wed) => (
          <TiltCard3D key={wed.id} maxTilt={8} glare={true} scaleOnHover={1.02}>
            <div
              id={`wedding-card-${wed.id}`}
              className="group flex flex-col h-full bg-[#121218] border border-[#26221a] hover:border-[#d4af37] rounded-2xl overflow-hidden transition-all duration-300 shadow-xl preserve-3d"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={wed.image}
                  alt={wed.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-xs border border-[#3d3625] text-[9px] tracking-widest uppercase font-semibold text-[#e5c583] flex items-center gap-1 translate-z-40 shadow-lg">
                  <MapPin className="w-2.5 h-2.5 text-[#d4af37]" />
                  <span>{wed.location}</span>
                </div>

                {/* Wishlist Toggle Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(wed);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/85 border border-[#3d3625] hover:border-[#d4af37] text-[#a8a49c] hover:text-[#e5c583] shadow-lg translate-z-40 transition-all group/heart"
                  aria-label={wishlistItems.some(i => i.id === wed.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Flame className={`w-3.5 h-3.5 ${wishlistItems.some(i => i.id === wed.id) ? 'text-[#d4af37] fill-[#d4af37]' : 'text-[#7d7971]'} group-hover/heart:scale-125 transition-transform`} />
                </button>

                <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-black/80 text-[8px] tracking-widest uppercase text-[#a8a49c] border border-white/10 translate-z-10">
                  {wed.duration}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between preserve-3d">
                <div className="translate-z-20">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-[#d4af37] font-sans">
                      All-Inclusive Package
                    </span>
                    {wed.rating && (
                      <div className="flex items-center gap-1 text-[10px] text-[#f7f6f2]">
                        <Star className="w-2.5 h-2.5 fill-[#d4af37] text-[#d4af37]" />
                        <span className="font-medium">{wed.rating}</span>
                        <span className="text-[#7d7971]">({wed.reviewCount})</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-serif font-light text-[#f7f6f2] group-hover:text-[#e5c583] transition-colors mb-1 translate-z-30">
                    {wed.title}
                  </h3>
                  <p className="text-xs text-[#a8a49c] mb-3 font-light leading-relaxed line-clamp-2">
                    {wed.subtitle}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-1.5 mb-5">
                    {wed.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#a8a49c]">
                        <Sparkles className="w-3 h-3 text-[#d4af37] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#221f18] flex items-center justify-between translate-z-40">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-serif font-medium text-[#e5c583]">
                        {formatPrice(wed.priceFrom, currentCurrency)}
                      </span>
                      {wed.originalPrice && (
                        <span className="text-xs text-[#736f66] line-through font-light">
                          {formatPrice(wed.originalPrice, currentCurrency)}
                        </span>
                      )}
                    </div>
                    <span className="text-[8px] uppercase tracking-wider text-[#7d7971] block">
                      Complete Ceremony Package
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onSelectExperience(wed)}
                      className="p-2 rounded-xl bg-[#181822] text-[#a8a49c] hover:text-[#f7f6f2] hover:border-[#d4af37] border border-[#2b271f] transition-colors"
                      title="View Package"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onAddToInquiry(wed)}
                      className="px-3 py-2 rounded-xl btn-3d-gold font-semibold text-[9px] tracking-widest uppercase flex items-center gap-1 shadow-md"
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

      {/* Interactive Wedding Package Estimator in Royal Dark Theme */}
      <div className="bg-[#121218] border border-[#2e291f] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.3em] uppercase text-[#d4af37] mb-1.5 font-sans">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customize Your Wedding Package</span>
          </div>
          <h3 className="text-2xl font-serif font-light text-[#f7f6f2] mb-2">
            Build Your Affordable Dream Nuptials
          </h3>
          <p className="text-xs text-[#a8a49c] font-light mb-6">
            Choose your venue location, guest count, and romantic upgrades. Book directly online with 100% transparent pricing and guaranteed date reservation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Destination Selection */}
            <div>
              <label className="text-[10px] uppercase tracking-widest text-[#a8a49c] font-sans font-medium block mb-1.5">
                1. Destination Location
              </label>
              <select
                value={estDestination}
                onChange={(e) => setEstDestination(e.target.value)}
                className="w-full bg-[#181822] border border-[#2f2b20] rounded-lg px-3 py-2 text-xs text-[#f7f6f2] focus:outline-none focus:border-[#d4af37]"
              >
                {Object.keys(destinationBasePrices).map((dest) => (
                  <option key={dest} value={dest} className="bg-[#181822] text-[#f7f6f2]">{dest}</option>
                ))}
              </select>
            </div>

            {/* Guest Count */}
            <div>
              <label className="text-[10px] uppercase tracking-widest text-[#a8a49c] font-sans font-medium block mb-1.5">
                2. Guest Attendance ({estGuestTier} Guests)
              </label>
              <div className="flex gap-2">
                {[2, 10, 25, 50].map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setEstGuestTier(tier)}
                    className={`flex-1 py-2 rounded-lg text-[10px] tracking-wider uppercase transition-all font-sans ${
                      estGuestTier === tier
                        ? 'bg-gradient-to-r from-[#d4af37] to-[#b38e2d] text-black font-bold shadow-md'
                        : 'bg-[#181822] text-[#a8a49c] border border-[#2f2b20] hover:border-[#d4af37] hover:text-[#e5c583]'
                    }`}
                  >
                    {tier === 2 ? 'Just Couple' : `${tier} Guests`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add-ons checkboxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#181822] border border-[#2f2b20] cursor-pointer hover:border-[#d4af37] transition-colors">
              <input
                type="checkbox"
                checked={violinist}
                onChange={(e) => setViolinist(e.target.checked)}
                className="w-4 h-4 accent-[#d4af37] rounded"
              />
              <div className="text-xs">
                <span className="font-medium text-[#f7f6f2] block flex items-center gap-1">
                  <Music className="w-3 h-3 text-[#d4af37]" /> Live Violinist
                </span>
                <span className="text-[10px] text-[#e5c583]">+{formatPrice(99, currentCurrency)}</span>
              </div>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#181822] border border-[#2f2b20] cursor-pointer hover:border-[#d4af37] transition-colors">
              <input
                type="checkbox"
                checked={cinematicVideo}
                onChange={(e) => setCinematicVideo(e.target.checked)}
                className="w-4 h-4 accent-[#d4af37] rounded"
              />
              <div className="text-xs">
                <span className="font-medium text-[#f7f6f2] block flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#d4af37]" /> Drone & 4K Video
                </span>
                <span className="text-[10px] text-[#e5c583]">+{formatPrice(149, currentCurrency)}</span>
              </div>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#181822] border border-[#2f2b20] cursor-pointer hover:border-[#d4af37] transition-colors">
              <input
                type="checkbox"
                checked={sunsetBoat}
                onChange={(e) => setSunsetBoat(e.target.checked)}
                className="w-4 h-4 accent-[#d4af37] rounded"
              />
              <div className="text-xs">
                <span className="font-medium text-[#f7f6f2] block flex items-center gap-1">
                  <Ship className="w-3 h-3 text-[#d4af37]" /> Sunset Boat Cruise
                </span>
                <span className="text-[10px] text-[#e5c583]">+{formatPrice(129, currentCurrency)}</span>
              </div>
            </label>
          </div>

          {/* Live Total & Add to Cart */}
          <div className="p-4 rounded-xl bg-[#171720] border border-[#332e22] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div>
              <span className="text-[9px] text-[#a8a49c] uppercase tracking-widest font-sans block">
                Total All-Inclusive Wedding Package
              </span>
              <span className="text-2xl font-serif font-medium text-[#e5c583]">
                {formatPrice(calculatedWeddingTotal, currentCurrency)}
              </span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">
                ✓ Full date guarantee & flexible rescheduling
              </span>
            </div>

            <button
              onClick={handleBookCustomWedding}
              disabled={estimatorSubmitted}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-sans text-[10px] tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-md ${
                estimatorSubmitted
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-gradient-to-r from-[#d4af37] to-[#b38e2d] text-black font-bold hover:brightness-110'
              }`}
            >
              {estimatorSubmitted ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Package Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-black" />
                  <span>Add Package to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </ScrollReveal>
  </section>
);
};
