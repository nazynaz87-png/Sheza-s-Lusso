import React, { useState } from 'react';
import { Sparkles, Bot, Send, Loader2, BookmarkPlus, Check, RefreshCw, ShoppingBag } from 'lucide-react';
import { PREMADE_CONCIERGE_PROMPTS } from '../data/luxuryData';
import { Currency } from '../types';

interface AIConciergeProps {
  currentCurrency: Currency;
  onAddCustomToInquiry: (customPlan: { title: string; notes: string; category: string }) => void;
}

export const AIConcierge: React.FC<AIConciergeProps> = ({
  currentCurrency,
  onAddCustomToInquiry,
}) => {
  const [userPrompt, setUserPrompt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Surprise & Romantic Plans');
  const [destination, setDestination] = useState('Worldwide / Home Delivery');
  const [budgetTier, setBudgetTier] = useState('Under $150 (Affordable & Chic)');
  const [loading, setLoading] = useState(false);
  const [conciergeReply, setConciergeReply] = useState<string | null>(null);
  const [savedToCart, setSavedToCart] = useState(false);

  const categories = [
    'Surprise & Romantic Plans',
    'Dresses & Gala Styling',
    'Affordable Destination Weddings',
    'Worldwide Vacation Packages',
    'Jewelry & Watch Styling',
    'Birthday & Proposal Celebrations',
  ];

  const handleGenerate = async (promptToUse?: string) => {
    const textToSend = promptToUse || userPrompt;
    if (!textToSend.trim()) return;

    setLoading(true);
    setConciergeReply(null);
    setSavedToCart(false);

    try {
      const res = await fetch('/api/concierge/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          category: selectedCategory,
          destination,
          budget: budgetTier,
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setConciergeReply(data.reply);
      } else {
        setConciergeReply('Our personal styling and planning team has received your request and is ready to assist you!');
      }
    } catch (err) {
      console.error('Styling advisor request failed:', err);
      setConciergeReply('We encountered a temporary connection issue. Please feel free to browse our product catalog or try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToCart = () => {
    if (!conciergeReply) return;
    onAddCustomToInquiry({
      title: `Custom ${selectedCategory} Package`,
      notes: conciergeReply,
      category: selectedCategory,
    });
    setSavedToCart(true);
    setTimeout(() => setSavedToCart(false), 4000);
  };

  return (
    <section id="concierge" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#242018] text-[#f7f6f2]">
      <div className="bg-[#121218] border border-[#2e291f] rounded-2xl p-6 sm:p-12 relative overflow-hidden shadow-2xl">
        {/* Subtle Ambient Radial Gold Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181822] border border-[#332e22] text-[10px] font-medium tracking-[0.3em] uppercase text-[#d4af37] mb-3 font-sans shadow-sm">
              <Bot className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Sheza's AI Personal Stylist & Event Planner</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#f7f6f2] tracking-tight mb-3">
              Tailor-Made Royal Luxury at Honest Prices
            </h2>
            <p className="text-xs sm:text-sm text-[#a8a49c] font-light max-w-2xl mx-auto leading-relaxed">
              Looking for the perfect anniversary gift, wedding package, gala dress coordination, or vacation getaway within your exact budget? Ask Sheza's AI Stylist for instant personalized recommendations.
            </p>
          </div>

          {/* Preset Inspiration Chips */}
          <div className="mb-6">
            <span className="text-[10px] uppercase tracking-widest text-[#7d7971] block mb-2 font-medium font-sans">
              Instant Ideas & Styling Combinations:
            </span>
            <div className="flex flex-wrap gap-2">
              {PREMADE_CONCIERGE_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setUserPrompt(p.prompt);
                    handleGenerate(p.prompt);
                  }}
                  className="text-xs px-3.5 py-1.5 rounded-full bg-[#181822] hover:border-[#d4af37] border border-[#2d291f] text-[#c4c0b6] hover:text-[#e5c583] transition-all flex items-center gap-1.5 text-left shadow-sm"
                >
                  <Sparkles className="w-3 h-3 text-[#d4af37] shrink-0" />
                  <span>{p.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#a8a49c] font-medium font-sans block mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#181822] border border-[#2f2b20] rounded-lg px-3 py-2 text-xs text-[#f7f6f2] focus:outline-none focus:border-[#d4af37]"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-[#181822] text-[#f7f6f2]">{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#a8a49c] font-medium font-sans block mb-1">
                Country / Destination
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. USA, UK, India, Canada, Italy"
                className="w-full bg-[#181822] border border-[#2f2b20] rounded-lg px-3 py-2 text-xs text-[#f7f6f2] focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#a8a49c] font-medium font-sans block mb-1">
                Comfortable Budget Target
              </label>
              <select
                value={budgetTier}
                onChange={(e) => setBudgetTier(e.target.value)}
                className="w-full bg-[#181822] border border-[#2f2b20] rounded-lg px-3 py-2 text-xs text-[#f7f6f2] focus:outline-none focus:border-[#d4af37]"
              >
                <option value="Under $75 (Everyday Chic)" className="bg-[#181822] text-[#f7f6f2]">Under $75 (Everyday Chic)</option>
                <option value="Under $150 (Affordable & Chic)" className="bg-[#181822] text-[#f7f6f2]">Under $150 (Affordable & Chic)</option>
                <option value="$150 - $350 (Special Occasion)" className="bg-[#181822] text-[#f7f6f2]">$150 - $350 (Special Occasion)</option>
                <option value="$350 - $750 (Travel & Ceremony)" className="bg-[#181822] text-[#f7f6f2]">$350 - $750 (Travel & Ceremony)</option>
                <option value="$750 - $1,000 (Complete All-Inclusive)" className="bg-[#181822] text-[#f7f6f2]">$750 - $1,000 (Complete All-Inclusive)</option>
              </select>
            </div>
          </div>

          {/* User Prompt Textarea & Action */}
          <div className="relative mb-6">
            <textarea
              rows={3}
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Tell us what you're planning (e.g., 'I want an emerald necklace and matching dress for my sister's wedding for under $200 with worldwide delivery to Manchester UK')..."
              className="w-full bg-[#181822] border border-[#2f2b20] rounded-xl p-3.5 text-xs sm:text-sm text-[#f7f6f2] placeholder-[#7d7971] focus:outline-none focus:border-[#d4af37] resize-none shadow-inner"
            />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-2.5">
              <span className="text-[10px] text-[#7d7971] font-sans">
                Real-time styling advice • Free Worldwide Shipping over $75
              </span>
              <button
                onClick={() => handleGenerate()}
                disabled={loading || !userPrompt.trim()}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b38e2d] text-black font-semibold font-sans text-[11px] tracking-widest uppercase hover:brightness-110 transition-all disabled:opacity-40 flex items-center justify-center gap-2 shadow-md"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-black" />
                    <span>Curating Recommendations...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-black" />
                    <span>Get Personalized Plan</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Live Stylist Result Display */}
          {conciergeReply && (
            <div className="mt-6 bg-[#171722] border border-[#3b3528] rounded-xl p-6 shadow-xl animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2d291f] pb-3 mb-4">
                <div>
                  <span className="text-[9px] tracking-widest uppercase font-medium text-[#d4af37] block font-sans">
                    Custom Shopping Plan
                  </span>
                  <h3 className="text-lg font-serif font-light text-[#f7f6f2]">
                    Curated by Sheza's Personal Styling Desk
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleGenerate()}
                    className="p-2 rounded-lg bg-[#20202d] text-[#c4c0b6] hover:text-[#f7f6f2] hover:border-[#d4af37] border border-[#332f22] text-xs flex items-center gap-1 transition-colors"
                    title="Regenerate proposal"
                  >
                    <RefreshCw className="w-3 h-3 text-[#d4af37]" />
                    <span className="hidden sm:inline font-sans text-[10px] tracking-wider uppercase">Refine</span>
                  </button>
                  <button
                    onClick={handleSaveToCart}
                    disabled={savedToCart}
                    className={`px-4 py-2 rounded-lg font-sans text-[10px] tracking-widest uppercase font-bold flex items-center gap-1.5 transition-all shadow-md ${
                      savedToCart
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-[#d4af37] to-[#b38e2d] text-black hover:brightness-110'
                    }`}
                  >
                    {savedToCart ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5 text-black" />
                        <span>Add Plan to Cart ($89)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Formatted Content */}
              <div className="prose max-w-none text-xs text-[#d8d5cc] leading-relaxed space-y-3 whitespace-pre-line font-light">
                {conciergeReply}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
