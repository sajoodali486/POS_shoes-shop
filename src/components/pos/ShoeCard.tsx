'use client';

import React, { useState } from 'react';
import { ShoeItem } from '@/types/pos';
import { usePos } from '@/context/PosContext';
import { ShoppingBag, Star, Check } from 'lucide-react';

interface ShoeCardProps {
  shoe: ShoeItem;
}

export const ShoeCard: React.FC<ShoeCardProps> = ({ shoe }) => {
  const { addToCart } = usePos();
  
  // Default selected size: first available size with stock > 0
  const availableSize = shoe.sizes.find((s) => s.stock > 0)?.size || shoe.sizes[0]?.size || 40;
  const [selectedSize, setSelectedSize] = useState<number>(availableSize);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const currentSizeObj = shoe.sizes.find((s) => s.size === selectedSize);
  const currentStock = currentSizeObj ? currentSizeObj.stock : 0;
  const isOutOfStock = currentStock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(shoe, selectedSize, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 800);
  };

  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-150 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between group">
      <div>
        {/* Thumbnail & Badges */}
        <div className="relative aspect-4/3 rounded-2xl bg-slate-100 overflow-hidden mb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shoe.image}
            alt={shoe.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-slate-800 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-lg shadow-xs">
              {shoe.brand}
            </span>
            {shoe.isFeatured && (
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 backdrop-blur-md px-1.5 py-0.5 rounded-lg">
                Popular
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
            <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
            <span>{shoe.rating}</span>
          </div>

          {/* Stock Tag */}
          <div className="absolute bottom-2.5 right-2.5">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md ${
                isOutOfStock
                  ? 'bg-rose-500/90 text-white'
                  : currentStock < 4
                  ? 'bg-amber-500/90 text-white'
                  : 'bg-emerald-600/90 text-white'
              }`}
            >
              {isOutOfStock ? 'Sold Out' : `${currentStock} left (Size ${selectedSize})`}
            </span>
          </div>
        </div>

        {/* Shoe Info */}
        <div className="mb-2">
          <div className="text-[11px] font-semibold text-slate-400 tracking-wide">
            {shoe.category} • {shoe.color}
          </div>
          <h3 className="text-sm font-bold text-slate-900 line-clamp-1 mt-0.5" title={shoe.name}>
            {shoe.name}
          </h3>
          <div className="text-xs text-slate-400 font-mono mt-0.5">
            SKU: {shoe.sku}
          </div>
        </div>

        {/* Shoe Size Selector Matrix */}
        <div className="my-2.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1.5">
            <span>Choose Size (EU):</span>
            <span className="text-emerald-700 font-bold">EU {selectedSize}</span>
          </div>
          <div className="grid grid-cols-6 gap-1">
            {shoe.sizes.map((s) => {
              const isSelected = selectedSize === s.size;
              const hasStock = s.stock > 0;
              return (
                <button
                  key={s.size}
                  disabled={!hasStock}
                  onClick={() => setSelectedSize(s.size)}
                  className={`py-1 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : hasStock
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-slate-50 text-slate-300 line-through cursor-not-allowed'
                  }`}
                >
                  {s.size}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Price & Add to Cart Footer */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 mt-1">
        <div>
          <span className="text-[10px] text-slate-400 font-medium block">Price</span>
          <span className="text-base font-extrabold text-slate-900">
            Rs. {shoe.price.toLocaleString()}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
            addedAnimation
              ? 'bg-emerald-700 text-white'
              : isOutOfStock
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-slate-900 hover:bg-slate-800 text-white active:scale-95'
          }`}
        >
          {addedAnimation ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-300" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
