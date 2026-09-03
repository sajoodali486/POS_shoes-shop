'use client';

import React, { useState } from 'react';
import { usePos } from '@/context/PosContext';
import {
  AlertTriangle,
  Package,
  Plus,
  RefreshCw,
  ShoppingBag,
  CheckCircle,
  Truck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const StockAlertsView: React.FC = () => {
  const { shoes, updateShoeStock, setActiveTab } = usePos();
  const [replenishedId, setReplenishedId] = useState<string | null>(null);

  // Filter low stock shoes (less than 20 total pairs or any size with 0/1 stock)
  const lowStockShoes = shoes.filter(
    (shoe) => shoe.totalStock < 20 || shoe.sizes.some((s) => s.stock <= 1)
  );

  const outOfStockCount = shoes.filter((s) => s.totalStock === 0).length;
  const criticalCount = shoes.filter((s) => s.totalStock > 0 && s.totalStock < 15).length;

  const handleQuickRestock = (shoeId: string, size: number, amount: number) => {
    updateShoeStock(shoeId, size, amount);
    const key = `${shoeId}-${size}`;
    setReplenishedId(key);
    setTimeout(() => {
      setReplenishedId(null);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Warehouse Stock Alerts
            </h1>
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-amber-600" />
              Live Inventory Monitor
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Real-time notifications for depleted sizes, out-of-stock sneakers, and reorder alerts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('inventory')}
            className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-2xl text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            View Full Inventory
          </button>
          <button
            onClick={() => setActiveTab('pos')}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold transition-all shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>POS Register</span>
          </button>
        </div>
      </div>

      {/* KPI Alert Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-rose-50/80 border border-rose-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center border border-rose-200">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">Out of Stock Shoes</span>
            <div className="text-2xl font-black text-rose-700">{outOfStockCount} Models</div>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-amber-50/80 border border-amber-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center border border-amber-200">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Low Stock Threshold</span>
            <div className="text-2xl font-black text-amber-800">{criticalCount} Models</div>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-emerald-50/80 border border-emerald-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center border border-emerald-200">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Supplier Reorder</span>
            <div className="text-2xl font-black text-emerald-800">Lahore Hub Ready</div>
          </div>
        </div>
      </div>

      {/* Low Stock Items List & One-Click Replenishment */}
      <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Urgent Shoe Restock Recommendations</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click &quot;+5 pairs&quot; or &quot;+10 pairs&quot; to restock size batches instantly.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            {lowStockShoes.length} Items Need Attention
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {lowStockShoes.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-150">
              <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <p className="font-bold text-slate-800">All Shoe Stocks Healthy!</p>
              <p className="text-xs text-slate-400 mt-1">Every shoe model and size has sufficient stock level.</p>
            </div>
          ) : (
            lowStockShoes.map((shoe) => {
              const isCriticallyLow = shoe.totalStock < 10;

              return (
                <div
                  key={shoe.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                    isCriticallyLow
                      ? 'bg-rose-50/40 border-rose-200 hover:border-rose-300'
                      : 'bg-amber-50/30 border-amber-200 hover:border-amber-300'
                  }`}
                >
                  {/* Left: Shoe info */}
                  <div className="flex items-center gap-3.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={shoe.image}
                      alt={shoe.name}
                      className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-slate-200 bg-white"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                          {shoe.brand}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{shoe.sku}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            shoe.totalStock === 0
                              ? 'bg-rose-600 text-white'
                              : isCriticallyLow
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {shoe.totalStock === 0 ? 'Out of Stock' : `Only ${shoe.totalStock} left`}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">{shoe.name}</h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Retail Price: <strong className="text-slate-900">Rs. {shoe.price.toLocaleString()}</strong> • Cost: Rs. {shoe.costPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Right: Sizes Breakdown & One-Click Batch Restock */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-500 mr-1">Restock Size:</span>
                    {shoe.sizes.map((s) => {
                      const isReplenished = replenishedId === `${shoe.id}-${s.size}`;
                      const isLow = s.stock <= 2;

                      return (
                        <div
                          key={s.size}
                          className={`p-1.5 rounded-xl border flex items-center gap-1.5 ${
                            isLow ? 'bg-white border-amber-300 shadow-2xs' : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="text-[11px] font-mono leading-none">
                            <span className="text-slate-500 font-medium">EU{s.size}: </span>
                            <strong className={isLow ? 'text-amber-700 font-black' : 'text-slate-800'}>
                              {s.stock}
                            </strong>
                          </div>

                          <button
                            onClick={() => handleQuickRestock(shoe.id, s.size, 5)}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                              isReplenished
                                ? 'bg-emerald-600 text-white'
                                : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            }`}
                            title={`Add +5 pairs to size EU ${s.size}`}
                          >
                            {isReplenished ? '✓ +5' : '+5'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
