'use client';

import React from 'react';
import { CATEGORIES, BRANDS } from '@/data/categories';

interface CategoryPillsProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
}) => {
  return (
    <div className="space-y-3 mb-6">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/25 ring-2 ring-emerald-600/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100/80 border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Brand Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
          Brands:
        </span>
        {BRANDS.map((brand) => {
          const isSelected = selectedBrand === brand;
          return (
            <button
              key={brand}
              onClick={() => onSelectBrand(brand)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100/70 text-slate-500 hover:bg-slate-200/80'
              }`}
            >
              {brand}
            </button>
          );
        })}
      </div>
    </div>
  );
};
