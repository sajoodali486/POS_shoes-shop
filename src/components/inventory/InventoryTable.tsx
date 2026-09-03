'use client';

import React, { useState } from 'react';
import { usePos } from '@/context/PosContext';
import { AddShoeModal } from './AddShoeModal';
import {
  Package,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  ArrowUpDown,
  PlusCircle,
  MinusCircle,
  TrendingUp,
} from 'lucide-react';

export const InventoryTable: React.FC = () => {
  const { shoes, updateShoeStock } = usePos();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBrand, setFilterBrand] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = shoes.filter((shoe) => {
    const matchSearch =
      searchQuery === '' ||
      shoe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shoe.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shoe.sku.toLowerCase().includes(searchQuery.toLowerCase());

    const matchBrand = filterBrand === 'All' || shoe.brand === filterBrand;

    return matchSearch && matchBrand;
  });

  const totalPairsInStock = shoes.reduce((acc, s) => acc + s.totalStock, 0);
  const totalStockValue = shoes.reduce((acc, s) => acc + s.costPrice * s.totalStock, 0);
  const lowStockCount = shoes.filter((s) => s.totalStock < 20).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Footwear Inventory & Stock
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Manage shoe variants, size distributions, costs, and warehouse stock levels (PKR).
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold transition-all shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Shoe</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-150 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400">Total Pairs In Stock</span>
            <div className="text-2xl font-extrabold text-slate-900">{totalPairsInStock} pairs</div>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-150 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400">Inventory Cost Value</span>
            <div className="text-2xl font-extrabold text-slate-900">Rs. {totalStockValue.toLocaleString()}</div>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-150 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400">Low Stock Shoe Models</span>
            <div className="text-2xl font-extrabold text-amber-600">{lowStockCount} models</div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm space-y-4">
        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="w-full sm:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search shoe name, brand, SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="All">All Brands</option>
              <option value="Nike">Nike</option>
              <option value="Adidas">Adidas</option>
              <option value="Jordan">Jordan</option>
              <option value="New Balance">New Balance</option>
              <option value="Puma">Puma</option>
              <option value="Vans">Vans</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 font-semibold">
                <th className="pb-3 pl-1">Shoe Model</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">SKU</th>
                <th className="pb-3">Cost Price</th>
                <th className="pb-3">Retail Price</th>
                <th className="pb-3">Sizes & Stock Breakdown</th>
                <th className="pb-3 text-center">Total Stock</th>
                <th className="pb-3 text-right pr-1">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((shoe) => {
                const isLowStock = shoe.totalStock < 20;

                return (
                  <tr key={shoe.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Shoe Details */}
                    <td className="py-3.5 pl-1">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={shoe.image}
                          alt={shoe.name}
                          className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-200/80"
                        />
                        <div>
                          <p className="font-bold text-slate-800 line-clamp-1">{shoe.name}</p>
                          <span className="text-[10px] text-slate-400 font-semibold">{shoe.brand} • {shoe.color}</span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 text-slate-600 font-medium">
                      {shoe.category}
                    </td>

                    {/* SKU */}
                    <td className="py-3.5 font-mono text-[11px] text-slate-500">
                      {shoe.sku}
                    </td>

                    {/* Cost */}
                    <td className="py-3.5 text-slate-500 font-medium">
                      Rs. {shoe.costPrice.toLocaleString()}
                    </td>

                    {/* Price */}
                    <td className="py-3.5 font-bold text-slate-900">
                      Rs. {shoe.price.toLocaleString()}
                    </td>

                    {/* Sizes Pills with Quick Increment/Decrement */}
                    <td className="py-3.5">
                      <div className="flex items-center gap-1 flex-wrap max-w-xs">
                        {shoe.sizes.map((s) => (
                          <div
                            key={s.size}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 ${
                              s.stock <= 0
                                ? 'bg-rose-50 text-rose-600 border border-rose-200/60'
                                : s.stock < 3
                                ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                                : 'bg-slate-100 text-slate-700 border border-slate-200/60'
                            }`}
                          >
                            <span>EU{s.size}:</span>
                            <span className="text-slate-900 font-black">{s.stock}</span>
                            <button
                              onClick={() => updateShoeStock(shoe.id, s.size, 1)}
                              title="Add 1 pair"
                              className="text-emerald-700 hover:text-emerald-900 font-bold"
                            >
                              +
                            </button>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Total Stock */}
                    <td className="py-3.5 text-center font-extrabold text-slate-800">
                      {shoe.totalStock}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 text-right pr-1">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          shoe.totalStock === 0
                            ? 'bg-rose-50 text-rose-700 border border-rose-100'
                            : isLowStock
                            ? 'bg-amber-50 text-amber-700 border border-amber-100'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        }`}
                      >
                        {shoe.totalStock === 0 ? 'Out of Stock' : isLowStock ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && <AddShoeModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
};
