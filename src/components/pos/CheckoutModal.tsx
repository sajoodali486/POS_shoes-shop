'use client';

import React, { useState } from 'react';
import { usePos } from '@/context/PosContext';
import { useAuth } from '@/context/AuthContext';
import { PaymentMethod, Order } from '@/types/pos';
import {
  X,
  CreditCard,
  Banknote,
  QrCode,
  CheckCircle2,
  DollarSign,
  Printer,
  Receipt,
  Sparkles,
} from 'lucide-react';

interface CheckoutModalProps {
  onClose: () => void;
  onSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose, onSuccess }) => {
  const { cartTotal, processCheckout, selectedCustomer } = usePos();
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [cashTendered, setCashTendered] = useState<number>(Math.ceil(cartTotal));
  const [customerName, setCustomerName] = useState<string>(selectedCustomer?.name || 'Walk-in Customer');
  const [customerPhone, setCustomerPhone] = useState<string>(selectedCustomer?.phone || '');
  const [notes, setNotes] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const changeDue = Math.max(0, cashTendered - cartTotal);

  const handleQuickCash = (amount: number) => {
    setCashTendered(amount);
  };

  const handleCompleteSale = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const order = processCheckout(
        paymentMethod,
        customerName,
        customerPhone,
        user?.name || 'Sajood Ali',
        notes
      );
      setIsProcessing(false);
      onSuccess(order);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-150 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Checkout & Payment</h2>
              <p className="text-xs text-slate-400">Total Due: <strong className="text-emerald-700 text-sm font-extrabold">Rs. {cartTotal.toLocaleString()}</strong></p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Select Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-3.5 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'cash'
                    ? 'border-emerald-500 bg-emerald-50/70 text-emerald-800 font-bold shadow-xs ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <Banknote className="w-5 h-5 text-emerald-600" />
                <span className="text-xs">Cash Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3.5 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-emerald-500 bg-emerald-50/70 text-emerald-800 font-bold shadow-xs ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span className="text-xs">Debit / Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('qr_pay')}
                className={`p-3.5 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'qr_pay'
                    ? 'border-emerald-500 bg-emerald-50/70 text-emerald-800 font-bold shadow-xs ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <QrCode className="w-5 h-5 text-purple-600" />
                <span className="text-xs">EasyPaisa / JazzCash</span>
              </button>
            </div>
          </div>

          {/* Cash Amount Tendered (if Cash selected) */}
          {paymentMethod === 'cash' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Cash Received (Rs.)</label>
                <span className="text-xs font-bold text-emerald-700">
                  Change Due: Rs. {changeDue.toLocaleString()}
                </span>
              </div>
              <input
                type="number"
                value={cashTendered}
                onChange={(e) => setCashTendered(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-lg font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />

              {/* Quick Cash Pakistani Currency Notes */}
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {[Math.ceil(cartTotal), 5000, 10000, 50000].map((amt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickCash(amt)}
                    className="py-1.5 bg-white hover:bg-emerald-50 border border-slate-200 text-xs font-bold text-slate-700 rounded-lg transition-colors cursor-pointer"
                  >
                    {idx === 0 ? 'Exact' : `Rs. ${amt.toLocaleString()}`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Customer Info */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Customer Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Walk-in Customer"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Phone Number (e.g. 0300-1234567)
              </label>
              <input
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+92 300 0000000"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* Sale Summary Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-emerald-900 block">Total Amount to Charge</span>
              <span className="text-emerald-700">Tax (8%) & discounts included</span>
            </div>
            <span className="text-2xl font-black text-emerald-900">
              Rs. {cartTotal.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleCompleteSale}
            disabled={isProcessing || (paymentMethod === 'cash' && cashTendered < cartTotal)}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white text-xs font-extrabold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            {isProcessing ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete Sale & Print Receipt</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
