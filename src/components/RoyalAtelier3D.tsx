import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  Eye, 
  ShoppingBag, 
  Check, 
  Layers, 
  Compass, 
  Sliders, 
  SunMedium, 
  Moon, 
  Maximize2,
  ShieldCheck,
  Truck,
  ArrowRight
} from 'lucide-react';
import { Currency, LuxuryProduct } from '../types';
import { formatPrice } from '../utils/format';
import { useLanguage } from '../context/LanguageContext';

interface RoyalAtelier3DProps {
  currentCurrency: Currency;
  onAddToCart: (product: LuxuryProduct) => void;
  onSelectProduct: (product: LuxuryProduct) => void;
}

interface ShowcasePiece {
  id: string;
  title: string;
  category: 'jewelry' | 'watches';
  price: number;
  originalPrice: number;
  image: string;
  subtitle: string;
  rarity: 'Handcrafted' | 'Best Seller' | 'Limited Edition' | 'Trending';
  highlights: string[];
  description: string;
}

const SHOWCASE_PIECES: ShowcasePiece[] = [
  {
    id: 'prod-3d-1',
    title: 'The Empress Emerald Solitaire Ring',
    category: 'jewelry',
    price: 89,
    originalPrice: 280,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
    subtitle: 'Colombian emerald cut with 24K gold crown prongs',
    rarity: 'Best Seller',
    highlights: ['4.5 Carat Certified Lab Emerald', 'Anti-Tarnish 24K Gold Cladding', 'Velvet Royal Box Included'],
    description: 'A breathtaking emerald-cut solitaire suspended in an open-gallery crown basket that allows light to cascade through 58 precision-cut facets.',
  },
  {
    id: 'prod-3d-2',
    title: 'Imperial Aurora Diamond Diadem',
    category: 'jewelry',
    price: 149,
    originalPrice: 420,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
    subtitle: 'Royal court tiara crowned with brilliant pavé stones',
    rarity: 'Handcrafted',
    highlights: ['Over 120 Brilliant Pavé Crystals', 'Flexible Comfort Band', 'Royal Archival Heritage'],
    description: 'Worn by nobility during imperial galas. Hand-set micro-diamonds shimmer across sweeping platinum curves reminiscent of northern celestial lights.',
  },
  {
    id: 'prod-3d-3',
    title: 'Maison Tourbillon Celestial Watch',
    category: 'watches',
    price: 139,
    originalPrice: 380,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
    subtitle: 'Skeletonized mechanical movement with sapphire crystal',
    rarity: 'Limited Edition',
    highlights: ['Visible Skeleton Balance Wheel', 'Scratchproof Sapphire Crystal', 'Genuine Leather Strap'],
    description: 'An architectural tribute to royal horology. Features dual-time display, an open balance escapement, and an exhibition caseback.',
  },
  {
    id: 'prod-3d-4',
    title: 'Versailles South Sea Pearl Choker',
    category: 'jewelry',
    price: 69,
    originalPrice: 195,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
    subtitle: 'Gleaming baroque pearls linked by hammered gold beads',
    rarity: 'Trending',
    highlights: ['Hand-Selected Luminous Pearls', 'Adjustable 16-18 Inch Extender', 'Hypoallergenic Finish'],
    description: 'Inspired by the Hall of Mirrors at Versailles. Each pearl radiates a warm iridescence that captures evening candlelight with natural grace.',
  }
];

