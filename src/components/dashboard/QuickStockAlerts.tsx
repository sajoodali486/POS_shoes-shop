'use client';

import React from 'react';
import { usePos } from '@/context/PosContext';
import { FOOTWEAR_SAVINGS_PLAN } from '@/data/dashboardStats';
import { Sparkles, MoreHorizontal, AlertTriangle, ArrowUpRight } from 'lucide-react';

export const QuickStockAlerts: React.FC = () => {
  const { shoes, setActiveTab } = usePos();
  const lowStockShoes = shoes.filter((s) => s.totalStock < 25);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-slate-800">My Savings Plan</span>
          </div>
          <button className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Goals Progress Bars (PKR) */}
        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                <span className="text-xs font-bold text-slate-700">Investment Goal</span>
              </div>
              <span className="text-xs font-bold text-slate-800">70%</span>
            </div>
            <div className="text-xs text-slate-500 font-semibold mb-2">
              Rs. 1,750,000 / <span className="text-slate-400">Rs. 2,500,000</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500 rounded-full" style={{ width: '70%' }} />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-xs font-bold text-slate-700">Emergency Fund</span>
              </div>
              <span className="text-xs font-bold text-slate-800">74%</span>
            </div>
            <div className="text-xs text-slate-500 font-semibold mb-2">
              Rs. 740,000 / <span className="text-slate-400">Rs. 1,000,000</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '74%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Callout banner */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span className="text-xs text-slate-600 font-medium">
            <strong className="text-slate-900">{lowStockShoes.length} shoe models</strong> running low in stock
          </span>
        </div>
        <button
          onClick={() => setActiveTab('inventory')}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-0.5 cursor-pointer"
        >
          <span>View</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
