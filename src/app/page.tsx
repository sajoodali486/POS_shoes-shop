'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { usePos } from '@/context/PosContext';
import { LoginPage } from '@/components/auth/LoginPage';
import { LoginRevealAnimation } from '@/components/auth/LoginRevealAnimation';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopHeader } from '@/components/layout/TopHeader';
import { DashboardView } from '@/components/dashboard/DashboardView';
import { PosRegister } from '@/components/pos/PosRegister';
import { InventoryTable } from '@/components/inventory/InventoryTable';
import { OrdersList } from '@/components/orders/OrdersList';
import { CustomersList } from '@/components/customers/CustomersList';
import { AnalyticsView } from '@/components/analytics/AnalyticsView';
import { BrandInsightsView } from '@/components/analytics/BrandInsightsView';
import { StockAlertsView } from '@/components/inventory/StockAlertsView';
import { ReportsView } from '@/components/reports/ReportsView';
import { ProfileView } from '@/components/profile/ProfileView';
import { SettingsView } from '@/components/settings/SettingsView';

export default function Home() {
  const { isAuthenticated, showRevealSplash, setShowRevealSplash } = useAuth();
  const { activeTab } = usePos();

  // If user is not logged in, render the Landing & Login Page
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Active View Switcher
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'pos':
        return <PosRegister />;
      case 'inventory':
        return <InventoryTable />;
      case 'stock-alerts':
        return <StockAlertsView />;
      case 'orders':
        return <OrdersList />;
      case 'customers':
        return <CustomersList />;
      case 'reports':
        return <ReportsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'brands':
        return <BrandInsightsView />;
      case 'profile':
        return <ProfileView />;
      case 'settings':
      case 'help':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F4F7F6] text-slate-900 font-sans relative">
      {/* 3D Shoe Break Reveal Animation Overlay */}
      {showRevealSplash && (
        <LoginRevealAnimation onComplete={() => setShowRevealSplash(false)} />
      )}

      {/* Left Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 ${activeTab === 'pos' ? 'h-screen overflow-hidden' : 'overflow-y-auto'}`}>
        {/* Top Header */}
        <TopHeader />

        {/* View Container */}
        <main className={`flex-1 w-full mx-auto ${activeTab === 'pos' ? 'p-6 max-w-7xl overflow-hidden flex flex-col min-h-0' : 'p-6 max-w-7xl pb-16'}`}>
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}
