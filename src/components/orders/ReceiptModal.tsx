'use client';

import React from 'react';
import { Order } from '@/types/pos';
import { X, Printer, CheckCircle, Footprints } from 'lucide-react';

interface ReceiptModalProps {
  order: Order;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-150 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> Payment Successful
          </span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Thermal Receipt Body */}
        <div className="p-6 overflow-y-auto font-mono text-xs text-slate-800 space-y-4" id="printable-receipt">
          {/* Store Logo & Info */}
          <div className="text-center space-y-1 pb-3 border-b border-dashed border-slate-300">
            <div className="flex items-center justify-center gap-1 text-base font-extrabold text-slate-900 font-sans tracking-tight">
              <Footprints className="w-5 h-5 text-emerald-600" />
              <span>SHOES SHOP PAKISTAN</span>
            </div>
            <p className="text-[11px] text-slate-500 font-semibold mt-1">
              Premium Footwear & Sneakers Retail Outlet
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Shop #14, MM Alam Road, Gulberg III, Lahore • NTN: 7892140-5
            </p>
            <p className="text-[10px] text-slate-400">
              Tel: +92 42 35789012 • UAN: 0300-8472910
            </p>
          </div>

          <div className="border-t border-b border-dashed border-slate-300 py-2.5 my-3 text-xs space-y-1 text-slate-600">
            <div className="flex justify-between font-mono text-[11px]">
              <span>INV #: {order.invoiceNo}</span>
              <span>{order.date}</span>
            </div>
            <div className="flex justify-between font-mono text-[11px]">
              <span>Cashier: {order.cashierName || 'Sajood Ali'}</span>
              <span>{order.time}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span>Customer: <strong>{order.customerName}</strong></span>
              <span>Pay: <strong className="text-emerald-700">{order.paymentMethod}</strong></span>
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase border-b border-slate-200 pb-1">
              <span>Item & Size</span>
              <span>Qty x Price</span>
              <span>Total (PKR)</span>
            </div>

            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-slate-800 text-xs py-1">
                <div className="flex-1 pr-2">
                  <p className="font-bold line-clamp-1">{item.name}</p>
                  <span className="text-[10px] text-slate-500">EU {item.size} • {item.brand}</span>
                </div>
                <div className="text-slate-500 text-[11px] min-w-[70px] text-center">
                  {item.quantity} x Rs. {item.price.toLocaleString()}
                </div>
                <div className="font-bold text-slate-900 text-right min-w-[70px]">
                  Rs. {(item.quantity * item.price).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Totals Breakdown */}
          <div className="border-t border-dashed border-slate-300 pt-2.5 mt-3 space-y-1 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span>Rs. {order.subtotal.toLocaleString()}</span>
            </div>

            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount</span>
                <span>-Rs. {order.discount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-500">
              <span>Sales Tax (8% VAT)</span>
              <span>Rs. {order.tax.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
              <span>NET TOTAL</span>
              <span className="text-emerald-700">Rs. {order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Pakistani Thermal Receipt Footer */}
          <div className="text-center pt-5 pb-2 text-[10px] text-slate-400 space-y-1">
            <p className="font-bold text-slate-700 text-xs">
              Shukriya for shopping at Shoes Shop Pakistan!
            </p>
            <div className="inline-block px-4 py-1 bg-slate-100 rounded text-center tracking-widest font-mono text-xs font-bold mt-2">
              *{order.invoiceNo}*
            </div>
            <p className="text-[10px] text-slate-400 mt-2">
              Exchanges valid within 14 days with original box & receipt.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/60">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Done
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/20 transition-all cursor-pointer active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
