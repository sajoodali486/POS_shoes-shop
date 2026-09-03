'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DEMO_USERS } from '@/data/users';
import { ShoppingBag, ArrowRight, ShieldCheck, UserCheck, Lock, Sparkles, Footprints, Store } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<string>('Store Manager');
  const [email, setEmail] = useState<string>('sajood@shoeshop.pos');
  const [password, setPassword] = useState<string>('••••••••');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSelectUser = (userRole: string) => {
    setSelectedRole(userRole);
    const u = DEMO_USERS.find((user) => user.role === userRole);
    if (u) {
      setEmail(u.email);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(selectedRole);
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
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30">
              <Footprints className="w-7 h-7" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                Shoes Shop <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 font-semibold uppercase tracking-wider">Retail POS</span>
              </span>
              <p className="text-xs text-slate-500 font-medium">Footwear Retail & Cashier System</p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/60 border border-slate-100">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">Welcome Back</h2>
            <p className="text-sm text-slate-500 mt-1">
              Select your staff role or sign in to access Terminal #1
            </p>
          </div>

          {/* Quick Role Selectors */}
          <div className="space-y-2 mb-6">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Quick Role Switcher
            </label>
            <div className="grid grid-cols-3 gap-2">
              {DEMO_USERS.map((u) => {
                const isSelected = selectedRole === u.role;
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => handleSelectUser(u.role)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/70 text-emerald-800 font-semibold shadow-sm ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                    }`}
                  >
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      {isSelected && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <span className="text-xs line-clamp-1">{u.role}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Staff Email / Username
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all font-medium"
                />
                <UserCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-600">
                  Password
                </label>
                <span className="text-xs text-emerald-600 hover:underline cursor-pointer">
                  Demo Pass
                </span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                Remember terminal session
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 active:scale-[0.99] cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In as {selectedRole}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick 1-Click Launch Bar */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-emerald-600" /> Terminal: #POS-01
            </span>
            <span className="text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" /> Ready to Sell
            </span>
          </div>
        </div>

        {/* Security badge footer */}
        <div className="text-center mt-6 text-xs text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Encrypted Store Session • Shoes POS v2.6</span>
        </div>
      </div>
    </div>
  );
};
