'use client';

import React, { useState } from 'react';
import { usePos } from '@/context/PosContext';
import { Order } from '@/types/pos';
import { ReceiptModal } from './ReceiptModal';
import {
  ReceiptText,
  Search,
  Filter,
  Printer,
  CreditCard,
  Banknote,
  QrCode,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

export const OrdersList: React.FC = () => {
  const { orders } = usePos();
  const [searchQuery, setSearchQuery] = useState('');
  const [methodFilter, setMethodFilter] = useState('all');
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchSearch =
      searchQuery === '' ||
      order.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.cashierName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchMethod = methodFilter === 'all' || order.paymentMethod === methodFilter;

    return matchSearch && matchMethod;
  });

  const totalInvoiced = orders.reduce((acc, o) => acc + o.total, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Sales Invoices & Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Complete transaction ledger, receipts, and order audit trail in PKR.
          </p>
        </div>

        <div className="px-4 py-2 bg-emerald-50 border border-emerald-200/80 rounded-2xl text-xs font-bold text-emerald-800">
          Total Invoiced: <span className="text-sm font-black">Rs. {totalInvoiced.toLocaleString()}</span>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm space-y-4">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="w-full sm:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search invoice #, customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="all">All Payment Methods</option>
              <option value="cash">Cash Pay</option>
              <option value="card">Debit / Credit Card</option>
              <option value="qr_pay">EasyPaisa / JazzCash</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 font-semibold">
                <th className="pb-3 pl-1">Invoice #</th>
                <th className="pb-3">Date & Time</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Items Sold</th>
                <th className="pb-3">Cashier</th>
                <th className="pb-3">Payment</th>
                <th className="pb-3 text-right">Total Amount</th>
                <th className="pb-3 text-center">Status</th>
                <th className="pb-3 text-right pr-1">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOrders.map((order) => {
                const totalPairs = order.items.reduce((acc, i) => acc + i.quantity, 0);

                return (
                  <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Invoice */}
                    <td className="py-3.5 pl-1 font-mono font-bold text-slate-900">
                      {order.invoiceNo}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 text-slate-500 whitespace-nowrap">
                      {order.date} <span className="text-slate-400 text-[10px]">{order.time}</span>
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 font-bold text-slate-800">
                      {order.customerName}
                    </td>

                    {/* Items Sold */}
                    <td className="py-3.5 text-slate-600">
                      <span className="font-semibold">{totalPairs} pairs</span>
                      <p className="text-[10px] text-slate-400 truncate max-w-xs">
                        {order.items.map((i) => `${i.name} (EU ${i.size})`).join(', ')}
                      </p>
                    </td>

                    {/* Cashier */}
                    <td className="py-3.5 text-slate-600 font-medium">
                      {order.cashierName}
                    </td>

                    {/* Payment Method */}
                    <td className="py-3.5">
                      <span className="capitalize font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                        {order.paymentMethod}
                      </span>
                    </td>

                    {/* Total Amount */}
                    <td className="py-3.5 text-right font-black text-slate-900 text-sm">
                      Rs. {order.total.toLocaleString()}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 text-center">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {order.paymentStatus}
                      </span>
                    </td>

                    {/* Action Print */}
                    <td className="py-3.5 text-right pr-1">
                      <button
                        onClick={() => setSelectedReceiptOrder(order)}
                        className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-bold transition-all flex items-center gap-1 ml-auto cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Receipt</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedReceiptOrder && (
        <ReceiptModal
          order={selectedReceiptOrder}
          onClose={() => setSelectedReceiptOrder(null)}
        />
      )}
    </div>
  );
};
