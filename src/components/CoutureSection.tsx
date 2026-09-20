import React, { useState } from 'react';
import { LuxuryProduct, Currency } from '../types';
import { LUXURY_COUTURE_ITEMS } from '../data/luxuryData';
import { formatPrice } from '../utils/format';
import { Crown, Sparkles, Scissors, Check, Eye, ShoppingBag, Star, Ruler, Flame } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TiltCard3D } from './TiltCard3D';
import { ScrollReveal } from './ScrollReveal';

interface CoutureSectionProps {
  currentCurrency: Currency;
  onSelectItem: (item: LuxuryProduct) => void;
  onAddToInquiry: (item: LuxuryProduct) => void;
  onToggleWishlist: (item: LuxuryProduct) => void;
  wishlistItems: LuxuryProduct[];
  onRequestBespokeFitting: (details: any) => void;
  searchFilter: string;
}

export const CoutureSection: React.FC<CoutureSectionProps> = ({
  currentCurrency,
  onSelectItem,
  onAddToInquiry,
  onToggleWishlist,
  wishlistItems,
  onRequestBespokeFitting,
  searchFilter,
}) => {
  const { t } = useLanguage();
  // Bespoke Atelier Customizer state (Affordable Custom Tailoring)
  const [selectedSilhouette, setSelectedSilhouette] = useState('Imperial Bridal Ballgown with Train');
  const [selectedFabric, setSelectedFabric] = useState('French Floral Lace & Soft Tulle');
  const [selectedEmbroidery, setSelectedEmbroidery] = useState('Shimmer Crystal & Pearl Micro-Beading');
  const [selectedColorway, setSelectedColorway] = useState('Ivory Pure White');
  const [customMeasurements, setCustomMeasurements] = useState(true);
  const [customizerSubmitted, setCustomizerSubmitted] = useState(false);

  const silhouettes = [
    'Imperial Bridal Ballgown with Train',
    'Sculpted Column Gala Evening Sheath',
    'Mermaid Fit with Floor-Length Ruffle',
    'Venetian Corset with Sheer Royal Cape',
  ];

  const fabrics = [
    'French Floral Lace & Soft Tulle',
    'Stretch Silk Blend Velvet',
    'Lustrous Duchess Satin',
    'Featherweight Chiffon & Organza',
  ];

  const embroideries = [
    'Shimmer Crystal & Pearl Micro-Beading',
    '24K Gold-Tone Metallic Threading',
    'Delicate Floral Appliqué Petals',
    'Minimalist Modern Architectural Satin',
  ];

  const colorways = [
    'Ivory Pure White',
    'Midnight Onyx Black',
    'Champagne Imperial Gold',
    'Royal Emerald Green',
    'Ruby Crimson Velvet',
    'Blush Romantic Rose',
  ];

  const baseCustomizerPrice = 149 + (customMeasurements ? 30 : 0);

  const handleCustomizerSubmit = () => {
    const customDressItem: LuxuryProduct = {
      id: `custom-couture-${Date.now()}`,
      title: `Bespoke ${selectedSilhouette}`,
      brand: "Sheza's Atelier Sur Mesure",
      category: 'couture',
      price: baseCustomizerPrice,
      originalPrice: 450,
      image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=1200&q=80',
      tagline: `${selectedFabric} in ${selectedColorway}`,
      description: `Custom-tailored gown with ${selectedEmbroidery} and ${customMeasurements ? 'made-to-measure custom dimensions' : 'standard fit'}. Handcrafted by Sheza's master ateliers.`,
      details: [selectedFabric, selectedEmbroidery, selectedColorway, customMeasurements ? 'Made-to-Measure Dimensions' : 'Standard Sizing'],
      rarity: 'Bespoke Order',
      sizes: [customMeasurements ? 'Custom Measurements Provided' : 'Standard Fit'],
      colors: [selectedColorway],
      inclusions: ['Luxury Garment Bag', 'Certificate of Atelier Craftsmanship', 'Free Worldwide Courier Dispatch'],
      inStock: true,
    };

    onAddToInquiry(customDressItem);
    setCustomizerSubmitted(true);
    setTimeout(() => setCustomizerSubmitted(false), 3000);
  };

  const filteredCouture = LUXURY_COUTURE_ITEMS.filter((item) => {
    if (!searchFilter) return true;
    return (
      item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.description.toLowerCase().includes(searchFilter.toLowerCase())
    );
  });

  return (
    <section id="couture" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#242018] text-[#f7f6f2]">
      <ScrollReveal>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.3em] uppercase text-[#d4af37] mb-2 font-sans">
            <Crown className="w-3.5 h-3.5" />
            <span>Affordable Haute Couture & Evening Dresses</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-[#f7f6f2] mb-3">
            {t('secCoutureTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-[#a8a49c] font-light leading-relaxed max-w-2xl mx-auto">
            {t('secCoutureSubtitle')}
          </p>
        </div>

      {/* Couture Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-14">
        {filteredCouture.map((item) => (
          <TiltCard3D key={item.id} maxTilt={8} glare={true} scaleOnHover={1.02}>
            <div
              id={`couture-card-${item.id}`}
              className="group flex flex-col h-full bg-[#121218] border border-[#26221a] hover:border-[#d4af37] rounded-2xl overflow-hidden transition-all duration-300 shadow-xl preserve-3d"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-black">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 select-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-xs border border-[#3d3625] text-[9px] tracking-widest uppercase font-semibold text-[#e5c583] flex items-center gap-1 translate-z-40 shadow-lg">
                  <Sparkles className="w-2.5 h-2.5 text-[#d4af37]" />
                  <span>{item.rarity}</span>
                </div>

                {/* Wishlist Toggle Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(item);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/85 border border-[#3d3625] hover:border-[#d4af37] text-[#a8a49c] hover:text-[#e5c583] shadow-lg translate-z-40 transition-all group/heart"
                  aria-label={wishlistItems.some(i => i.id === item.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Flame className={`w-3.5 h-3.5 ${wishlistItems.some(i => i.id === item.id) ? 'text-[#d4af37] fill-[#d4af37]' : 'text-[#7d7971]'} group-hover/heart:scale-125 transition-transform`} />
                </button>

                <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-black/80 text-[8px] tracking-widest uppercase text-[#a8a49c] border border-white/10 translate-z-10">
                  {item.brand}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between preserve-3d">
                <div className="translate-z-20">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-[#d4af37] font-sans">
                      Couture Dress
                    </span>
                    {item.rating && (
                      <div className="flex items-center gap-1 text-[10px] text-[#f7f6f2]">
                        <Star className="w-2.5 h-2.5 fill-[#d4af37] text-[#d4af37]" />
                        <span className="font-medium">{item.rating}</span>
                        <span className="text-[#7d7971]">({item.reviewCount})</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-base font-serif font-light text-[#f7f6f2] group-hover:text-[#e5c583] transition-colors mb-1.5 line-clamp-1 translate-z-30">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#a8a49c] line-clamp-2 mb-3 font-light leading-relaxed">
                    {item.description}
                  </p>

                  {/* Sizes Available */}
                  {item.sizes && (
                    <div className="text-[9px] text-[#a8a49c] mb-3">
                      <span className="font-medium text-[#e5c583]">Sizes: </span>
                      {item.sizes.slice(0, 4).join(', ')}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#221f18] flex items-center justify-between translate-z-40">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-serif font-medium text-[#e5c583]">
                        {formatPrice(item.price, currentCurrency)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-[#736f66] line-through font-light">
                          {formatPrice(item.originalPrice, currentCurrency)}
                        </span>
                      )}
                    </div>
                    <span className="text-[8px] tracking-wider uppercase text-emerald-400 font-sans block">
                      Worldwide Shipping
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onSelectItem(item)}
                      className="p-2 rounded-xl bg-[#181822] text-[#a8a49c] hover:text-[#f7f6f2] hover:border-[#d4af37] border border-[#2b271f] transition-colors"
                      title="View Item"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onAddToInquiry(item)}
                      className="px-3 py-2 rounded-xl btn-3d-gold font-semibold text-[9px] tracking-widest uppercase flex items-center gap-1 shadow-md"
                    >
                      <ShoppingBag className="w-3 h-3 text-black" />
                      <span>{t('cartBag')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard3D>
        ))}
      </div>

      {/* Interactive Bespoke Atelier / Made-to-Measure Customizer in Royal Dark Theme */}
      <div className="bg-[#121218] border border-[#2e291f] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Column: Form & Options */}
          <div className="flex-1 w-full">
            <div className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.3em] uppercase text-[#d4af37] mb-1.5 font-sans">
              <Scissors className="w-3.5 h-3.5" />
              <span>Affordable Custom Tailoring Studio</span>
            </div>
            <h3 className="text-2xl font-serif font-light text-[#f7f6f2] mb-2">
              Custom-Tailor Your Dream Gown
            </h3>
            <p className="text-xs text-[#a8a49c] font-light mb-6 leading-relaxed">
              Get a dress customized to your exact body measurements and color choice. Hand-tailored by our master dressmakers and shipped directly to your door anywhere in the world.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Silhouette */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#a8a49c] font-sans font-medium block mb-1.5">
                  1. Silhouette Cut
                </label>
                <select
                  value={selectedSilhouette}
                  onChange={(e) => setSelectedSilhouette(e.target.value)}
                  className="w-full bg-[#181822] border border-[#2f2b20] rounded-lg px-3 py-2 text-xs text-[#f7f6f2] focus:outline-none focus:border-[#d4af37]"
                >
                  {silhouettes.map((s) => (
                    <option key={s} value={s} className="bg-[#181822] text-[#f7f6f2]">{s}</option>
                  ))}
                </select>
              </div>

              {/* Fabric */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#a8a49c] font-sans font-medium block mb-1.5">
                  2. Fabric & Texture
                </label>
                <select
                  value={selectedFabric}
                  onChange={(e) => setSelectedFabric(e.target.value)}
                  className="w-full bg-[#181822] border border-[#2f2b20] rounded-lg px-3 py-2 text-xs text-[#f7f6f2] focus:outline-none focus:border-[#d4af37]"
                >
                  {fabrics.map((f) => (
                    <option key={f} value={f} className="bg-[#181822] text-[#f7f6f2]">{f}</option>
                  ))}
                </select>
              </div>

              {/* Embroidery */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#a8a49c] font-sans font-medium block mb-1.5">
                  3. Embellishment Style
                </label>
                <select
                  value={selectedEmbroidery}
                  onChange={(e) => setSelectedEmbroidery(e.target.value)}
                  className="w-full bg-[#181822] border border-[#2f2b20] rounded-lg px-3 py-2 text-xs text-[#f7f6f2] focus:outline-none focus:border-[#d4af37]"
                >
                  {embroideries.map((emb) => (
                    <option key={emb} value={emb} className="bg-[#181822] text-[#f7f6f2]">{emb}</option>
                  ))}
                </select>
              </div>

              {/* Colorway */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#a8a49c] font-sans font-medium block mb-1.5">
                  4. Color Palette
                </label>
                <select
                  value={selectedColorway}
                  onChange={(e) => setSelectedColorway(e.target.value)}
                  className="w-full bg-[#181822] border border-[#2f2b20] rounded-lg px-3 py-2 text-xs text-[#f7f6f2] focus:outline-none focus:border-[#d4af37]"
                >
                  {colorways.map((c) => (
                    <option key={c} value={c} className="bg-[#181822] text-[#f7f6f2]">{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Custom Measurements Checkbox */}
            <label className="flex items-center gap-3 p-3.5 rounded-xl bg-[#181822] border border-[#2f2b20] cursor-pointer hover:border-[#d4af37] transition-colors mb-4">
              <input
                type="checkbox"
                checked={customMeasurements}
                onChange={(e) => setCustomMeasurements(e.target.checked)}
                className="w-4 h-4 accent-[#d4af37] rounded"
              />
              <div className="text-xs">
                <span className="font-medium text-[#f7f6f2] flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-[#d4af37]" />
                  Custom Made-to-Measure Tailoring (+{formatPrice(30, currentCurrency)})
                </span>
                <span className="text-[#a8a49c] text-[11px] block mt-0.5">
                  Provide your exact bust, waist, hips, and height measurements for a guaranteed custom fit.
                </span>
              </div>
            </label>
          </div>

          {/* Right Column: Live Summary Dossier */}
          <div className="w-full lg:w-72 bg-[#171720] border border-[#332e22] rounded-xl p-5 flex flex-col justify-between shrink-0 shadow-lg">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-[#d4af37] font-sans font-medium block mb-1">
                Custom Tailoring Order
              </span>
              <h4 className="text-base font-serif font-light text-[#f7f6f2] mb-3">
                Your Custom Gown
              </h4>

              <div className="space-y-2 text-xs border-b border-[#2b271f] pb-3 mb-3 font-sans">
                <div>
                  <span className="text-[#7d7971] block text-[9px] uppercase tracking-wider">Silhouette</span>
                  <span className="text-[#f7f6f2] font-medium text-[11px]">{selectedSilhouette}</span>
                </div>
                <div>
                  <span className="text-[#7d7971] block text-[9px] uppercase tracking-wider">Fabric</span>
                  <span className="text-[#f7f6f2] font-medium text-[11px]">{selectedFabric}</span>
                </div>
                <div>
                  <span className="text-[#7d7971] block text-[9px] uppercase tracking-wider">Color</span>
                  <span className="text-[#f7f6f2] font-medium text-[11px]">{selectedColorway}</span>
                </div>
                <div>
                  <span className="text-[#7d7971] block text-[9px] uppercase tracking-wider">Sizing</span>
                  <span className="text-emerald-400 font-medium text-[11px]">
                    {customMeasurements ? 'Custom Body Measurements' : 'Standard Sizing'}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-[8px] tracking-widest uppercase text-[#7d7971] block font-sans">
                  Tailoring & Dress Price
                </span>
                <span className="text-2xl font-serif font-medium text-[#e5c583]">
                  {formatPrice(baseCustomizerPrice, currentCurrency)}
                </span>
                <span className="text-[9px] text-emerald-400 block mt-0.5">
                  ✓ Free Worldwide Shipping Included
                </span>
              </div>
            </div>

            <button
              onClick={handleCustomizerSubmit}
              disabled={customizerSubmitted}
              className={`w-full py-2.5 rounded-lg font-sans text-[10px] tracking-widest uppercase flex items-center justify-center gap-1.5 transition-all ${
                customizerSubmitted
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-gradient-to-r from-[#d4af37] to-[#b38e2d] text-black font-bold hover:brightness-110 shadow-md'
              }`}
            >
              {customizerSubmitted ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-black" />
                  <span>Add Custom Dress to Cart</span>
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
