'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DEMO_USERS } from '@/data/users';
import { ArrowRight, ShieldCheck, Lock, Footprints, Store, Mail, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>('admin@shoeshop.pk');
  const [password, setPassword] = useState<string>('••••••••');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login('Admin');
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6] flex flex-col justify-center items-center p-4 sm:p-6 text-slate-800">
      {/* Background soft blur accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30">
              <Footprints className="w-7 h-7" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                Shoes Shop <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 font-bold uppercase tracking-wider">Admin</span>
              </span>
              <p className="text-xs text-slate-500 font-medium">Retail Footwear POS & Management Portal</p>
            </div>
          </div>
        </div>

        {/* Admin Login Card */}
        <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-100">
          {/* Admin Identity Badge */}
          <div className="flex items-center gap-3 p-3 mb-6 rounded-2xl bg-slate-50 border border-slate-200/80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={DEMO_USERS[0]?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
              alt="Admin"
              className="w-11 h-11 rounded-xl object-cover ring-2 ring-emerald-500/30"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold text-slate-900 truncate">Sajood Ali</h3>
                <span className="px-2 py-0.5 bg-emerald-600 text-white rounded-md text-[10px] font-black uppercase">
                  Super Admin
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                Full POS & Store Control Access
              </p>
            </div>
          </div>

          <div className="mb-5">
            <h2 className="text-lg font-extrabold text-slate-900">Admin Sign In</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter your admin credentials to access the store system.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@shoeshop.pk"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-600">
                  Password
                </label>
                <span className="text-[11px] font-bold text-emerald-600">
                  Demo Pass
                </span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all tracking-wider"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                />
                Remember admin session
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 active:scale-[0.99] cursor-pointer"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In as Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Info Bar */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5 text-[11px] font-medium">
              <Store className="w-3.5 h-3.5 text-emerald-600" /> Terminal #1 (Lahore)
            </span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3 h-3 text-emerald-600" /> Authorized POS
            </span>
          </div>
        </div>

        {/* Security footer */}
        <div className="text-center mt-5 text-xs text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Encrypted Admin Session • Shoes Shop POS v2.6</span>
        </div>
      </div>
    </div>
  );
};
