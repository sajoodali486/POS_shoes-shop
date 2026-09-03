'use client';

import React, { useState } from 'react';
import { usePos } from '@/context/PosContext';
import { Order } from '@/types/pos';
import {
  ArrowDownLeft,
  Filter,
  CreditCard,
  Banknote,
  QrCode,
  CheckCircle2,
  Receipt,
} from 'lucide-react';

interface RecentSalesTableProps {
  onSelectOrder?: (order: Order) => void;
}

export const RecentSalesTable: React.FC<RecentSalesTableProps> = ({ onSelectOrder }) => {
  const { orders } = usePos();
  const [filterType, setFilterType] = useState<'all' | 'card' | 'cash'>('all');

  const filteredOrders = orders.filter((o) => {
    if (filterType === 'all') return true;
    return o.paymentMethod === filterType;
  });

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'card':
        return <CreditCard className="w-3.5 h-3.5 text-blue-500" />;
      case 'cash':
        return <Banknote className="w-3.5 h-3.5 text-emerald-600" />;
      case 'qr_pay':
        return <QrCode className="w-3.5 h-3.5 text-purple-500" />;
      default:
        return <CreditCard className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <ArrowDownLeft className="w-4 h-4" />
          </div>
          <span className="text-base font-bold text-slate-800">Recent Transaction</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-xl cursor-pointer hover:bg-slate-100">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Filter</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-slate-400 border-b border-slate-100 font-semibold">
              <th className="pb-3 pl-1">Activity</th>
              <th className="pb-3">Date</th>
              <th className="pb-3 text-right">Price (PKR)</th>
              <th className="pb-3 text-center">Status</th>
              <th className="pb-3 text-right pr-1">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredOrders.slice(0, 5).map((order) => {
              const mainItem = order.items[0];
              const extraCount = order.items.length - 1;

              return (
                <tr key={order.id} className="hover:bg-slate-50/70 transition-colors group">
                  {/* Activity / Shoe Name */}
                  <td className="py-3 pl-1">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200/60">
                        {getPaymentIcon(order.paymentMethod)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 line-clamp-1">
                          {mainItem ? mainItem.name : 'Footwear Sale'}
                          {extraCount > 0 && (
                            <span className="text-[10px] ml-1.5 px-1.5 py-0.2 rounded bg-slate-100 text-slate-500 font-normal">
                              +{extraCount} more
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">
                          {order.customerName} • {order.invoiceNo}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-3 text-slate-500 whitespace-nowrap">
                    {order.date}
                  </td>

                  {/* Price */}
                  <td className="py-3 text-right font-bold text-slate-900 whitespace-nowrap">
                    Rs. {order.total.toLocaleString()}
                  </td>

                  {/* Status */}
                  <td className="py-3 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100/60">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Success
                    </span>
                  </td>

                  {/* Action / View receipt */}
                  <td className="py-3 text-right pr-1">
                    <button
                      onClick={() => onSelectOrder && onSelectOrder(order)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                      title="View Receipt"
                    >
                      <Receipt className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