export const RoyalAtelier3D: React.FC<RoyalAtelier3DProps> = ({
  currentCurrency,
  onAddToCart,
  onSelectProduct,
}) => {
  const { t } = useLanguage();
  const [activePieceIdx, setActivePieceIdx] = useState(0);
  const activePiece = SHOWCASE_PIECES[activePieceIdx];

  // 3D Orbit & Rotation States
  const [rotY, setRotY] = useState(15);
  const [rotX, setRotX] = useState(-8);
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedFinish, setSelectedFinish] = useState<'gold' | 'rose' | 'platinum' | 'emerald'>('gold');
  const [lightingMood, setLightingMood] = useState<'chandelier' | 'spotlight' | 'twilight'>('chandelier');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, startRotY: 0, startRotX: 0 });

  // Auto-rotation loop
  useEffect(() => {
    if (!autoRotate || isDragging) return;
    const interval = setInterval(() => {
      setRotY((prev) => (prev + 0.4) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [autoRotate, isDragging]);

  // Drag handlers for 3D interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startRotY: rotY,
      startRotX: rotX,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    setRotY(dragStartRef.current.startRotY + deltaX * 0.6);
    setRotX(Math.max(-35, Math.min(35, dragStartRef.current.startRotX - deltaY * 0.4)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile 3D interaction
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    setIsDragging(true);
    setAutoRotate(false);
    dragStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      startRotY: rotY,
      startRotX: rotX,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStartRef.current.x;
    const deltaY = e.touches[0].clientY - dragStartRef.current.y;
    setRotY(dragStartRef.current.startRotY + deltaX * 0.8);
    setRotX(Math.max(-30, Math.min(30, dragStartRef.current.startRotX - deltaY * 0.5)));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Finish Color Scheme
  const getFinishStyles = () => {
    switch (selectedFinish) {
      case 'rose':
        return {
          glow: 'rgba(230, 160, 150, 0.4)',
          border: 'border-[#e0a899]/60',
          accent: '#e0a899',
          name: t('threeDFinishRose'),
        };
      case 'platinum':
        return {
          glow: 'rgba(215, 230, 255, 0.4)',
          border: 'border-[#b8c9e0]/60',
          accent: '#dce8f5',
          name: t('threeDFinishPlatinum'),
        };
      case 'emerald':
        return {
          glow: 'rgba(52, 211, 153, 0.45)',
          border: 'border-emerald-500/60',
          accent: '#34d399',
          name: t('threeDFinishEmerald'),
        };
      case 'gold':
      default:
        return {
          glow: 'rgba(212, 175, 55, 0.45)',
          border: 'border-[#d4af37]/60',
          accent: '#d4af37',
          name: t('threeDFinishGold'),
        };
    }
  };

  const finish = getFinishStyles();

  // Lighting atmosphere styles
  const getLightingBackground = () => {
    switch (lightingMood) {
      case 'spotlight':
        return 'radial-gradient(circle at 50% 25%, rgba(255, 255, 255, 0.25) 0%, rgba(12, 12, 18, 0.95) 60%)';
      case 'twilight':
        return 'radial-gradient(circle at 50% 30%, rgba(30, 58, 138, 0.35) 0%, rgba(8, 8, 14, 0.98) 70%)';
      case 'chandelier':
      default:
        return 'radial-gradient(circle at 50% 20%, rgba(212, 175, 55, 0.22) 0%, rgba(13, 13, 19, 0.95) 65%)';
    }
  };

  const asProduct: LuxuryProduct = {
    id: activePiece.id,
    title: activePiece.title,
    brand: "Sheza's Lusso 3D Atelier",
    category: activePiece.category,
    price: activePiece.price,
    originalPrice: activePiece.originalPrice,
    image: activePiece.image,
    tagline: activePiece.subtitle,
    description: activePiece.description,
    details: activePiece.highlights,
    rarity: activePiece.rarity,
    inStock: true,
  };

  return (
    <section id="royal-3d-atelier" className="py-16 sm:py-20 bg-[#07070b] border-b border-[#242018] relative overflow-hidden">
      {/* 3D Holographic Perspective Floor Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] grid-3d-plane" />
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] blur-[140px] pointer-events-none transition-all duration-700 rounded-full"
          style={{ background: finish.glow }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#13131b] border border-[#d4af37]/40 shadow-sm mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#e5c583] font-medium font-sans">
              {t('threeDTitle')}
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-light text-[#f7f6f2] tracking-tight mb-2">
            Experience Royal Masterpieces in <span className="italic text-[#d4af37]">Real 3D Space</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#a8a49c] font-sans font-light max-w-xl mx-auto">
            {t('threeDSubtitle')}
          </p>
        </div>

        {/* 3D Interactive Workbench Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Piece Selector & Technical Highlights (3 Cols) */}
          <div className="lg:col-span-3 space-y-3 order-2 lg:order-1">
            <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-sans font-semibold block px-1">
              Select Piece to Inspect
            </span>
            <div className="space-y-2">
              {SHOWCASE_PIECES.map((piece, idx) => {
                const isSelected = idx === activePieceIdx;
                return (
                  <button
                    key={piece.id}
                    onClick={() => {
                      setActivePieceIdx(idx);
                      setRotY(15);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 relative group ${
                      isSelected
                        ? 'bg-[#151522] border-[#d4af37] shadow-lg shadow-[#d4af37]/10'
                        : 'bg-[#0f0f16] border-[#22201b] hover:border-[#383327] opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-black shrink-0 border border-[#2b271e] relative">
                      <img
                        src={piece.image}
                        alt={piece.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#d4af37]/20 flex items-center justify-center">
                          <Eye className="w-4 h-4 text-white drop-shadow" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[9px] uppercase tracking-widest text-[#d4af37] font-semibold truncate">
                          {piece.rarity}
                        </span>
                        <span className="font-semibold text-xs text-[#e5c583]">
                          {formatPrice(piece.price, currentCurrency)}
                        </span>
                      </div>
                      <h4 className="text-xs font-serif font-medium text-[#f7f6f2] truncate">
                        {piece.title}
                      </h4>
                      <p className="text-[10px] text-[#8e8a82] truncate">
                        {piece.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Guarantee Micro-Card */}
            <div className="p-3.5 rounded-xl bg-[#0f0f16] border border-[#242018] space-y-2 text-[11px] text-[#a8a49c]">
              <div className="flex items-center gap-2 text-[#f7f6f2] font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Certified Maison Hallmarking</span>
              </div>
              <p className="text-[10px] text-[#7d7971] leading-relaxed">
                Every piece is microscopically examined and dispatched in a velvet presentation chest with certificates.
              </p>
            </div>
          </div>

          {/* Center Column: Interactive 3D Orbit Stage (6 Cols) */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div 
              className="relative rounded-3xl overflow-hidden border border-[#2a261e] p-6 sm:p-8 min-h-[440px] sm:min-h-[500px] flex flex-col items-center justify-between shadow-2xl select-none"
              style={{ background: getLightingBackground() }}
            >
              {/* Top HUD Controls: Auto-Rotate, Preset Angles, Lighting Mood */}
              <div className="w-full flex items-center justify-between text-xs gap-2 z-20">
                <div className="flex items-center gap-1.5 bg-[#0f0f18]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#2e2a20]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold">
                    3D Stage
                  </span>
                </div>

                {/* Lighting selector */}
                <div className="flex items-center gap-1 bg-[#0f0f18]/80 backdrop-blur-md p-1 rounded-full border border-[#2e2a20]">
                  <button
                    onClick={() => setLightingMood('chandelier')}
                    className={`px-2 py-1 rounded-full text-[10px] flex items-center gap-1 transition-all ${
                      lightingMood === 'chandelier'
                        ? 'bg-[#d4af37] text-black font-semibold'
                        : 'text-[#a8a49c] hover:text-[#f7f6f2]'
                    }`}
                    title="Palace Chandelier Lighting"
                  >
                    <SunMedium className="w-3 h-3" />
                    <span className="hidden sm:inline">Chandelier</span>
                  </button>
                  <button
                    onClick={() => setLightingMood('spotlight')}
                    className={`px-2 py-1 rounded-full text-[10px] flex items-center gap-1 transition-all ${
                      lightingMood === 'spotlight'
                        ? 'bg-[#d4af37] text-black font-semibold'
                        : 'text-[#a8a49c] hover:text-[#f7f6f2]'
                    }`}
                    title="Atelier Spotlight"
                  >
                    <Sliders className="w-3 h-3" />
                    <span className="hidden sm:inline">Spotlight</span>
                  </button>
                  <button
                    onClick={() => setLightingMood('twilight')}
                    className={`px-2 py-1 rounded-full text-[10px] flex items-center gap-1 transition-all ${
                      lightingMood === 'twilight'
                        ? 'bg-[#d4af37] text-black font-semibold'
                        : 'text-[#a8a49c] hover:text-[#f7f6f2]'
                    }`}
                    title="Midnight Twilight Lighting"
                  >
                    <Moon className="w-3 h-3" />
                    <span className="hidden sm:inline">Twilight</span>
                  </button>
                </div>

                {/* Auto Rotate Button */}
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`p-1.5 rounded-full border transition-all ${
                    autoRotate
                      ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#e5c583]'
                      : 'bg-[#0f0f18]/80 border-[#2e2a20] text-[#7d7971]'
                  }`}
                  title={autoRotate ? 'Pause 3D Rotation' : 'Start 3D Rotation'}
                >
                  <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                </button>
              </div>

              {/* 3D Viewport with Perspective & Drag Orbit */}
              <div
                className="relative w-full flex-1 flex items-center justify-center cursor-grab active:cursor-grabbing perspective-1000 py-6"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* 3D Floating Rings & Stage Pedestal */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full border border-[#d4af37]/20 pedestal-3d pointer-events-none" />
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full border border-[#d4af37]/30 pedestal-3d animate-pulse-ring-3d pointer-events-none" />

                {/* 3D Object Container with real rotateX and rotateY */}
                <div
                  className="relative preserve-3d transition-transform duration-75 ease-out"
                  style={{
                    transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${zoomLevel}, ${zoomLevel}, ${zoomLevel})`,
                  }}
                >
                  {/* Outer Beveled Specular Frame */}
                  <div 
                    className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl p-2 bg-gradient-to-b from-[#1c1b26] to-[#0c0c12] border shadow-2xl preserve-3d"
                    style={{
                      borderColor: finish.accent,
                      boxShadow: `0 25px 50px -12px rgba(0,0,0,0.9), 0 0 30px -5px ${finish.glow}`,
                    }}
                  >
                    {/* Layer 1: Base Image with 3D Depth */}
                    <div className="w-full h-full rounded-xl overflow-hidden bg-black relative preserve-3d">
                      <img
                        src={activePiece.image}
                        alt={activePiece.title}
                        className="w-full h-full object-cover select-none pointer-events-none"
                        referrerPolicy="no-referrer"
                      />

                      {/* 3D Specular Light Sweep Overlay */}
                      <div 
                        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay transition-all duration-300"
                        style={{
                          background: `linear-gradient(${rotY}deg, transparent 20%, rgba(255,255,255,0.7) 50%, transparent 80%)`,
                        }}
                      />
                    </div>

                    {/* Layer 2: Floating 3D Gold Seal (Elevated on Z-Axis) */}
                    <div 
                      className="absolute -top-3 -right-3 px-2.5 py-1 rounded-full bg-[#0e0e16] border text-[9px] uppercase font-sans font-bold tracking-widest text-[#e5c583] shadow-xl translate-z-40"
                      style={{ borderColor: finish.accent }}
                    >
                      360° Royal View
                    </div>

                    {/* Layer 3: Dynamic Facet Brilliant Sparkles */}
                    <div 
                      className="absolute top-4 left-4 p-1.5 rounded-full bg-black/60 border border-[#d4af37]/40 text-[#e5c583] translate-z-50 animate-bounce"
                      style={{ animationDuration: '3s' }}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                    </div>

                    {/* Floating Price Pill (Elevated on Z-Axis) */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#0a0a0f]/95 border border-[#d4af37] text-[10px] font-sans font-semibold text-[#e5c583] shadow-xl whitespace-nowrap translate-z-40 flex items-center gap-1.5">
                      <span>{formatPrice(activePiece.price, currentCurrency)}</span>
                      <span className="line-through text-[#7d7971] text-[9px]">
                        {formatPrice(activePiece.originalPrice, currentCurrency)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom HUD: Orbit Guidance & Quick Zoom */}
              <div className="w-full flex items-center justify-between text-xs text-[#a8a49c] z-20 pt-2 border-t border-[#222019]/60">
                <span className="text-[10px] font-sans flex items-center gap-1.5 text-[#e5c583]">
                  <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{t('threeDOrbitHint')}</span>
                </span>
                
                {/* 3D Angle Reset */}
                <button
                  onClick={() => {
                    setRotY(0);
                    setRotX(0);
                  }}
                  className="text-[10px] uppercase tracking-wider text-[#a8a49c] hover:text-[#f7f6f2] transition-colors"
                >
                  Reset Angle (0°)
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Piece Customizer, Finishes & Actions (3 Cols) */}
          <div className="lg:col-span-3 space-y-4 order-3">
            {/* Title & Description Card */}
            <div className="p-4 rounded-2xl bg-[#0f0f16] border border-[#242018] space-y-2 shadow-lg">
              <span className="text-[9px] uppercase tracking-widest text-[#d4af37] font-semibold block">
                {activePiece.rarity} • Certified
              </span>
              <h3 className="font-serif text-lg font-light text-[#f7f6f2]">
                {activePiece.title}
              </h3>
              <p className="text-xs text-[#a8a49c] leading-relaxed">
                {activePiece.description}
              </p>

              <div className="pt-2 border-t border-[#201d16] flex items-baseline justify-between">
                <div>
                  <span className="text-xl font-serif font-semibold text-[#e5c583]">
                    {formatPrice(activePiece.price, currentCurrency)}
                  </span>
                  <span className="line-through text-[#7d7971] text-xs ml-2">
                    {formatPrice(activePiece.originalPrice, currentCurrency)}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-medium">
                  Ships Free Worldwide
                </span>
              </div>
            </div>

            {/* 3D Metallic Finishes Selector */}
            <div className="p-4 rounded-2xl bg-[#0f0f16] border border-[#242018] space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold">
                  Select 3D Finish:
                </span>
                <span className="text-xs text-[#e5c583] font-medium">{finish.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'gold', name: '24K Gold', color: 'from-[#e5c583] to-[#b38e2d]' },
                  { id: 'rose', name: 'Rose Gold', color: 'from-[#f3b5a7] to-[#b87667]' },
                  { id: 'platinum', name: 'Platinum', color: 'from-[#f1f5f9] to-[#94a3b8]' },
                  { id: 'emerald', name: 'Emerald', color: 'from-[#34d399] to-[#047857]' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFinish(f.id as any)}
                    className={`p-2 rounded-xl border text-xs flex items-center gap-2 transition-all ${
                      selectedFinish === f.id
                        ? 'border-[#d4af37] bg-[#1a1924] shadow-md'
                        : 'border-[#22201b] bg-[#0d0d13] text-[#8e8a82] hover:border-[#332f24]'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-r ${f.color} shrink-0 border border-white/30`} />
                    <span className="text-[11px] font-medium text-[#f7f6f2] truncate">{f.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => onAddToCart(asProduct)}
                className="w-full py-3.5 rounded-xl btn-3d-gold font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-xl"
              >
                <ShoppingBag className="w-4 h-4 text-black" />
                <span>{t('addToCart')} ({formatPrice(activePiece.price, currentCurrency)})</span>
              </button>

              <button
                onClick={() => onSelectProduct(asProduct)}
                className="w-full py-2.5 rounded-xl bg-[#14141d] hover:bg-[#1a1a26] border border-[#2b271f] hover:border-[#d4af37] text-xs font-sans uppercase tracking-wider text-[#f7f6f2] transition-all flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{t('viewDetails')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
