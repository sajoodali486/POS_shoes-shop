'use client';

import React from 'react';
import { usePos } from '@/context/PosContext';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  ReceiptText,
  Users,
  BarChart3,
  Bell,
  FileSpreadsheet,
  User,
  Settings,
  LogOut,
  Footprints,
  TrendingUp,
  Store,
  ShieldCheck,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
  section: 'operations' | 'analytics' | 'system';
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, cartItemCount, shoes } = usePos();
  const { logout, user } = useAuth();

  const lowStockCount = shoes.filter((s) => s.totalStock < 20).length;

  const navItems: NavItem[] = [
    // 1. Operations (Core Daily POS Flow)
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, section: 'operations' },
    {
      id: 'pos',
      label: 'POS Register',
      icon: ShoppingBag,
      badge: cartItemCount > 0 ? `${cartItemCount} pairs` : 'Live',
      badgeColor: cartItemCount > 0 ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-800',
      section: 'operations',
    },
    { id: 'inventory', label: 'Inventory & Stock', icon: Package, badge: shoes.length, section: 'operations' },
    { id: 'orders', label: 'Invoices & Sales', icon: ReceiptText, section: 'operations' },
    { id: 'customers', label: 'Customers', icon: Users, section: 'operations' },

    // 2. Analytics & Audits
    { id: 'reports', label: 'Reports & Audits', icon: FileSpreadsheet, section: 'analytics' },
    { id: 'analytics', label: 'Sales Analytics', icon: BarChart3, section: 'analytics' },
    { id: 'brands', label: 'Brand Insights', icon: TrendingUp, section: 'analytics' },
    {
      id: 'stock-alerts',
      label: 'Stock Alerts',
      icon: Bell,
      badge: lowStockCount > 0 ? `${lowStockCount} Low` : undefined,
      badgeColor: 'bg-amber-100 text-amber-800',
      section: 'analytics',
    },

    // 3. System & Account
    { id: 'profile', label: 'My Profile', icon: User, section: 'system' },
    { id: 'settings', label: 'Store Settings', icon: Settings, section: 'system' },
  ];

  const renderNavSection = (section: 'operations' | 'analytics' | 'system', title: string) => {
    const items = navItems.filter((item) => item.section === section);
    return (
      <div className="mb-5">
        <p className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
          {title}
        </p>
        <div className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all group cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-950'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badgeColor || 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-150 flex flex-col justify-between p-4 select-none shrink-0 h-screen sticky top-0 overflow-y-auto">
      <div>
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2 py-2 mb-5 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/25">
              <Footprints className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-black text-slate-900 tracking-tight flex items-center gap-1 leading-none">
                Shoes Shop
              </span>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wide uppercase mt-1">
                Retail Footwear POS
              </p>
            </div>
          </div>

          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System Online" />
        </div>

        {/* 1. Operations Menu */}
        {renderNavSection('operations', 'STORE OPERATIONS')}

        {/* 2. Analytics & Audit */}
        {renderNavSection('analytics', 'INSIGHTS & REPORTS')}

        {/* 3. System & Account */}
        {renderNavSection('system', 'ACCOUNT & CONFIG')}
      </div>

      {/* Bottom User Profile & Terminal Card */}
      <div className="mt-4 pt-3 border-t border-slate-150 space-y-2.5">
        <div
          onClick={() => setActiveTab('profile')}
          className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-all flex items-center justify-between cursor-pointer group"
          title="Click to view My Profile"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
              alt={user?.name || 'User'}
              className="w-8 h-8 rounded-full object-cover border border-slate-200 group-hover:ring-2 group-hover:ring-emerald-500 transition-all"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate leading-tight group-hover:text-emerald-700 transition-colors">
                {user?.name || 'Sajood Ali'}
              </p>
              <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                Terminal #1 • Active
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              logout();
            }}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

