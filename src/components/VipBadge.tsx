import React from 'react';
import { ShieldCheck, Award, Gem, Crown, Medal } from 'lucide-react';
import { motion } from 'motion/react';
import { VipTier } from '../types';

interface VipBadgeProps {
  points: number;
  className?: string;
  showLabel?: boolean;
}

export const getVipTier = (points: number): VipTier => {
  if (points >= 5000) return 'Emerald';
  if (points >= 1500) return 'Gold';
  if (points >= 500) return 'Silver';
  return 'Bronze';
};

const tierConfigs: Record<VipTier, {
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  label: string;
  glow: string;
}> = {
  Bronze: {
    icon: Medal,
    color: 'text-[#cd7f32]',
    bg: 'bg-gradient-to-b from-[#2a1d15] to-[#150f0a]',
    border: 'border-[#cd7f32]/40',
    label: 'Bronze Patron',
    glow: 'shadow-[0_0_10px_rgba(205,127,50,0.15)]',
  },
  Silver: {
    icon: ShieldCheck,
    color: 'text-[#c0c0c0]',
    bg: 'bg-gradient-to-b from-[#252529] to-[#0f0f12]',
    border: 'border-[#c0c0c0]/40',
    label: 'Silver Elite',
    glow: 'shadow-[0_0_10px_rgba(192,192,192,0.15)]',
  },
  Gold: {
    icon: Award,
    color: 'text-[#d4af37]',
    bg: 'bg-gradient-to-b from-[#2a261a] to-[#11100a]',
    border: 'border-[#d4af37]/40',
    label: 'Gold Sovereign',
    glow: 'shadow-[0_0_15px_rgba(212,175,55,0.25)]',
  },
  Emerald: {
    icon: Gem,
    color: 'text-emerald-400',
    bg: 'bg-gradient-to-b from-[#0e2418] to-[#050d09]',
    border: 'border-emerald-500/40',
    label: 'Emerald Royal',
    glow: 'shadow-[0_0_20px_rgba(52,211,153,0.3)]',
  },
};

export const VipBadge: React.FC<VipBadgeProps> = ({ points, className = '', showLabel = true }) => {
  const tier = getVipTier(points);
  const config = tierConfigs[tier];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border shadow-sm animate-premium-shimmer overflow-hidden ${config.bg} ${config.border} ${config.glow} ${className} preserve-3d`}
    >
      {/* Metallic Shine Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
      
      <Icon className={`w-3 h-3 ${config.color} relative z-10 drop-shadow-sm`} />
      {showLabel && (
        <span className={`text-[9px] uppercase tracking-widest font-bold ${config.color} whitespace-nowrap relative z-10 drop-shadow-sm`}>
          {config.label}
        </span>
      )}
    </motion.div>
  );
};
