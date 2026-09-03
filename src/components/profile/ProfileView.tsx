'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { usePos } from '@/context/PosContext';
import {
  User,
  Shield,
  Key,
  Store,
  Phone,
  Mail,
  Calendar,
  Clock,
  Check,
  TrendingUp,
  Award,
  ShoppingBag,
  Lock,
  Camera,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user } = useAuth();
  const { orders, setActiveTab } = usePos();

  const [fullName, setFullName] = useState(user?.name || 'Sajood Ali');
  const [email, setEmail] = useState('sajood.ali@shoesshop.pk');
  const [phone, setPhone] = useState('+92 300 8472910');
  const [currentPin, setCurrentPin] = useState('9421');
  const [isSaved, setIsSaved] = useState(false);

  const totalShiftSales = orders.reduce((acc, o) => acc + o.total, 0);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-emerald-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl shadow-emerald-950/15">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          {/* Avatar with badge */}
          <div className="relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80'}
              alt={user?.name || 'User'}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-white/20 shadow-lg"
            />
            <button
              type="button"
              className="absolute bottom-1 right-1 p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-md transition-all cursor-pointer"
              title="Change Profile Picture"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* User Details */}
          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{fullName}</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
                    Active Shift
                  </span>
                </div>
                <p className="text-emerald-200/80 font-medium text-xs sm:text-sm mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                  <Store className="w-4 h-4 text-emerald-400" />
                  <span>{user?.role || 'Store Manager'} • Terminal #1 (Main Outlet, Lahore)</span>
                </p>
              </div>

              <button
                onClick={() => setActiveTab('pos')}
                className="px-4 py-2 bg-white text-slate-900 hover:bg-emerald-50 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
                <span>Open POS Terminal</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-white/10 text-xs">
              <div>
                <span className="text-emerald-300/70 block text-[11px]">Employee ID</span>
                <strong className="text-white font-mono text-xs">EMP-9421-PK</strong>
              </div>
              <div>
                <span className="text-emerald-300/70 block text-[11px]">Shift Started</span>
                <strong className="text-white">09:00 AM (Today)</strong>
              </div>
              <div>
                <span className="text-emerald-300/70 block text-[11px]">Sales Processed</span>
                <strong className="text-emerald-400">Rs. {totalShiftSales.toLocaleString()}</strong>
              </div>
              <div>
                <span className="text-emerald-300/70 block text-[11px]">Security Level</span>
                <strong className="text-white">Tier 1 (Full Access)</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form & Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Personal & Contact Information */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-150 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-extrabold text-slate-900">Personal & Employee Details</h2>
            </div>
            {isSaved && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Saved!
              </span>
            )}
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Assigned Role</label>
                <input
                  type="text"
                  disabled
                  value="Store Manager & Lead Cashier"
                  className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Official Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Phone Number (Pakistan)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer active:scale-95"
              >
                Save Profile Information
              </button>
            </div>
          </form>
        </div>

        {/* Right 1 Col: Security & Quick Cashier Switch PIN */}
        <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Shield className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-extrabold text-slate-900">Security & PIN</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Quick POS Cashier PIN</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  maxLength={4}
                  value={currentPin}
                  onChange={(e) => setCurrentPin(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-black text-slate-800 tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                4-digit PIN for instant terminal unlock.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-150 space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-700 text-xs">
                <span>Shift Summary</span>
                <span className="text-emerald-700 font-extrabold">Active</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Current active terminal is logged under <strong className="text-slate-800">Sajood Ali</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
