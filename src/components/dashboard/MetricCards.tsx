'use client';

import React from 'react';
import { usePos } from '@/context/PosContext';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  MoreHorizontal,
  DollarSign,
  PiggyBank,
  ShoppingBag,
} from 'lucide-react';

export const MetricCards: React.FC = () => {
  const { setActiveTab, orders, shoes } = usePos();

  const totalSalesRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const totalExpenses = 485000.00;
  const netProfit = totalSalesRevenue + 2845000.00;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
      {/* Primary Account Balance Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <Wallet className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-slate-700">Account Balance</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-xl text-xs font-semibold text-slate-700">
            <span>🇵🇰</span>
            <span>PKR (Rs.)</span>
            <span className="text-slate-400 text-[10px]">▼</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Rs. {(netProfit + totalExpenses).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
            <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +14.2%
            </span>
            <span className="text-slate-400 font-normal">from last month</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          <button
            onClick={() => setActiveTab('pos')}
            className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-emerald-600/20 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>New POS Sale</span>
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
          >
            <ArrowDownLeft className="w-3.5 h-3.5 text-slate-500" />
            <span>Restock Shoes</span>
          </button>
        </div>
      </div>

      {/* Card 2: Total Expenses */}
      <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <DollarSign className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-slate-700">Total Expenses</span>
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Rs. {totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-rose-500">
            <span className="px-1.5 py-0.5 rounded-md bg-rose-50 text-rose-600 flex items-center gap-0.5">
              <TrendingDown className="w-3 h-3" /> -2.1%
            </span>
            <span className="text-slate-400 font-normal">from last month</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Supplier restock & packaging</span>
          <span className="font-semibold text-slate-700">12 Invoices</span>
        </div>
      </div>

      {/* Card 3: Total Savings / Store Net Profit */}
      <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <PiggyBank className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-slate-700">Total Savings</span>
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Rs. 1,420,000.00
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
            <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +8.5%
            </span>
            <span className="text-slate-400 font-normal">from last month</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Target store reserve</span>
          <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">74% of Target</span>
        </div>
      </div>
    </div>
  );
};
