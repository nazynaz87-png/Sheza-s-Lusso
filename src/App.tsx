/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Currency, LuxuryProduct, LuxuryExperience, InquiryItem, UserProfile } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductSection } from './components/ProductSection';
import { CoutureSection } from './components/CoutureSection';
import { WeddingSection } from './components/WeddingSection';
import { DatingSection } from './components/DatingSection';
import { SurpriseSection } from './components/SurpriseSection';
import { TravelSection } from './components/TravelSection';
import { AIConcierge } from './components/AIConcierge';
import { RoyalAtelier3D } from './components/RoyalAtelier3D';
import { ItemModal } from './components/ItemModal';
import { InquiryDrawer } from './components/InquiryDrawer';
import { ProfileModal } from './components/ProfileModal';
import { Footer } from './components/Footer';
import { Check } from 'lucide-react';

export default function App() {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('USD');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<LuxuryProduct | LuxuryExperience | null>(null);
  const [inquiryDrawerOpen, setInquiryDrawerOpen] = useState(false);
  const [wishlistDrawerOpen, setWishlistDrawerOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // User Profile with Logo and VIP status
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('shezas_lusso_user_profile');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      name: 'Princess Sophia',
      email: 'sophia.patron@shezaluxury.com',
      logoUrl: '/sheza_logo.jpg',
      tier: 'Emerald',
      memberSince: '2024',
      loyaltyPoints: 5250,
      phone: '+44 20 7946 0912',
      streetAddress: 'Suite 704, New Bond Street',
      city: 'London, Mayfair',
      country: 'United Kingdom',
      vipCode: 'ROYAL-7882',
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('shezas_lusso_user_profile', JSON.stringify(userProfile));
    } catch (e) {
      console.error('Failed to save profile to localStorage:', e);
    }
  }, [userProfile]);

  // Cart list with local persistence
  const [cartItems, setCartItems] = useState<InquiryItem[]>(() => {
    try {
      const saved = localStorage.getItem('shezas_lusso_cart');
      if (saved) return JSON.parse(saved);
      // Legacy check
      const legacy = localStorage.getItem('shezas_lusso_inquiry_bag');
      return legacy ? JSON.parse(legacy) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('shezas_lusso_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  // Wishlist list with local persistence
  const [wishlistItems, setWishlistItems] = useState<(LuxuryProduct | LuxuryExperience)[]>(() => {
    try {
      const saved = localStorage.getItem('shezas_lusso_wishlist');
      if (saved) return JSON.parse(saved);
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('shezas_lusso_wishlist', JSON.stringify(wishlistItems));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage:', e);
    }
  }, [wishlistItems]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Add Product to Cart (or increment quantity if already present)
  const handleAddProductToCart = (prod: LuxuryProduct & { notes?: string }) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.title === prod.title && item.notes === prod.notes);
      if (existingIndex > -1) {
        const updated = [...prev];
        const currentQty = updated[existingIndex].quantity || 1;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: currentQty + 1,
        };
        return updated;
      }
      const newItem: InquiryItem = {
        id: `cart-prod-${prod.id}-${Date.now()}`,
        title: prod.title,
        type: 'product',
        category: prod.category.toUpperCase(),
        price: prod.price,
        originalPrice: prod.originalPrice,
        image: prod.image,
        quantity: 1,
        notes: prod.notes,
      };
      return [newItem, ...prev];
    });
    showToast(`"${prod.title}" added to your cart!`);
  };

  // Add Experience to Cart
  const handleAddExperienceToCart = (exp: LuxuryExperience) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.title === exp.title);
      if (existingIndex > -1) {
        const updated = [...prev];
        const currentQty = updated[existingIndex].quantity || 1;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: currentQty + 1,
        };
        return updated;
      }
      const newItem: InquiryItem = {
        id: `cart-exp-${exp.id}-${Date.now()}`,
        title: exp.title,
        type: 'experience',
        category: exp.type.toUpperCase(),
        price: exp.priceFrom,
        originalPrice: exp.originalPrice,
        image: exp.image,
        quantity: 1,
      };
      return [newItem, ...prev];
    });
    showToast(`"${exp.title}" added to your cart!`);
  };

  // Add Custom Couture Fitting
  const handleAddCoutureFitting = (customDetails: any) => {
    const newItem: InquiryItem = {
      id: `cart-custom-couture-${Date.now()}`,
      title: `Custom Tailored: ${customDetails.silhouette}`,
      type: 'product',
      category: 'COUTURE DRESS',
      price: customDetails.estimatedPrice || 149,
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80',
      quantity: 1,
      notes: `Fabric: ${customDetails.fabric} | Color: ${customDetails.colorway} | Sizing: Custom Tailored Fit`,
    };
    setCartItems((prev) => [newItem, ...prev]);
    showToast('Custom tailored dress added to your cart!');
  };

  // Add AI Custom Shopping Plan
  const handleAddAIPlanToCart = (customPlan: { title: string; notes: string; category: string }) => {
    const newItem: InquiryItem = {
      id: `cart-ai-plan-${Date.now()}`,
      title: customPlan.title,
      type: 'experience',
      category: customPlan.category.toUpperCase(),
      price: 89, // Honest, accessible curation fee
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
      quantity: 1,
      notes: customPlan.notes.slice(0, 180) + '...',
    };
    setCartItems((prev) => [newItem, ...prev]);
    showToast('Personalized planning package added to your cart!');
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleToggleWishlist = (item: LuxuryProduct | LuxuryExperience) => {
    setWishlistItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        showToast(`"${item.title}" removed from your wishlist.`);
        return prev.filter((i) => i.id !== item.id);
      } else {
        showToast(`"${item.title}" added to your wishlist!`);
        return [item, ...prev];
      }
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToConcierge = () => {
    const el = document.getElementById('concierge');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-[#08080c] text-[#f7f6f2] flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#f7f6f2]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#13131b] border border-[#2e291f] text-[#f7f6f2] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Worldwide Header */}
      <Header
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        inquiryCount={totalCartCount}
        wishlistCount={wishlistItems.length}
        onOpenInquiryDrawer={() => setInquiryDrawerOpen(true)}
        onOpenWishlistDrawer={() => setWishlistDrawerOpen(true)}
        onOpenConcierge={scrollToConcierge}
        userProfile={userProfile}
        onOpenProfile={() => setProfileModalOpen(true)}
      />

      {/* Main Single Page Content */}
      <main className="flex-1">
        {/* Hero Banner */}
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectCategory={(catId) => {
            const el = document.getElementById(catId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenConcierge={scrollToConcierge}
          userProfile={userProfile}
          onOpenProfile={() => setProfileModalOpen(true)}
        />

        {/* Section 3D: Royal Atelier 3D Interactive Showcase */}
        <RoyalAtelier3D
          currentCurrency={currentCurrency}
          onAddToCart={handleAddProductToCart}
          onSelectProduct={setSelectedItem}
        />

        {/* Section 1: Jewelry & Accessories ($39 - $149) */}
        <ProductSection
          currentCurrency={currentCurrency}
          onSelectItem={setSelectedItem}
          onAddToInquiry={handleAddProductToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistItems={wishlistItems}
          searchFilter={searchQuery}
        />

        {/* Section 2: Designer Dresses & Evening Gowns ($89 - $189) */}
        <CoutureSection
          currentCurrency={currentCurrency}
          onSelectItem={setSelectedItem}
          onAddToInquiry={handleAddProductToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistItems={wishlistItems}
          onRequestBespokeFitting={handleAddCoutureFitting}
          searchFilter={searchQuery}
        />

        {/* Section 3: Affordable Destination Weddings ($799 - $999) */}
        <WeddingSection
          currentCurrency={currentCurrency}
          onSelectExperience={setSelectedItem}
          onAddToInquiry={handleAddExperienceToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistItems={wishlistItems}
          searchFilter={searchQuery}
        />

        {/* Section 4: Romantic Dating Plans ($99 - $169) */}
        <DatingSection
          currentCurrency={currentCurrency}
          onSelectExperience={setSelectedItem}
          onAddToInquiry={handleAddExperienceToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistItems={wishlistItems}
          searchFilter={searchQuery}
        />

        {/* Section 5: Surprise Delivery & Celebrations ($69 - $199) */}
        <SurpriseSection
          currentCurrency={currentCurrency}
          onSelectExperience={setSelectedItem}
          onAddToInquiry={handleAddExperienceToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistItems={wishlistItems}
          searchFilter={searchQuery}
        />

        {/* Section 6: Worldwide Vacation Packages ($399 - $599) */}
        <TravelSection
          currentCurrency={currentCurrency}
          onSelectExperience={setSelectedItem}
          onAddToInquiry={handleAddExperienceToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistItems={wishlistItems}
          searchFilter={searchQuery}
        />

        {/* Section 7: Sheza's AI Personal Stylist & Event Planner */}
        <AIConcierge
          currentCurrency={currentCurrency}
          onAddCustomToInquiry={handleAddAIPlanToCart}
        />
      </main>

      {/* Item Detail Modal */}
      <ItemModal
        item={selectedItem}
        currentCurrency={currentCurrency}
        onClose={() => setSelectedItem(null)}
        onAddToInquiry={(it) => {
          if ('location' in it) {
            handleAddExperienceToCart(it as LuxuryExperience);
          } else {
            handleAddProductToCart(it as LuxuryProduct);
          }
        }}
        onToggleWishlist={handleToggleWishlist}
        wishlistItems={wishlistItems}
      />

      {/* Shopping Cart & Worldwide Checkout Drawer */}
      <InquiryDrawer
        isOpen={inquiryDrawerOpen || wishlistDrawerOpen}
        onClose={() => {
          setInquiryDrawerOpen(false);
          setWishlistDrawerOpen(false);
        }}
        items={cartItems}
        currentCurrency={currentCurrency}
        onRemoveItem={handleRemoveCartItem}
        onClearAll={handleClearCart}
        onUpdateQuantity={handleUpdateQuantity}
        wishlistItems={wishlistItems}
        wishlistOpen={wishlistDrawerOpen}
        onToggleWishlistDrawer={(val) => {
          setWishlistDrawerOpen(val);
          if (val) setInquiryDrawerOpen(false);
        }}
        onToggleInquiryDrawer={(val) => {
          setInquiryDrawerOpen(val);
          if (val) setWishlistDrawerOpen(false);
        }}
        onToggleWishlistItem={handleToggleWishlist}
        onAddToCart={(it) => {
          if ('location' in it) {
            handleAddExperienceToCart(it as LuxuryExperience);
          } else {
            handleAddProductToCart(it as LuxuryProduct);
          }
        }}
      />

      {/* Client Profile & Logo Management Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        userProfile={userProfile}
        onUpdateProfile={(updated) => {
          setUserProfile(updated);
          showToast('Profile & luxury insignia updated!');
        }}
        currentCurrency={currentCurrency}
        onShowToast={showToast}
      />

      {/* Maison Footer */}
      <Footer />
    </div>
  );
}
