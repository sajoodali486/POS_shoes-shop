'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { usePos } from '@/context/PosContext';
import {
  Search,
  HelpCircle,
  Mail,
  Bell,
  Calendar,
  Download,
  Plus,
  ShoppingBag,
  Store,
} from 'lucide-react';

interface TopHeaderProps {
  onSearchChange?: (q: string) => void;
  searchPlaceholder?: string;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onSearchChange,
  searchPlaceholder = 'Search shoes by model, brand, or SKU...',
}) => {
  const { user } = useAuth();
  const { setActiveTab } = usePos();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  const currentDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-150 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Search Input with ⌘K Badge */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-16 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
          />
          <div className="absolute right-3 top-2.5 flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded-lg border border-slate-300/40">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 sm:gap-4 ml-4">
        {/* Date Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-semibold text-slate-600">
          <Calendar className="w-3.5 h-3.5 text-emerald-600" />
          <span>{currentDateStr}</span>
        </div>

        {/* Action Button: Quick POS / New Sale */}
        <button
          onClick={() => setActiveTab('pos')}
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
          <span>New Sale</span>
        </button>

        {/* Quick Action Icons */}
        <div className="flex items-center gap-1 sm:gap-1.5 border-l border-slate-200 pl-3">
          <button
            title="Help"
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
          <button
            title="Messages"
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4" />
          </button>
          <button
            title="Notifications"
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 bg-emerald-500 rounded-full absolute top-2 right-2 border-2 border-white" />
          </button>
        </div>

        {/* User Profile Avatar - Clickable to open Profile */}
        <button
          onClick={() => setActiveTab('profile')}
          className="flex items-center gap-2.5 pl-2 border-l border-slate-200 hover:opacity-80 transition-all cursor-pointer text-left group"
          title="Click to view My Profile & Shift Settings"
        >
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
              alt={user?.name || 'User'}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/30 group-hover:ring-emerald-500 transition-all"
            />
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full absolute bottom-0 right-0 border-2 border-white" />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-slate-900 line-clamp-1 leading-tight group-hover:text-emerald-700 transition-colors">
              {user?.name || 'Sajood Ali'}
            </p>
            <p className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
              <Store className="w-2.5 h-2.5" />
              {user?.role || 'Store Manager'}
            </p>
          </div>
        </button>
      </div>
    </header>
  );
};
