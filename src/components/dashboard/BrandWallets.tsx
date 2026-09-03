'use client';

import React from 'react';
import { BRAND_WALLETS } from '@/data/dashboardStats';
import { Wallet, Plus, MoreHorizontal } from 'lucide-react';

export const BrandWallets: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-base font-bold text-slate-800">Brand Revenue Wallets</span>
        <button className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-xl border border-emerald-100 hover:bg-emerald-100/70 transition-all cursor-pointer">
          <Plus className="w-3.5 h-3.5" />
          <span>Add New</span>
        </button>
      </div>

      {/* Grid of Wallets */}
      <div className="grid grid-cols-2 gap-3">
        {BRAND_WALLETS.map((w, index) => {
          return (
            <div
              key={index}
              className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{w.symbol}</span>
                  <span className="text-xs font-bold text-slate-700">{w.currency}</span>
                </div>
                <button className="text-slate-300 hover:text-slate-500">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-sm sm:text-base font-extrabold text-slate-900 mb-1 truncate">
                Rs. {w.amount.toLocaleString('en-US', { minimumFractionDigits: 0 })}
              </div>

              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-700 font-semibold bg-emerald-100/60 px-1.5 py-0.5 rounded-md">
                  {w.status}
                </span>
                <span className="text-slate-400 font-medium truncate max-w-[80px]">
                  {w.brand}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
