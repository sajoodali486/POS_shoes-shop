'use client';

import React, { useState } from 'react';
import { MONTHLY_SALES_DATA } from '@/data/dashboardStats';
import { BarChart2, MoreHorizontal, ChevronDown, TrendingUp } from 'lucide-react';

export const SalesChart: React.FC = () => {
  const [activeRange, setActiveRange] = useState('This Year');
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  const maxVal = 1600000;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <BarChart2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-base font-bold text-slate-800">Overview</span>
            <span className="text-[10px] text-slate-400 font-medium block">Monthly Footwear Revenue (PKR)</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Legend */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span>Earnings</span>
          </div>

          {/* Range Dropdown */}
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
            <span>{activeRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <button className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative pt-8 pb-2">
        {/* Y Axis Guide Lines */}
        <div className="absolute inset-x-0 top-8 bottom-8 flex flex-col justify-between pointer-events-none text-[10px] text-slate-400 font-medium pr-2">
          <div className="border-b border-dashed border-slate-100 w-full flex items-center justify-between pb-1">
            <span>Rs. 1.5M</span>
          </div>
          <div className="border-b border-dashed border-slate-100 w-full flex items-center justify-between pb-1">
            <span>Rs. 1.0M</span>
          </div>
          <div className="border-b border-dashed border-slate-100 w-full flex items-center justify-between pb-1">
            <span>Rs. 500K</span>
          </div>
          <div className="w-full flex items-center justify-between">
            <span>Rs. 0</span>
          </div>
        </div>

        {/* Bars Container */}
        <div className="relative z-10 flex items-end justify-between gap-2 sm:gap-3.5 pl-12 pr-2 h-56">
          {MONTHLY_SALES_DATA.map((item) => {
            const heightPercent = Math.max(12, Math.round((item.sales / maxVal) * 100));
            const isHovered = hoveredMonth === item.month;
            const isPeak = item.isPeak;

            return (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
                onMouseEnter={() => setHoveredMonth(item.month)}
                onMouseLeave={() => setHoveredMonth(null)}
              >
                {/* Tooltip Pill */}
                {(isPeak || isHovered) && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white shadow-xl rounded-xl px-2.5 py-1 flex items-center gap-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-slate-300 font-medium">{item.month}:</span>
                    <span className="text-xs font-black text-white">Rs. {(item.sales).toLocaleString()}</span>
                  </div>
                )}

                {/* Bar Column with guaranteed min height and background */}
                <div className="w-full max-w-[28px] h-full flex flex-col justify-end">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-xl transition-all duration-300 ${
                      isPeak
                        ? 'bg-gradient-to-t from-emerald-700 via-emerald-500 to-emerald-400 shadow-md shadow-emerald-500/30 ring-2 ring-emerald-400/40'
                        : isHovered
                        ? 'bg-emerald-500'
                        : 'bg-emerald-200/90 hover:bg-emerald-300'
                    }`}
                  />
                </div>

                {/* Month Label */}
                <span
                  className={`text-[11px] font-semibold mt-2 transition-colors ${
                    isPeak
                      ? 'text-emerald-700 font-extrabold'
                      : isHovered
                      ? 'text-slate-900 font-bold'
                      : 'text-slate-400'
                  }`}
                >
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
