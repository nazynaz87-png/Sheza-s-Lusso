import React, { useState } from 'react';
import { LuxuryProduct, Currency } from '../types';
import { LUXURY_PRODUCTS } from '../data/luxuryData';
import { formatPrice } from '../utils/format';
import { Gem, Eye, ShoppingBag, Star, Check, Globe, Sparkles, Flame } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TiltCard3D } from './TiltCard3D';
import { ScrollReveal } from './ScrollReveal';

interface ProductSectionProps {
  currentCurrency: Currency;
  onSelectItem: (item: LuxuryProduct) => void;
  onAddToInquiry: (item: LuxuryProduct) => void;
  onToggleWishlist: (item: LuxuryProduct) => void;
  wishlistItems: LuxuryProduct[];
  searchFilter: string;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  currentCurrency,
  onSelectItem,
  onAddToInquiry,
  onToggleWishlist,
  wishlistItems,
  searchFilter,
}) => {
  const { t } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'jewelry' | 'watches' | 'charters' | 'accessories'>('all');
  const [priceSort, setPriceSort] = useState<'all' | 'under75' | '75to125' | 'over125'>('all');

  const filteredProducts = LUXURY_PRODUCTS.filter((prod) => {
    const matchesTab = activeSubTab === 'all' || prod.category === activeSubTab;
    const matchesSearch = 
      !searchFilter ||
      prod.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      prod.brand.toLowerCase().includes(searchFilter.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchFilter.toLowerCase());
    
    let matchesPrice = true;
    if (priceSort === 'under75') matchesPrice = prod.price < 75;
    if (priceSort === '75to125') matchesPrice = prod.price >= 75 && prod.price <= 125;
    if (priceSort === 'over125') matchesPrice = prod.price > 125;

    return matchesTab && matchesSearch && matchesPrice;
  });

  return (
    <section id="products" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#242018] text-[#f7f6f2]">
      <ScrollReveal>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.3em] uppercase text-[#d4af37] mb-2 font-sans">
            <Gem className="w-3.5 h-3.5" />
            <span>Affordable Fine Jewelry & Timepieces</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-[#f7f6f2] mb-3">
            {t('secJewelryTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-[#a8a49c] font-light leading-relaxed max-w-2xl mx-auto">
            {t('secJewelrySubtitle')}
          </p>

          {/* Filter Sub-Tabs & Price Filters */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'jewelry', label: 'Fine Jewelry' },
              { id: 'watches', label: 'Timepieces' },
              { id: 'accessories', label: 'Leather & Accessories' },
              { id: 'charters', label: 'Coastal Experiences' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-[10px] tracking-widest uppercase transition-all font-sans ${
                  activeSubTab === tab.id
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#b38e2d] text-black font-bold shadow-md'
                    : 'bg-[#14141c] text-[#a8a49c] hover:text-[#e5c583] hover:border-[#3d3625] border border-[#2b271f]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Budget Quick Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            <span className="text-[10px] uppercase tracking-widest text-[#7a766e] font-sans self-center mr-1">
              Budget:
            </span>
            {[
              { id: 'all', label: 'All Prices' },
              { id: 'under75', label: 'Under $75' },
              { id: '75to125', label: '$75 - $125' },
              { id: 'over125', label: '$125+' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPriceSort(p.id as any)}
                className={`px-2.5 py-1 rounded text-[9px] tracking-wider uppercase font-sans transition-all ${
                  priceSort === p.id
                    ? 'bg-[#d4af37] text-black font-bold'
                    : 'bg-[#121219] text-[#a8a49c] hover:text-[#e5c583] border border-[#252119]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Interactive Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((prod) => (
            <TiltCard3D key={prod.id} maxTilt={9} glare={true} scaleOnHover={1.02}>
              <div
                id={`product-card-${prod.id}`}
                className="group flex flex-col h-full bg-[#121218] border border-[#26221a] hover:border-[#d4af37] rounded-2xl overflow-hidden transition-all duration-300 shadow-xl preserve-3d"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                    referrerPolicy="no-referrer"
                  />
                  {/* 3D Elevated Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-xs border border-[#3d3625] text-[9px] tracking-widest uppercase font-semibold text-[#e5c583] flex items-center gap-1 shadow-lg translate-z-20">
                    <Sparkles className="w-2.5 h-2.5 text-[#d4af37]" />
                    <span>{prod.rarity}</span>
                  </div>
                  
                  {/* Worldwide delivery tag */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/85 border border-emerald-500/40 text-emerald-300 text-[9px] tracking-wider uppercase flex items-center gap-1 shadow-lg translate-z-20">
                    <Globe className="w-2.5 h-2.5 text-emerald-400" />
                    <span>Worldwide</span>
                  </div>

                  {/* Wishlist Toggle Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(prod);
                    }}
                    className="absolute top-12 right-3 p-2 rounded-full bg-black/85 border border-[#3d3625] hover:border-[#d4af37] text-[#a8a49c] hover:text-[#e5c583] shadow-lg translate-z-40 transition-all group/heart"
                    aria-label={wishlistItems.some(i => i.id === prod.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Flame className={`w-3.5 h-3.5 ${wishlistItems.some(i => i.id === prod.id) ? 'text-[#d4af37] fill-[#d4af37]' : 'text-[#7d7971]'} group-hover/heart:scale-125 transition-transform`} />
                  </button>

                  {/* Brand Watermark */}
                  <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-black/80 text-[8px] tracking-widest uppercase text-[#a8a49c] border border-white/10">
                    {prod.brand}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-[#d4af37] font-sans">
                        {prod.category}
                      </span>
                      {/* Rating Stars */}
                      {prod.rating && (
                        <div className="flex items-center gap-1 text-[11px] text-[#f7f6f2]">
                          <Star className="w-3 h-3 fill-[#d4af37] text-[#d4af37]" />
                          <span className="font-medium">{prod.rating}</span>
                          <span className="text-[#8a867e] text-[10px]">({prod.reviewCount})</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-serif font-light text-[#f7f6f2] group-hover:text-[#e5c583] transition-colors mb-1.5 leading-snug">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-[#a8a49c] line-clamp-2 mb-3 font-light leading-relaxed">
                      {prod.description}
                    </p>

                    {/* Key Specs Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {prod.details.slice(0, 2).map((detail, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] px-2 py-0.5 rounded bg-[#181822] text-[#c4c0b6] border border-[#2e2a20]"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>

                    {/* Stock & Shipping Guarantee */}
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium mb-4">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>In Stock • Dispatched within 24-48 Hours</span>
                    </div>
                  </div>

                  {/* Price & Add to Cart Footer */}
                  <div className="pt-3 border-t border-[#221f18] flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-serif font-medium text-[#e5c583]">
                          {formatPrice(prod.price, currentCurrency)}
                        </span>
                        {prod.originalPrice && (
                          <span className="text-xs text-[#736f66] line-through font-light">
                            {formatPrice(prod.originalPrice, currentCurrency)}
                          </span>
                        )}
                      </div>
                      <span className="text-[8px] tracking-widest uppercase text-emerald-400 font-sans block">
                        {prod.price >= 75 ? 'Free Worldwide Shipping' : 'Standard Post $9.99'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectItem(prod)}
                        className="p-2.5 rounded-xl bg-[#181822] text-[#a8a49c] hover:text-[#f7f6f2] hover:border-[#d4af37] border border-[#2b271f] transition-colors"
                        title="Quick Details"
                        aria-label={`View details for ${prod.title}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onAddToInquiry(prod)}
                        className="px-3.5 py-2.5 rounded-xl btn-3d-gold font-semibold text-[10px] tracking-widest uppercase flex items-center gap-1.5 shadow-md"
                        aria-label={`Add ${prod.title} to cart`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-black" />
                        <span>{t('addToCart')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-[#121218] rounded-xl border border-[#2e291f] mt-6">
            <p className="text-xs text-[#a8a49c] uppercase tracking-wider font-sans">No products match your selected budget or filter.</p>
            <button
              onClick={() => {
                setActiveSubTab('all');
                setPriceSort('all');
              }}
              className="mt-3 text-xs text-[#e5c583] hover:underline uppercase tracking-wider font-sans"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </ScrollReveal>
    </section>
  );
};
