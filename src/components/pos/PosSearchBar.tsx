'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePos } from '@/context/PosContext';
import { ShoeItem } from '@/types/pos';
import { Search, X, ShoppingBag, Check, Barcode, Plus } from 'lucide-react';

interface PosSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const PosSearchBar: React.FC<PosSearchBarProps> = ({ searchQuery, onSearchChange }) => {
  const { shoes, addToCart } = usePos();
  const [isOpen, setIsOpen] = useState(false);
  const [lastAddedKey, setLastAddedKey] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter shoes for live search dropdown
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return shoes.filter((shoe) => {
      return (
        shoe.name.toLowerCase().includes(q) ||
        shoe.brand.toLowerCase().includes(q) ||
        shoe.sku.toLowerCase().includes(q) ||
        shoe.color.toLowerCase().includes(q) ||
        shoe.category.toLowerCase().includes(q)
      );
    });
  }, [shoes, searchQuery]);

  const handleQuickAdd = (shoe: ShoeItem, size: number) => {
    addToCart(shoe, size, 1);
    const key = `${shoe.id}-${size}`;
    setLastAddedKey(key);
    setTimeout(() => {
      setLastAddedKey(null);
    }, 1200);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl">
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4 text-slate-400" />
        </div>

        <input
          ref={inputRef}
          type="text"
          placeholder="Search by shoe name, brand, SKU or barcode to add to cart..."
          value={searchQuery}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setIsOpen(true);
          }}
          className="w-full pl-10 pr-24 py-2.5 bg-white border border-slate-200/90 rounded-2xl text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-xs transition-all"
        />

        {/* Action icons on right */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {searchQuery && (
            <button
              onClick={() => {
                onSearchChange('');
                inputRef.current?.focus();
              }}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[10px] font-semibold border border-slate-200">
            <Barcode className="w-3 h-3 text-slate-400" />
            <span>POS Live</span>
          </div>
        </div>
      </div>

      {/* Live Search Quick Add Dropdown */}
      {isOpen && searchQuery.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[420px] overflow-y-auto">
          <div className="flex items-center justify-between px-2 py-1.5 mb-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Live Products ({searchResults.length})</span>
            <span className="text-[10px] text-emerald-600 normal-case font-semibold">Click any size to add to cart</span>
          </div>

          {searchResults.length === 0 ? (
            <div className="p-6 text-center text-slate-400 text-xs">
              <p className="font-semibold text-slate-600">No matching shoes found</p>
              <p className="text-[11px] mt-1">Try searching by model, brand, or SKU number.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {searchResults.map((shoe) => {
                const firstAvailableSize = shoe.sizes.find((s) => s.stock > 0);

                return (
                  <div
                    key={shoe.id}
                    className="p-3 rounded-2xl bg-slate-50/70 hover:bg-emerald-50/40 border border-slate-150 hover:border-emerald-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    {/* Shoe Details */}
                    <div className="flex items-center gap-3 min-w-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={shoe.image}
                        alt={shoe.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200 bg-white"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded">
                            {shoe.brand}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {shoe.sku}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5" title={shoe.name}>
                          {shoe.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-extrabold text-slate-900">
                            Rs. {shoe.price.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            • {shoe.totalStock} in stock
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Size Select & Add Buttons */}
                    <div className="flex items-center gap-1.5 flex-wrap shrink-0 sm:justify-end">
                      <span className="text-[10px] font-bold text-slate-400 mr-1 hidden lg:inline">
                        Select Size:
                      </span>
                      {shoe.sizes.map((s) => {
                        const isAdded = lastAddedKey === `${shoe.id}-${s.size}`;
                        const isOutOfStock = s.stock <= 0;

                        return (
                          <button
                            key={s.size}
                            onClick={() => handleQuickAdd(shoe, s.size)}
                            disabled={isOutOfStock}
                            title={isOutOfStock ? 'Out of stock' : `Add Size EU ${s.size} (${s.stock} in stock)`}
                            className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                              isAdded
                                ? 'bg-emerald-600 text-white scale-105 shadow-xs'
                                : isOutOfStock
                                ? 'bg-slate-100 text-slate-300 cursor-not-allowed line-through'
                                : 'bg-white hover:bg-emerald-600 hover:text-white text-slate-700 border border-slate-200 shadow-2xs active:scale-95'
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>EU {s.size}</span>
                              </>
                            ) : (
                              <span>EU {s.size}</span>
                            )}
                          </button>
                        );
                      })}

                      {/* Quick Add First Size Button */}
                      {firstAvailableSize && (
                        <button
                          onClick={() => handleQuickAdd(shoe, firstAvailableSize.size)}
                          className="ml-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
                          title={`Quick add size ${firstAvailableSize.size}`}
                        >
                          <Plus className="w-3 h-3" />
                          <span>Cart</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
