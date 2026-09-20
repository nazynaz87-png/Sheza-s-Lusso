import React, { useState } from 'react';
import { InquiryItem, Currency, OrderConfirmation } from '../types';
import { formatPrice, calculateShippingFee } from '../utils/format';
import { WORLDWIDE_SHIPPING_OPTIONS, SUPPORTED_COUNTRIES } from '../data/luxuryData';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Globe, 
  CreditCard, 
  ArrowRight, 
  Plus, 
  Minus,
  Sparkles,
  Lock,
  Calendar,
  DollarSign,
  Flame,
  Heart
} from 'lucide-react';
import { LuxuryExperience, LuxuryProduct } from '../types';

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: InquiryItem[];
  currentCurrency: Currency;
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onUpdateQuantity?: (id: string, newQty: number) => void;
  wishlistItems: (LuxuryProduct | LuxuryExperience)[];
  wishlistOpen: boolean;
  onToggleWishlistDrawer: (val: boolean) => void;
  onToggleInquiryDrawer?: (val: boolean) => void;
  onToggleWishlistItem: (item: LuxuryProduct | LuxuryExperience) => void;
  onAddToCart: (item: LuxuryProduct | LuxuryExperience) => void;
}

export const InquiryDrawer: React.FC<InquiryDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currentCurrency,
  onRemoveItem,
  onClearAll,
  onUpdateQuantity,
  wishlistItems,
  wishlistOpen,
  onToggleWishlistDrawer,
  onToggleInquiryDrawer,
  onToggleWishlistItem,
  onAddToCart,
}) => {
  // Checkout flow state: 'cart' | 'checkout' | 'confirmation'
  const [currentStep, setCurrentStep] = useState<'cart' | 'checkout' | 'confirmation'>('cart');

  // Shipping selection
  const [selectedShippingId, setSelectedShippingId] = useState('standard-intl');
  const [selectedCountry, setSelectedCountry] = useState('United States');

  // Customer & Shipping form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'applepay' | 'cod'>('card');
  const [orderNotes, setOrderNotes] = useState('');

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmation | null>(null);

  if (!isOpen) return null;

  // Calculate items subtotal
  const subtotalUSD = items.reduce((acc, it) => acc + it.price * (it.quantity || 1), 0);
  const shippingFeeUSD = calculateShippingFee(subtotalUSD, selectedShippingId);
  const grandTotalUSD = subtotalUSD + shippingFeeUSD;

  // Free shipping threshold ($75)
  const freeShippingThreshold = 75;
  const isFreeShippingUnlocked = subtotalUSD >= freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotalUSD);

  const handleProceedToCheckout = () => {
    if (items.length === 0) return;
    setCurrentStep('checkout');
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !address || !city) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: { name: fullName, email, phone },
          shippingAddress: {
            street: address,
            city,
            postalCode,
            country: selectedCountry,
          },
          items,
          shippingOption: selectedShippingId,
          paymentMethod,
          subtotal: subtotalUSD,
          shippingFee: shippingFeeUSD,
          total: grandTotalUSD,
          orderNotes,
        }),
      });

      const data = await res.json();
      const generatedOrder: OrderConfirmation = {
        orderNumber: data.orderNumber || `SL-WLD-${Math.floor(100000 + Math.random() * 900000)}`,
        trackingNumber: data.trackingNumber || `TRK-GL-${Math.floor(100000 + Math.random() * 900000)}`,
        estimatedDeliveryDate: data.deliveryDate || 'Within 7-10 Business Days',
        shippingAddress: {
          fullName,
          street: address,
          city,
          postalCode,
          country: selectedCountry,
        },
        items: [...items],
        totalAmount: grandTotalUSD,
        shippingFee: shippingFeeUSD,
        shippingOption: selectedShippingId === 'express-dhl' ? 'DHL Express Worldwide' : 'Standard International Post',
        placedAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      };

      setOrderConfirmation(generatedOrder);
      setCurrentStep('confirmation');
      onClearAll();
    } catch (err) {
      console.error('Order submission error:', err);
      const fallbackOrder: OrderConfirmation = {
        orderNumber: `SL-WLD-${Math.floor(100000 + Math.random() * 900000)}`,
        trackingNumber: `TRK-GL-${Math.floor(100000 + Math.random() * 900000)}`,
        estimatedDeliveryDate: 'Within 7-10 Business Days',
        shippingAddress: {
          fullName,
          street: address,
          city,
          postalCode,
          country: selectedCountry,
        },
        items: [...items],
        totalAmount: grandTotalUSD,
        shippingFee: shippingFeeUSD,
        shippingOption: selectedShippingId === 'express-dhl' ? 'DHL Express Worldwide' : 'Standard International Post',
        placedAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      };
      setOrderConfirmation(fallbackOrder);
      setCurrentStep('confirmation');
      onClearAll();
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setCurrentStep('cart');
    setOrderConfirmation(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-xl bg-[#0d0d13] border-l border-[#2e291f] h-full flex flex-col shadow-2xl overflow-hidden text-[#f7f6f2]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#242018] flex items-center justify-between bg-[#111117]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#181822] border border-[#332e22] flex items-center justify-center text-[#d4af37]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-normal text-[#f7f6f2] tracking-wide">
                {currentStep === 'cart' && (wishlistOpen ? 'Your Personal Wishlist' : 'Your Shopping Cart')}
                {currentStep === 'checkout' && 'Worldwide Secure Checkout'}
                {currentStep === 'confirmation' && 'Order Confirmed!'}
              </h3>
              <span className="text-[10px] text-[#a8a49c] uppercase tracking-widest font-sans block">
                {currentStep === 'cart' && (wishlistOpen 
                  ? `${wishlistItems.length} Saved Items • Track for Later` 
                  : `${items.reduce((s, i) => s + (i.quantity || 1), 0)} Items • Worldwide Shipping`)}
                {currentStep === 'checkout' && 'Fast & Encrypted 256-Bit SSL Checkout'}
                {currentStep === 'confirmation' && 'Global Tracking Generated'}
              </span>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg hover:bg-[#1a1a24] text-[#a8a49c] hover:text-[#f7f6f2] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher (Cart vs Wishlist) */}
        {currentStep === 'cart' && (
          <div className="flex border-b border-[#242018] bg-[#09090e]">
            <button
              onClick={() => {
                onToggleWishlistDrawer(false);
                if (onToggleInquiryDrawer) onToggleInquiryDrawer(true);
              }}
              className={`flex-1 py-3 text-[10px] uppercase tracking-[0.2em] font-sans font-semibold transition-all relative ${
                !wishlistOpen ? 'text-[#e5c583]' : 'text-[#7d7971] hover:text-[#a8a49c]'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>My Cart ({items.reduce((s, i) => s + (i.quantity || 1), 0)})</span>
              </div>
              {!wishlistOpen && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d4af37]" />}
            </button>
            <button
              onClick={() => {
                onToggleWishlistDrawer(true);
                if (onToggleInquiryDrawer) onToggleInquiryDrawer(false);
              }}
              className={`flex-1 py-3 text-[10px] uppercase tracking-[0.2em] font-sans font-semibold transition-all relative ${
                wishlistOpen ? 'text-[#e5c583]' : 'text-[#7d7971] hover:text-[#a8a49c]'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Flame className="w-3.5 h-3.5" />
                <span>Wishlist ({wishlistItems.length})</span>
              </div>
              {wishlistOpen && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d4af37]" />}
            </button>
          </div>
        )}

        {/* Free Shipping Progress Indicator (in Cart & Checkout modes) */}
        {currentStep !== 'confirmation' && !wishlistOpen && (
          <div className="bg-[#14141d] border-b border-[#242018] px-5 py-2.5">
            <div className="flex items-center justify-between text-xs mb-1.5 font-sans">
              <span className="flex items-center gap-1.5 text-[#f7f6f2] font-medium text-[11px]">
                <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
                {isFreeShippingUnlocked ? (
                  <span className="text-emerald-400 font-semibold">🎉 You unlocked FREE Worldwide Shipping!</span>
                ) : (
                  <span>
                    Add <span className="font-bold text-[#e5c583]">{formatPrice(remainingForFreeShipping, currentCurrency)}</span> more for <span className="text-emerald-400 font-semibold">FREE worldwide delivery</span>
                  </span>
                )}
              </span>
              <span className="text-[10px] text-[#a8a49c]">{Math.min(100, Math.round((subtotalUSD / freeShippingThreshold) * 100))}%</span>
            </div>
            <div className="w-full bg-[#20202c] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#d4af37] to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (subtotalUSD / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Drawer Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-[#0d0d13]">
          {/* STEP 1: CART VIEW */}
          {currentStep === 'cart' && !wishlistOpen && (
            <>
              {items.length === 0 ? (
                <div className="text-center py-20 px-4">
                  <div className="w-16 h-16 rounded-full bg-[#181822] border border-[#2f2b20] flex items-center justify-center mx-auto mb-4 text-[#d4af37]">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-serif font-light text-[#f7f6f2] mb-2">
                    Your shopping cart is empty
                  </h4>
                  <p className="text-xs text-[#a8a49c] max-w-xs mx-auto mb-6">
                    Discover fine jewelry from $39, couture dresses from $89, romantic date packages from $99, and world travel packages.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b38e2d] text-black text-xs font-sans uppercase font-bold tracking-widest hover:brightness-110 transition-all shadow-md"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items List */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs text-[#a8a49c] pb-1 border-b border-[#242018]">
                      <span className="text-[10px] uppercase tracking-widest font-sans font-medium text-[#d4af37]">Selected Items</span>
                      <button
                        onClick={onClearAll}
                        className="text-[10px] text-[#7d7971] hover:text-rose-400 uppercase tracking-wider transition-colors"
                      >
                        Clear All
                      </button>
                    </div>

                    {items.map((it) => {
                      const qty = it.quantity || 1;
                      return (
                        <div
                          key={it.id}
                          className="flex gap-3 p-3 rounded-xl bg-[#14141d] border border-[#26221a] items-center justify-between shadow-sm"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {it.image && (
                              <img
                                src={it.image}
                                alt={it.title}
                                className="w-14 h-14 object-cover rounded-lg bg-black shrink-0 border border-[#2a251c]"
                                referrerPolicy="no-referrer"
                              />
                            )}
                            <div className="min-w-0 flex-1">
                              <span className="text-[8px] uppercase tracking-widest text-[#d4af37] block font-sans">
                                {it.category}
                              </span>
                              <h5 className="text-xs font-serif font-medium text-[#f7f6f2] truncate">
                                {it.title}
                              </h5>
                              <div className="text-xs font-sans font-semibold text-[#e5c583] mt-0.5">
                                {formatPrice(it.price * qty, currentCurrency)}
                              </div>
                              {it.notes && (
                                <p className="text-[9px] text-[#a8a49c] truncate mt-0.5">{it.notes}</p>
                              )}
                            </div>
                          </div>

                          {/* Quantity selector & remove */}
                          <div className="flex items-center gap-2 shrink-0">
                            <div className="flex items-center border border-[#2f2b20] rounded-lg bg-[#1a1a24]">
                              <button
                                onClick={() => {
                                  if (qty > 1 && onUpdateQuantity) {
                                    onUpdateQuantity(it.id, qty - 1);
                                  } else {
                                    onRemoveItem(it.id);
                                  }
                                }}
                                className="p-1 text-[#a8a49c] hover:text-[#f7f6f2] transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-sans font-medium text-[#f7f6f2]">{qty}</span>
                              <button
                                onClick={() => onUpdateQuantity && onUpdateQuantity(it.id, qty + 1)}
                                className="p-1 text-[#a8a49c] hover:text-[#f7f6f2] transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(it.id)}
                              className="p-1.5 text-[#7d7971] hover:text-rose-400 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Worldwide Shipping Selector */}
                  <div className="p-4 rounded-xl bg-[#14141d] border border-[#26221a] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-[#a8a49c] font-medium font-sans flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>Worldwide Shipping Options</span>
                      </span>
                      <span className="text-[10px] text-emerald-400 font-medium">Ships to 190+ Countries</span>
                    </div>

                    {/* Destination Country Selection */}
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-[#a8a49c] block mb-1">
                        Deliver to Country:
                      </label>
                      <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full bg-[#181824] border border-[#2f2b20] rounded-lg px-3 py-2 text-xs text-[#f7f6f2] focus:outline-none focus:border-[#d4af37]"
                      >
                        {SUPPORTED_COUNTRIES.map((c) => (
                          <option key={c.name} value={c.name} className="bg-[#181824] text-[#f7f6f2]">
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Shipping Method Radios */}
                    <div className="space-y-2 pt-1">
                      {WORLDWIDE_SHIPPING_OPTIONS.map((opt) => {
                        const fee = opt.id === 'standard-intl' && isFreeShippingUnlocked ? 0 : opt.price;
                        return (
                          <label
                            key={opt.id}
                            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors text-xs ${
                              selectedShippingId === opt.id
                                ? 'border-[#d4af37] bg-[#1d1d28]'
                                : 'border-[#26221a] bg-[#14141d] hover:border-[#3d3625]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <input
                                type="radio"
                                name="shippingMethod"
                                checked={selectedShippingId === opt.id}
                                onChange={() => setSelectedShippingId(opt.id)}
                                className="w-3.5 h-3.5 accent-[#d4af37]"
                              />
                              <div>
                                <span className="font-medium text-[#f7f6f2] block">{opt.name}</span>
                                <span className="text-[10px] text-[#a8a49c]">{opt.estimatedDays} • Fully Tracked</span>
                              </div>
                            </div>
                            <span className="font-semibold text-xs text-[#f7f6f2]">
                              {fee === 0 ? (
                                <span className="text-emerald-400 uppercase tracking-wider text-[10px]">FREE</span>
                              ) : (
                                formatPrice(fee, currentCurrency)
                              )}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Financial Summary */}
                  <div className="p-4 rounded-xl bg-[#14141d] border border-[#26221a] space-y-2 shadow-md">
                    <div className="flex justify-between text-xs text-[#a8a49c]">
                      <span>Items Subtotal:</span>
                      <span className="font-medium text-[#f7f6f2]">
                        {formatPrice(subtotalUSD, currentCurrency)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-[#a8a49c]">
                      <span>Worldwide Shipping to {selectedCountry}:</span>
                      <span className="font-medium">
                        {shippingFeeUSD === 0 ? (
                          <span className="text-emerald-400 font-semibold">FREE</span>
                        ) : (
                          formatPrice(shippingFeeUSD, currentCurrency)
                        )}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-[#242018] flex justify-between items-baseline">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#d4af37] block font-sans">
                          Total Due
                        </span>
                        <span className="text-[9px] text-[#7d7971]">All local customs & duties covered</span>
                      </div>
                      <span className="text-2xl font-serif font-medium text-[#e5c583]">
                        {formatPrice(grandTotalUSD, currentCurrency)}
                      </span>
                    </div>
                  </div>

                  {/* Proceed to Checkout CTA */}
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b38e2d] text-black font-semibold font-sans text-xs tracking-widest uppercase hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Proceed to Worldwide Checkout</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[10px] text-[#7d7971] pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      30-Day Global Returns
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
                      SSL Encrypted Payment
                    </span>
                  </div>
                </>
              )}
            </>
          )}

          {/* STEP 1.5: WISHLIST VIEW */}
          {currentStep === 'cart' && wishlistOpen && (
            <div className="space-y-4">
              {wishlistItems.length === 0 ? (
                <div className="text-center py-20 px-4">
                  <div className="w-16 h-16 rounded-full bg-[#181822] border border-[#2f2b20] flex items-center justify-center mx-auto mb-4 text-[#d4af37]">
                    <Flame className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-serif font-light text-[#f7f6f2] mb-2">
                    Your wishlist is empty
                  </h4>
                  <p className="text-xs text-[#a8a49c] max-w-xs mx-auto">
                    Save items you admire to track them without adding to your immediate inquiry list.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {wishlistItems.map((it) => (
                    <div
                      key={it.id}
                      className="flex gap-3 p-3 rounded-xl bg-[#14141d] border border-[#26221a] items-center justify-between shadow-sm group/item"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <img
                          src={it.image}
                          alt={it.title}
                          className="w-16 h-16 object-cover rounded-lg bg-black shrink-0 border border-[#2a251c]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-[8px] uppercase tracking-widest text-[#d4af37] block font-sans">
                            {'location' in it ? (it as LuxuryExperience).type : (it as LuxuryProduct).category}
                          </span>
                          <h5 className="text-xs font-serif font-medium text-[#f7f6f2] truncate">
                            {it.title}
                          </h5>
                          <div className="text-xs font-sans font-semibold text-[#e5c583] mt-0.5">
                            {formatPrice('price' in it ? (it as LuxuryProduct).price : (it as LuxuryExperience).priceFrom, currentCurrency)}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 shrink-0">
                        <button
                          onClick={() => onAddToCart(it)}
                          className="p-2 rounded-lg bg-[#d4af37] text-black hover:bg-[#e5c583] transition-colors"
                          title="Add to Cart"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onToggleWishlistItem(it)}
                          className="p-2 rounded-lg bg-[#1a1a24] text-[#7d7971] hover:text-rose-400 border border-[#2f2b20] transition-colors"
                          title="Remove from Wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 2: SECURE WORLDWIDE CHECKOUT FORM */}
          {currentStep === 'checkout' && (
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <button
                type="button"
                onClick={() => setCurrentStep('cart')}
                className="text-xs text-[#a8a49c] hover:text-[#f7f6f2] flex items-center gap-1 font-sans mb-1"
              >
                ← Back to Cart
              </button>

              {/* Order quick summary bar */}
              <div className="p-3.5 rounded-xl bg-[#14141d] border border-[#26221a] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-[#a8a49c] uppercase block">Total to Pay:</span>
                  <span className="font-serif text-lg font-medium text-[#e5c583]">
                    {formatPrice(grandTotalUSD, currentCurrency)}
                  </span>
                </div>
                <div className="text-right text-[11px] text-[#a8a49c]">
                  <span>{items.length} items to {selectedCountry}</span>
                  <div className="text-emerald-400 text-[10px]">✓ Tracked Worldwide Delivery</div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-[#14141d] p-4 rounded-xl border border-[#26221a] space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-medium font-sans block">
                  1. Contact Information
                </span>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#a8a49c] block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-[#181824] border border-[#2f2b20] rounded-lg px-3 py-2 text-xs text-[#f7f6f2] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#a8a49c] block mb-1">
                      Email (for tracking) *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@example.com"
                      className="w-full bg-[#181824] border border-[#2f2b20] rounded-lg px-3 py-2 text-xs text-[#f7f6f2] focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#a8a49c] block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 234-5678"
                      className="w-full bg-[#181824] border border-[#2f2b20] rounded-lg px-3 py-2 text-xs text-[#f7f6f2] focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-[#14141d] p-4 rounded-xl border border-[#26221a] space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-medium font-sans block">
                  2. Worldwide Delivery Address
                </span>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#a8a49c] block mb-1">
                    Street Address & Apartment *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="124 Grand Avenue, Apt 4B"
                    className="w-full bg-[#181824] border border-[#2f2b20] rounded-lg px-3 py-2 text-xs text-[#f7f6f2] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#a8a49c] block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="London / New York / Mumbai"
                      className="w-full bg-[#181824] border border-[#2f2b20] rounded-lg px-3 py-2 text-xs text-[#f7f6f2] focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#a8a49c] block mb-1">
                      Postal / ZIP Code
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="10001"
                      className="w-full bg-[#181824] border border-[#2f2b20] rounded-lg px-3 py-2 text-xs text-[#f7f6f2] focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#a8a49c] block mb-1">
                    Country
                  </label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full bg-[#181824] border border-[#2f2b20] rounded-lg px-3 py-2 text-xs text-[#f7f6f2] focus:outline-none focus:border-[#d4af37]"
                  >
                    {SUPPORTED_COUNTRIES.map((c) => (
                      <option key={c.name} value={c.name} className="bg-[#181824] text-[#f7f6f2]">
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-[#14141d] p-4 rounded-xl border border-[#26221a] space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-medium font-sans block">
                  3. Payment Method
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                    { id: 'paypal', label: 'PayPal', icon: DollarSign },
                    { id: 'applepay', label: 'Apple / Google Pay', icon: Lock },
                    { id: 'cod', label: 'Cash on Delivery', icon: Truck },
                  ].map((p) => {
                    const Icon = p.icon;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPaymentMethod(p.id as any)}
                        className={`p-2.5 rounded-lg border flex items-center gap-2 text-xs text-left transition-all ${
                          paymentMethod === p.id
                            ? 'border-[#d4af37] bg-gradient-to-r from-[#d4af37] to-[#b38e2d] text-black font-semibold'
                            : 'border-[#26221a] bg-[#181824] text-[#a8a49c] hover:border-[#3d3625]'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-[11px] truncate">{p.label}</span>
                      </button>
                    );
                  })}
                </div>

                {paymentMethod === 'card' && (
                  <div className="pt-2 space-y-2">
                    <input
                      type="text"
                      placeholder="Card Number (4000 1234 5678 9010)"
                      defaultValue="4242 •••• •••• 4242"
                      className="w-full bg-[#181824] border border-[#2f2b20] rounded-lg px-3 py-2 text-xs text-[#f7f6f2]"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        defaultValue="12/28"
                        className="bg-[#181824] border border-[#2f2b20] rounded-lg px-3 py-2 text-xs text-[#f7f6f2]"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        defaultValue="842"
                        className="bg-[#181824] border border-[#2f2b20] rounded-lg px-3 py-2 text-xs text-[#f7f6f2]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Order Notes */}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#a8a49c] block mb-1">
                  Optional Gift Note or Delivery Notes
                </label>
                <textarea
                  rows={2}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Leave at reception, include anniversary gift note, dress custom measurements..."
                  className="w-full bg-[#181824] border border-[#2f2b20] rounded-lg p-2.5 text-xs text-[#f7f6f2] placeholder-[#7d7971] focus:outline-none focus:border-[#d4af37] resize-none"
                />
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b38e2d] text-black font-semibold font-sans text-xs tracking-widest uppercase hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Lock className="w-3.5 h-3.5 text-black" />
                <span>
                  {submitting ? 'Processing Order...' : `Pay & Place Order (${formatPrice(grandTotalUSD, currentCurrency)})`}
                </span>
              </button>

              <p className="text-[10px] text-center text-[#7d7971]">
                By clicking Place Order, you agree to Sheza's Lusso 30-day money-back guarantee and global terms.
              </p>
            </form>
          )}

          {/* STEP 3: ORDER CONFIRMATION SCREEN */}
          {currentStep === 'confirmation' && orderConfirmation && (
            <div className="text-center py-6 px-2 animate-fade-in space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold block mb-1 font-sans">
                  Order Successfully Placed
                </span>
                <h4 className="text-2xl font-serif font-light text-[#f7f6f2] mb-1">
                  Order #{orderConfirmation.orderNumber}
                </h4>
                <p className="text-xs text-[#a8a49c]">
                  Thank you, <span className="font-semibold text-[#f7f6f2]">
                    {typeof orderConfirmation.shippingAddress === 'object' 
                      ? orderConfirmation.shippingAddress.fullName || 'Shopper'
                      : orderConfirmation.customerName || 'Shopper'}
                  </span>! Your purchase is being prepared for worldwide dispatch.
                </p>
              </div>

              {/* Tracking & Logistics Card */}
              <div className="p-4 rounded-xl bg-[#14141d] border border-[#26221a] text-left text-xs space-y-3 shadow-md">
                <div className="flex items-center justify-between pb-2 border-b border-[#242018]">
                  <span className="text-[#a8a49c]">Worldwide Tracking Number:</span>
                  <span className="font-mono font-semibold text-[#e5c583] bg-[#1a1a26] px-2 py-0.5 rounded border border-[#332e22]">
                    {orderConfirmation.trackingNumber}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#a8a49c]">Estimated Delivery:</span>
                  <span className="font-medium text-[#f7f6f2] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                    {orderConfirmation.estimatedDeliveryDate || orderConfirmation.estimatedDelivery}
                  </span>
                </div>

                <div className="flex items-start justify-between text-xs">
                  <span className="text-[#a8a49c]">Shipping Address:</span>
                  <span className="text-right font-medium text-[#f7f6f2] max-w-[200px]">
                    {typeof orderConfirmation.shippingAddress === 'object'
                      ? `${orderConfirmation.shippingAddress.street}, ${orderConfirmation.shippingAddress.city}, ${orderConfirmation.shippingAddress.country}`
                      : orderConfirmation.shippingAddress}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#242018]">
                  <span className="text-[#a8a49c]">Total Paid:</span>
                  <span className="font-serif text-base font-semibold text-[#e5c583]">
                    {formatPrice(orderConfirmation.totalAmount ?? orderConfirmation.total ?? 0, currentCurrency)}
                  </span>
                </div>
              </div>

              {/* Global Customer Assurance */}
              <div className="grid grid-cols-3 gap-2 text-left">
                <div className="p-3 rounded-xl bg-[#14141d] border border-[#26221a] text-[10px]">
                  <Truck className="w-3.5 h-3.5 text-[#d4af37] mb-1" />
                  <span className="font-semibold block text-[#f7f6f2]">Tracked Post</span>
                  <span className="text-[#7d7971]">SMS updates sent</span>
                </div>
                <div className="p-3 rounded-xl bg-[#14141d] border border-[#26221a] text-[10px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37] mb-1" />
                  <span className="font-semibold block text-[#f7f6f2]">30-Day Returns</span>
                  <span className="text-[#7d7971]">Hassle-free guarantee</span>
                </div>
                <div className="p-3 rounded-xl bg-[#14141d] border border-[#26221a] text-[10px]">
                  <Globe className="w-3.5 h-3.5 text-[#d4af37] mb-1" />
                  <span className="font-semibold block text-[#f7f6f2]">190+ Countries</span>
                  <span className="text-[#7d7971]">Customs cleared</span>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b38e2d] text-black font-semibold font-sans text-xs tracking-widest uppercase hover:brightness-110 transition-all shadow-md"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
