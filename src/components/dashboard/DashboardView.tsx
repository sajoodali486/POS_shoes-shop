'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { usePos } from '@/context/PosContext';
import { MetricCards } from './MetricCards';
import { SalesChart } from './SalesChart';
import { BrandWallets } from './BrandWallets';
import { RecentSalesTable } from './RecentSalesTable';
import { QuickStockAlerts } from './QuickStockAlerts';
import { ReceiptModal } from '../orders/ReceiptModal';
import { Order } from '@/types/pos';
import { Download, Calendar, Sparkles, ShoppingBag } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { user } = useAuth();
  const { setActiveTab } = usePos();
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<Order | null>(null);

  const currentDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Welcome Banner matching exact reference layout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back {user?.name || 'Sajood Ali'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Monitor and control what happens with your shoe store today for financial health.
          </p>
        </div>

        {/* Date & Export Pill Group */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200/90 rounded-2xl text-xs font-semibold text-slate-700 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sun, 12 June 2026</span>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Top 3 Stat Cards (Account Balance, Total Expenses, Total Savings) */}
      <MetricCards />

      {/* 2-Column Dashboard Grid (matching screenshot layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Wallets & Savings Plan) */}
        <div className="lg:col-span-5 space-y-6">
          <BrandWallets />
          <QuickStockAlerts />
        </div>

        {/* Right Column (Overview Sales Chart & Recent Transactions) */}
        <div className="lg:col-span-7 space-y-6">
          <SalesChart />
          <RecentSalesTable onSelectOrder={(ord) => setSelectedReceiptOrder(ord)} />
        </div>
      </div>

      {/* Receipt Modal if clicked */}
      {selectedReceiptOrder && (
        <ReceiptModal
          order={selectedReceiptOrder}
          onClose={() => setSelectedReceiptOrder(null)}
        />
      )}
    </div>
  );
};
