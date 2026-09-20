import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Truck, Globe, Check, CreditCard } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 5000);
    setEmail('');
  };

  return (
    <footer className="bg-[#0b0b10] text-[#a8a59e] border-t border-[#d4af37]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#232332]">
          {/* Brand & Worldwide Promise */}
          <div className="space-y-3">
            <span className="font-serif text-2xl font-light tracking-[0.15em] text-[#fdfcfc] block">
              SHEZA'S LUSSO
            </span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#e5c583] block font-sans font-medium">
              Royal Luxury For Everyone Everywhere
            </span>
            <p className="text-xs leading-relaxed text-[#a8a59e] font-light">
              Founded by Sheza with the vision of making red-carpet jewelry, evening gowns, dream destination celebrations, and romantic moments accessible to people all around the globe.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#fdfcfc] pt-1">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>Worldwide Shipping to 190+ Countries</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#fdfcfc]">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>30-Day Global Returns & Money-Back Guarantee</span>
            </div>
          </div>

          {/* Worldwide Fulfillment & Customer Care */}
          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-widest text-[#e5c583] mb-4 font-sans">
              Worldwide Shipping Hubs
            </h4>
            <ul className="space-y-2.5 text-xs text-[#a8a59e]">
              <li>
                <strong className="text-[#fdfcfc] block font-medium">North America:</strong> 
                Fast Tracked USPS & FedEx Dispatch
              </li>
              <li>
                <strong className="text-[#fdfcfc] block font-medium">Europe & UK:</strong> 
                Royal Mail & DHL Express Hub
              </li>
              <li>
                <strong className="text-[#fdfcfc] block font-medium">Asia & Middle East:</strong> 
                Express Global Air Hub
              </li>
              <li>
                <strong className="text-[#fdfcfc] block font-medium">Customer Support:</strong> 
                24/7 Global Live Chat & Email
              </li>
            </ul>
          </div>

          {/* Store Categories */}
          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-widest text-[#e5c583] mb-4 font-sans">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#a8a59e]">
              <li><a href="#products" className="hover:text-[#e5c583] transition-colors">Fine Jewelry & Watches ($39 - $149)</a></li>
              <li><a href="#couture" className="hover:text-[#e5c583] transition-colors">Evening Gowns & Dresses ($89 - $189)</a></li>
              <li><a href="#weddings" className="hover:text-[#e5c583] transition-colors">Affordable Weddings ($799 - $999)</a></li>
              <li><a href="#dating" className="hover:text-[#e5c583] transition-colors">Romantic Date Packages ($99 - $169)</a></li>
              <li><a href="#surprises" className="hover:text-[#e5c583] transition-colors">Surprise Gift Delivery ($69 - $199)</a></li>
              <li><a href="#travel" className="hover:text-[#e5c583] transition-colors">Vacation Getaways ($399 - $599)</a></li>
              <li><a href="#concierge" className="hover:text-[#e5c583] transition-colors">AI Personal Stylist & Planner</a></li>
            </ul>
          </div>

          {/* Newsletter & Discount */}
          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-widest text-[#e5c583] mb-4 font-sans">
              Get $15 Off Your First Order
            </h4>
            <p className="text-xs text-[#a8a59e] mb-4 leading-relaxed font-light">
              Subscribe to receive exclusive secret sales, free shipping promo codes, and style lookbooks.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address..."
                  className="w-full bg-[#161622] border border-[#313146] rounded-lg px-3 py-2 text-xs text-[#fdfcfc] focus:outline-none focus:border-[#d4af37] placeholder-[#706e68]"
                />
              </div>
              <button
                type="submit"
                disabled={subscribed}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b39029] text-black font-semibold font-sans text-[10px] tracking-widest uppercase hover:brightness-110 transition-all shadow-md shadow-[#d4af37]/20 flex items-center justify-center gap-1.5"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-black" />
                    <span>$15 Coupon Code Sent!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-black" />
                    <span>Get $15 Off Coupon</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright & payment methods */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#706e68] gap-4 font-light">
          <div>
            © {new Date().getFullYear()} Sheza's Lusso. All Rights Reserved. Royal Luxury & Worldwide Delivery.
          </div>
          <div className="flex items-center space-x-6 text-[11px]">
            <span className="hover:text-[#e5c583] cursor-pointer transition-colors">Worldwide Shipping Policy</span>
            <span className="hover:text-[#e5c583] cursor-pointer transition-colors">30-Day Returns</span>
            <span className="hover:text-[#e5c583] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-[#e5c583] cursor-pointer transition-colors">Secure Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
