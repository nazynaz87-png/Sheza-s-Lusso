import React from 'react';
import { Trophy, Medal, Crown, Star, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { VipBadge } from './VipBadge';
import { UserProfile } from '../types';

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  avatar: string;
  location: string;
}

const GLOBAL_ELITE: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Empress Isabella',
    points: 25400,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    location: 'Monaco',
  },
  {
    rank: 2,
    name: 'Baron Alexander',
    points: 18200,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    location: 'Geneva',
  },
  {
    rank: 3,
    name: 'Sheikh Zayed',
    points: 12900,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    location: 'Dubai',
  },
  {
    rank: 4,
    name: 'Lady Genevieve',
    points: 9800,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    location: 'Paris',
  },
  {
    rank: 5,
    name: 'Count Maximilian',
    points: 7400,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    location: 'Vienna',
  },
];

interface LeaderboardProps {
  currentUser: UserProfile;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ currentUser }) => {
  const isTopRanked = GLOBAL_ELITE.some(entry => entry.name === currentUser.name);

  return (
    <div className="space-y-6">
      <div className="text-center max-w-md mx-auto">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-medium block mb-1">
          The Maison's Highest Honors
        </span>
        <h3 className="font-serif text-xl text-[#f7f6f2] flex items-center justify-center gap-2">
          <Trophy className="w-5 h-5 text-[#d4af37]" />
          Global Elite Leaderboard
        </h3>
        <p className="text-xs text-[#a39f97] mt-1 leading-relaxed">
          Celebrating our most distinguished patrons. Accumulate Crown Points through bespoke orders and exclusive experiences to join the elite.
        </p>
      </div>

      <div className="bg-[#111119] rounded-2xl border border-[#2d281f] overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 divide-y divide-[#2d281f]">
          {GLOBAL_ELITE.map((entry, index) => {
            const isFirst = entry.rank === 1;
            const isTopThree = entry.rank <= 3;
            
            return (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 flex items-center gap-4 group transition-colors hover:bg-[#1a1a24] ${isFirst ? 'bg-gradient-to-r from-[#1a1810] to-transparent' : ''}`}
              >
                <div className="w-8 flex justify-center">
                  {entry.rank === 1 && <Crown className="w-5 h-5 text-[#d4af37] animate-pulse" />}
                  {entry.rank === 2 && <Medal className="w-5 h-5 text-[#c0c0c0]" />}
                  {entry.rank === 3 && <Medal className="w-5 h-5 text-[#cd7f32]" />}
                  {entry.rank > 3 && <span className="text-xs font-mono text-[#555]">{entry.rank}</span>}
                </div>

                <div className="relative">
                  <div className={`w-12 h-12 rounded-full border-2 p-0.5 overflow-hidden bg-black ${isTopThree ? 'border-[#c5a059]' : 'border-[#2d281f]'}`}>
                    <img src={entry.avatar} alt={entry.name} className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  {isFirst && (
                    <div className="absolute -top-1 -right-1 bg-[#d4af37] p-0.5 rounded-full ring-2 ring-black">
                      <Star className="w-2.5 h-2.5 text-black fill-current" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-serif text-[#f7f6f2] group-hover:text-[#e5c583] transition-colors">{entry.name}</h4>
                    <span className="text-[9px] text-[#555] font-mono tracking-tighter uppercase">{entry.location}</span>
                  </div>
                  <div className="mt-1">
                    <VipBadge points={entry.points} showLabel={false} className="scale-75 origin-left" />
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-serif text-[#e5c583] font-bold tracking-wide">
                    {entry.points.toLocaleString()}
                  </div>
                  <div className="text-[9px] text-[#555] uppercase tracking-widest font-bold">Crown Pts</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {!isTopRanked && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-gradient-to-r from-[#171720] via-[#1f1d17] to-[#171720] border border-[#d4af37]/30 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#c5a059] p-0.5 overflow-hidden bg-black">
              <img src={currentUser.logoUrl} alt="You" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <div className="text-[10px] text-[#c5a059] font-bold uppercase tracking-widest mb-0.5">Your Position</div>
              <h5 className="text-xs text-[#f7f6f2] font-serif">Rank #42 • Next Milestone: 7,400 Pts</h5>
            </div>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-[10px] font-bold">+15% vs Last Week</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
