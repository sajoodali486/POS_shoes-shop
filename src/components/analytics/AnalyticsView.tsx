'use client';

import React from 'react';
import { usePos } from '@/context/PosContext';
import {
  BarChart3,
  TrendingUp,
  Footprints,
  Award,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { orders } = usePos();

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const totalItemsSold = orders.reduce(
    (acc, o) => acc + o.items.reduce((sum, i) => sum + i.quantity, 0),
    0
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Footwear Sales & Trend Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Deep dive into top-performing sneaker brands, popular shoe sizes, and revenue growth in PKR.
        </p>
      </div>

      {/* Top 3 KPI stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-white border border-slate-150 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Revenue (YTD)
          </span>
          <div className="text-3xl font-black text-slate-900 mt-1">
            Rs. {(totalRevenue + 12850000.0).toLocaleString('en-US', { minimumFractionDigits: 0 })}
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% vs previous year</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-150 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Shoes Sold
          </span>
          <div className="text-3xl font-black text-slate-900 mt-1">
            {totalItemsSold + 3480} pairs
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 mt-2">
            <Footprints className="w-3.5 h-3.5" />
            <span>Average 24 pairs / day</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-150 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Top Performing Brand
          </span>
          <div className="text-3xl font-black text-slate-900 mt-1">
            Nike & Jordan
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 mt-2">
            <Award className="w-3.5 h-3.5" />
            <span>42% of total store revenue</span>
          </div>
        </div>
      </div>

      {/* Brand Share Breakdown & Shoe Size Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand Performance List */}
        <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-800">Brand Revenue Share</h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              Live Feed
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { brand: 'Nike & Jordan', share: 42, color: 'bg-emerald-500', revenue: 'Rs. 1,850,000' },
              { brand: 'Adidas Originals', share: 28, color: 'bg-teal-500', revenue: 'Rs. 1,240,000' },
              { brand: 'New Balance', share: 18, color: 'bg-indigo-500', revenue: 'Rs. 980,000' },
              { brand: 'Puma & Vans', share: 12, color: 'bg-amber-500', revenue: 'Rs. 650,000' },
            ].map((item) => (
              <div key={item.brand} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-800">{item.brand}</span>
                  <span className="text-slate-900">{item.revenue} ({item.share}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${item.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Popular Shoe Sizes */}
        <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-800">Popular Shoe Sizes Demand</h3>
            <span className="text-xs text-slate-400 font-semibold">EU Sizing</span>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { size: 'EU 42', demand: 'Highest (34%)', badge: 'Best Seller', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
              { size: 'EU 41', demand: 'High (26%)', badge: 'Popular', bg: 'bg-emerald-50/70 text-emerald-800 border-emerald-200' },
              { size: 'EU 43', demand: 'High (19%)', badge: 'Popular', bg: 'bg-emerald-50/50 text-emerald-800 border-emerald-200' },
              { size: 'EU 40', demand: 'Medium (12%)', badge: 'Steady', bg: 'bg-slate-50 text-slate-700 border-slate-200' },
              { size: 'EU 44', demand: 'Medium (6%)', badge: 'Steady', bg: 'bg-slate-50 text-slate-700 border-slate-200' },
              { size: 'EU 39/45', demand: 'Niche (3%)', badge: 'Low', bg: 'bg-slate-50 text-slate-500 border-slate-200' },
            ].map((item) => (
              <div
                key={item.size}
                className={`p-4 rounded-2xl border text-center flex flex-col justify-between ${item.bg}`}
              >
                <div>
                  <span className="text-lg font-black block">{item.size}</span>
                  <span className="text-[11px] font-bold mt-1 block">{item.demand}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 mt-2">
                  {item.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
