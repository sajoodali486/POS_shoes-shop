'use client';

import React, { useState } from 'react';
import { usePos } from '@/context/PosContext';
import { ShoeItem, ShoeSizeStock } from '@/types/pos';
import { CATEGORIES, BRANDS, SHOE_SIZES } from '@/data/categories';
import { X, Plus, Footprints, Check } from 'lucide-react';

interface AddShoeModalProps {
  onClose: () => void;
}

export const AddShoeModal: React.FC<AddShoeModalProps> = ({ onClose }) => {
  const { addNewShoe } = usePos();

  const [name, setName] = useState('');
  const [brand, setBrand] = useState<any>('Nike');
  const [category, setCategory] = useState<any>('Sneakers');
  const [sku, setSku] = useState(`SHOE-${Math.floor(1000 + Math.random() * 9000)}`);
  const [barcode, setBarcode] = useState(`88${Math.floor(100000000 + Math.random() * 900000000)}`);
  const [price, setPrice] = useState(25000);
  const [costPrice, setCostPrice] = useState(16000);
  const [color, setColor] = useState('White / Emerald');
  const [gender, setGender] = useState<'Men' | 'Women' | 'Unisex'>('Unisex');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80');

  // Size stock matrix
  const [sizesStock, setSizesStock] = useState<Record<number, number>>({
    39: 5,
    40: 8,
    41: 12,
    42: 10,
    43: 6,
    44: 4,
  });

  const handleStockChange = (size: number, val: number) => {
    setSizesStock((prev) => ({
      ...prev,
      [size]: Math.max(0, val),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sizesArray: ShoeSizeStock[] = Object.entries(sizesStock).map(([s, stock]) => ({
      size: Number(s),
      stock: Number(stock),
    }));

    const totalStock = sizesArray.reduce((acc, s) => acc + s.stock, 0);

    addNewShoe({
      name,
      brand,
      category,
      sku,
      barcode,
      price: Number(price),
      costPrice: Number(costPrice),
      image,
      color,
      gender,
      sizes: sizesArray,
      totalStock,
      rating: 4.8,
      isFeatured: true,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-slate-150 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <Footprints className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Add New Shoe Model</h2>
              <p className="text-xs text-slate-400">Configure sizes, inventory stock, and pricing (PKR)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Shoe Name & Brand */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Shoe Model Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Nike Air Force 1 '07"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                {BRANDS.filter((b) => b !== 'All Brands').map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category & Color */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                {CATEGORIES.filter((c) => c !== 'All Shoes').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Colorway</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>
          </div>

          {/* Pricing & SKU */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Retail Price (Rs.)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Cost Price (Rs.)</label>
              <input
                type="number"
                value={costPrice}
                onChange={(e) => setCostPrice(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">SKU Code</label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Sizes Stock Matrix */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Size & Initial Stock Quantity Matrix
            </label>
            <div className="grid grid-cols-6 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
              {[39, 40, 41, 42, 43, 44].map((sz) => (
                <div key={sz} className="text-center">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">EU {sz}</span>
                  <input
                    type="number"
                    min="0"
                    value={sizesStock[sz] || 0}
                    onChange={(e) => handleStockChange(sz, Number(e.target.value))}
                    className="w-full text-center py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save Shoe to Catalog</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
