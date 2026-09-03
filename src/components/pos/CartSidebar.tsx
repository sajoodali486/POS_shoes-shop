'use client';

import React, { useState } from 'react';
import { usePos } from '@/context/PosContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  ArrowRight,
  Sparkles,
  X,
} from 'lucide-react';

interface CartSidebarProps {
  onOpenCheckout: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ onOpenCheckout }) => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartDiscountAmount,
    cartTaxAmount,
    cartTotal,
    cartItemCount,
    discountPercent,
    setDiscountPercent,
    customers,
    selectedCustomer,
    setSelectedCustomer,
  } = usePos();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.toUpperCase() === 'VIP10' || couponInput.toUpperCase() === 'SHOES10') {
      setDiscountPercent(10);
    } else if (couponInput.toUpperCase() === 'MINT20' || couponInput.toUpperCase() === 'SOLE20') {
      setDiscountPercent(20);
    } else if (couponInput.trim() !== '') {
      setDiscountPercent(5);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-150 shadow-sm flex flex-col max-h-[calc(100vh-180px)] w-full overflow-hidden">
      {/* 1. TOP SECTION - Completely Fixed (shrink-0) */}
      <div className="shrink-0 space-y-2.5 pb-3 border-b border-slate-150">
        {/* Header Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Current Order</h2>
              <span className="text-[10px] text-slate-400 font-medium">
                {cartItemCount} {cartItemCount === 1 ? 'pair' : 'pairs'} selected
              </span>
            </div>
          </div>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-semibold text-rose-500 hover:text-rose-600 hover:bg-rose-50 px-2 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Customer Selector Dropdown */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Customer Assignment
          </label>
          <select
            value={selectedCustomer?.id || ''}
            onChange={(e) => {
              const found = customers.find((c) => c.id === e.target.value);
              setSelectedCustomer(found || null);
            }}
            className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
          >
            <option value="">Walk-in Customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.memberTier} • Size {c.shoeSize})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. MIDDLE ITEMS LIST - GROWS WITH ITEMS AND SCROLLS SMOOTHLY WITHOUT PUSHING PAYMENT BUTTON */}
      <div className="min-h-0 overflow-y-auto max-h-[220px] xl:max-h-[280px] py-2.5 space-y-2 pr-1">
        {cart.length === 0 ? (
          <div className="py-5 flex flex-col items-center justify-center text-center">
            <div className="w-9 h-9 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-slate-600">Your cart is empty</p>
            <p className="text-[11px] text-slate-400 mt-0.5 max-w-xs">
              Click on shoe sizes from catalog to add pairs to this order.
            </p>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={`${item.shoeId}-${item.size}`}
              className="p-2.5 rounded-2xl bg-slate-50/80 border border-slate-150 hover:border-emerald-200 transition-all flex items-center gap-2.5 group shrink-0"
            >
              {/* Standard Shoe Thumbnail */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-200/80"
              />

              {/* Shoe Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-800 truncate leading-tight" title={item.name}>
                  {item.name}
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                  <span className="font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded">
                    EU {item.size}
                  </span>
                  <span>Rs. {item.price.toLocaleString()}</span>
                </div>
              </div>

              {/* Standard Stepper */}
              <div className="flex items-center gap-1 bg-white rounded-lg border border-slate-200/80 p-0.5 shrink-0">
                <button
                  onClick={() => updateCartQuantity(item.shoeId, item.size, item.quantity - 1)}
                  className="w-5 h-5 flex items-center justify-center rounded text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-bold text-slate-800 w-4 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateCartQuantity(item.shoeId, item.size, item.quantity + 1)}
                  disabled={item.quantity >= item.maxStockForSize}
                  className="w-5 h-5 flex items-center justify-center rounded text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-30"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* Item Price */}
              <div className="text-right shrink-0 min-w-[65px]">
                <span className="text-xs font-extrabold text-slate-900 block">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>

              {/* Remove button */}
              <button
                onClick={() => removeFromCart(item.shoeId, item.size)}
                className="text-slate-300 hover:text-rose-500 p-0.5 rounded transition-colors"
                title="Remove Item"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* 3. BOTTOM SUMMARY & CHECKOUT - Completely Fixed (shrink-0) */}
      <div className="shrink-0 pt-3 border-t border-slate-150 space-y-2.5">
        {/* Coupon Code Input */}
        <form onSubmit={handleApplyCoupon} className="flex gap-1.5">
          <div className="relative flex-1">
            <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            <input
              type="text"
              placeholder="Promo Code (e.g. VIP10)"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              className="w-full pl-8 pr-2 py-1.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 uppercase placeholder:normal-case"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            Apply
          </button>
        </form>

        {/* Calculation Lines */}
        <div className="space-y-1 text-xs">
          <div className="flex justify-between text-slate-500">
            <span>Subtotal</span>
            <span className="font-semibold text-slate-700">Rs. {cartSubtotal.toLocaleString()}</span>
          </div>

          {discountPercent > 0 && (
            <div className="flex justify-between text-emerald-600 font-semibold">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Discount ({discountPercent}%)
              </span>
              <span>-Rs. {cartDiscountAmount.toLocaleString()}</span>
            </div>
          )}

          <div className="flex justify-between text-slate-500">
            <span>Tax (VAT 8%)</span>
            <span className="font-semibold text-slate-700">Rs. {cartTaxAmount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-sm font-black text-slate-900 pt-1.5 border-t border-slate-100">
            <span>Total Payable</span>
            <span className="text-emerald-700 text-base">Rs. {cartTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={onOpenCheckout}
          disabled={cart.length === 0}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-extrabold text-xs rounded-2xl transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
        >
          <span>Pay & Complete Sale</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
