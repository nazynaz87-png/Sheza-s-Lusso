import React, { useState } from 'react';
import { LuxuryProduct, LuxuryExperience, Currency } from '../types';
import { formatPrice } from '../utils/format';
import { X, Sparkles, Check, ShieldCheck, ShoppingBag, Star, Globe, Truck, Flame } from 'lucide-react';

interface ItemModalProps {
  item: LuxuryProduct | LuxuryExperience | null;
  currentCurrency: Currency;
  onClose: () => void;
  onAddToInquiry: (item: any) => void;
  onToggleWishlist: (item: any) => void;
  wishlistItems: any[];
}

export const ItemModal: React.FC<ItemModalProps> = ({
  item,
  currentCurrency,
  onClose,
  onAddToInquiry,
  onToggleWishlist,
  wishlistItems,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');

  if (!item) return null;

  const isExperience = 'location' in item;
  const price = isExperience ? (item as LuxuryExperience).priceFrom : (item as LuxuryProduct).price;
  const originalPrice = item.originalPrice;
  const sizes = (item as LuxuryProduct).sizes;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-[#0e0e14] border border-[#2e291f] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row text-[#f7f6f2]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#181822] text-[#a8a49c] hover:text-[#f7f6f2] hover:bg-[#252533] border border-[#2e2a20] transition-colors shadow-md"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Column: Imagery & Highlights */}
        <div className="md:w-1/2 relative bg-black flex flex-col">
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[300px]">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-xs border border-[#3d3625] text-[10px] font-sans font-medium uppercase tracking-widest text-[#e5c583]">
              {isExperience ? (item as LuxuryExperience).location : (item as LuxuryProduct).rarity}
            </div>

            <button
              onClick={() => onToggleWishlist(item)}
              className="absolute top-4 left-40 p-2 rounded-full bg-black/80 border border-[#3d3625] hover:border-[#d4af37] text-[#a8a49c] hover:text-[#e5c583] shadow-md transition-all group/heart"
              aria-label={wishlistItems.some(i => i.id === item.id) ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Flame className={`w-4 h-4 ${wishlistItems.some(i => i.id === item.id) ? 'text-[#d4af37] fill-[#d4af37]' : 'text-[#7d7971]'} group-hover/heart:scale-125 transition-transform`} />
            </button>
            
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/80 text-emerald-300 border border-emerald-500/40 text-[9px] uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-emerald-400" />
              <span>Worldwide Tracked Shipping</span>
            </div>
          </div>
        </div>

        {/* Right Column: Full Dossier in Royal Dark Style */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-medium tracking-widest uppercase text-[#d4af37] font-sans">
                {isExperience ? (item as LuxuryExperience).duration : (item as LuxuryProduct).brand}
              </span>
              {item.rating && (
                <div className="flex items-center gap-1 text-xs text-[#f7f6f2]">
                  <Star className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                  <span className="font-semibold">{item.rating}</span>
                  <span className="text-[#7d7971]">({item.reviewCount} reviews)</span>
                </div>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-light text-[#f7f6f2] mb-1.5 leading-tight">
              {item.title}
            </h3>
            
            {isExperience && (
              <p className="text-xs text-[#e5c583] font-medium mb-2">
                {(item as LuxuryExperience).subtitle}
              </p>
            )}

            <p className="text-xs sm:text-sm text-[#a8a49c] leading-relaxed mb-5 font-light">
              {isExperience ? (item as LuxuryExperience).fullDescription : (item as LuxuryProduct).description}
            </p>

            {/* Sizing options if apparel */}
            {sizes && sizes.length > 0 && (
              <div className="mb-5">
                <span className="text-[10px] font-medium uppercase tracking-widest text-[#f7f6f2] mb-2 block font-sans">
                  Select Size (True to Size Global Fit):
                </span>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-sans border transition-all ${
                        selectedSize === s || (!selectedSize && s === sizes[0])
                          ? 'bg-gradient-to-r from-[#d4af37] to-[#b38e2d] text-black font-bold border-[#d4af37]'
                          : 'bg-[#181822] text-[#a8a49c] border-[#2e2a20] hover:border-[#d4af37] hover:text-[#e5c583]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications / Highlights */}
            <div className="mb-5">
              <h4 className="text-[10px] font-medium uppercase tracking-widest text-[#f7f6f2] mb-2 font-sans">
                {isExperience ? 'Curated Experience Inclusions' : 'Key Specifications & Materials'}
              </h4>
              <div className="space-y-1.5">
                {isExperience
                  ? (item as LuxuryExperience).highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#a8a49c]">
                        <Sparkles className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))
                  : (item as LuxuryProduct).details.map((d, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#a8a49c]">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
              </div>
            </div>

            {/* Inclusions & Guarantees */}
            <div className="mb-5 p-3 rounded-xl bg-[#14141d] border border-[#2e291f]">
              <span className="text-[9px] font-semibold uppercase tracking-widest text-[#d4af37] block mb-1.5 font-sans">
                Sheza's Lusso Global Guarantees
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-[#a8a49c]">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ships to 190+ Countries</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>30-Day Money Back Promise</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-[#242018] flex items-center justify-between gap-4 mt-2">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-serif font-medium text-[#e5c583]">
                  {formatPrice(price, currentCurrency)}
                </span>
                {originalPrice && (
                  <span className="text-sm text-[#736f66] line-through font-light">
                    {formatPrice(originalPrice, currentCurrency)}
                  </span>
                )}
              </div>
              <span className="text-[9px] text-emerald-400 block uppercase font-sans">
                {price >= 75 ? 'Free Worldwide Shipping' : 'Standard Post $9.99'}
              </span>
            </div>

            <button
              onClick={() => {
                const itemToAdd = selectedSize ? { ...item, notes: `Size: ${selectedSize}` } : item;
                onAddToInquiry(itemToAdd);
                onClose();
              }}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b38e2d] text-black font-semibold font-sans text-xs tracking-widest uppercase hover:brightness-110 transition-all flex items-center gap-2 shadow-md"
            >
              <ShoppingBag className="w-4 h-4 text-black" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
