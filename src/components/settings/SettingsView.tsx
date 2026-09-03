'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Store,
  Receipt,
  Printer,
  CreditCard,
  Shield,
  Database,
  Check,
  Building2,
  Sliders,
  Volume2,
  Wifi,
  Sparkles,
} from 'lucide-react';

type SettingsTab = 'store' | 'printer' | 'payment' | 'security' | 'backup';

export const SettingsView: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>('store');

  // Store profile states
  const [storeName, setStoreName] = useState('Shoes Shop Retail Store');
  const [storeAddress, setStoreAddress] = useState('Shop #14, MM Alam Road, Gulberg III, Lahore, Pakistan');
  const [storePhone, setStorePhone] = useState('+92 42 35789012');
  const [ntnNumber, setNtnNumber] = useState('NTN-7892140-5');
  const [currency, setCurrency] = useState('PKR (Rs.)');
  const [taxRate, setTaxRate] = useState('8.0%');
  const [receiptFooter, setReceiptFooter] = useState('Thank you for shopping at Shoes Shop! 30-Day exchange policy on unworn footwear.');

  // Hardware states
  const [printerWidth, setPrinterWidth] = useState<'80mm' | '58mm'>('80mm');
  const [autoPrintReceipt, setAutoPrintReceipt] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [barcodeScannerMode, setBarcodeScannerMode] = useState('Continuous / Hands-free');

  // Payment states
  const [enableEasyPaisa, setEnableEasyPaisa] = useState(true);
  const [enableJazzCash, setEnableJazzCash] = useState(true);
  const [enableCardPos, setEnableCardPos] = useState(true);

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Store & POS System Settings
            </h1>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Terminal Config
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Manage store address, Pakistani tax rates, thermal printer dimensions, and payment gateways.
          </p>
        </div>

        {isSaved && (
          <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Settings updated successfully!</span>
          </div>
        )}
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'store', label: 'Store & Billing', icon: Store },
          { id: 'printer', label: 'Thermal Printer & POS', icon: Printer },
          { id: 'payment', label: 'Payment Gateways', icon: CreditCard },
          { id: 'security', label: 'Staff & Security', icon: Shield },
          { id: 'backup', label: 'Data & Backup', icon: Database },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/70'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: Store & Billing Profile */}
        {activeTab === 'store' && (
          <div className="space-y-5 animate-in fade-in">
            {/* Store Information */}
            <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <Building2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-800">Store Profile & Pakistani Registration</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Store Outlet Name</label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">FBR / NTN Tax Number</label>
                  <input
                    type="text"
                    value={ntnNumber}
                    onChange={(e) => setNtnNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Store Address (Printed on Receipt)</label>
                  <input
                    type="text"
                    value={storeAddress}
                    onChange={(e) => setStoreAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Store Contact Phone</label>
                  <input
                    type="text"
                    value={storePhone}
                    onChange={(e) => setStorePhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Currency & Tax Setup */}
            <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <Receipt className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-800">Currency & Tax Configuration</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Base Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                  >
                    <option value="PKR (Rs.)">PKR (Rs.) - Pakistani Rupee</option>
                    <option value="USD ($)">USD ($) - US Dollar</option>
                    <option value="AED (AED)">AED (AED) - UAE Dirham</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Standard Sales Tax / VAT (%)</label>
                  <input
                    type="text"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Thermal Receipt Footer Policy Note</label>
                <textarea
                  rows={2}
                  value={receiptFooter}
                  onChange={(e) => setReceiptFooter(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Thermal Printer & POS Hardware */}
        {activeTab === 'printer' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm space-y-5 animate-in fade-in">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <Printer className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-800">POS Hardware & Thermal Printer Settings</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-150">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Thermal Receipt Paper Width</h4>
                  <p className="text-[11px] text-slate-400">Choose standard POS thermal paper roll size</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPrinterWidth('80mm')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      printerWidth === '80mm'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    80mm (Standard POS)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPrinterWidth('58mm')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      printerWidth === '58mm'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    58mm (Compact Mobile)
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-150">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Auto-Print Thermal Receipt on Payment</h4>
                  <p className="text-[11px] text-slate-400">Instantly trigger print dialog when sale is completed</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoPrintReceipt}
                    onChange={(e) => setAutoPrintReceipt(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-150">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Barcode Scanner Beep & Feedback</h4>
                  <p className="text-[11px] text-slate-400">Play audio sound effect when item is added to cart</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={soundEffects}
                    onChange={(e) => setSoundEffects(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Payment Gateways */}
        {activeTab === 'payment' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm space-y-4 animate-in fade-in">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-800">Pakistani Payment Channels & Gateway Options</h3>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-150">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-black text-xs flex items-center justify-center">
                    EP
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">EasyPaisa Merchant QR Payment</h4>
                    <p className="text-[11px] text-slate-400">Enable Telenor EasyPaisa mobile wallet payments</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableEasyPaisa}
                    onChange={(e) => setEnableEasyPaisa(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-150">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 font-black text-xs flex items-center justify-center">
                    JC
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">JazzCash Merchant QR Payment</h4>
                    <p className="text-[11px] text-slate-400">Enable JazzCash direct digital payments</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableJazzCash}
                    onChange={(e) => setEnableJazzCash(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-150">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center">
                    POS
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Bank Debit/Credit Card Machine (1Link)</h4>
                    <p className="text-[11px] text-slate-400">Visa, Mastercard, PayPak EMV card payments</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableCardPos}
                    onChange={(e) => setEnableCardPos(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Staff & Security */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm space-y-4 animate-in fade-in">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <Shield className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-800">Cashier Permissions & Terminal Access</h3>
            </div>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-150">
                <h4 className="text-xs font-bold text-slate-800 mb-1">Cashier Discount Limit</h4>
                <p className="text-[11px] text-slate-400 mb-3">Maximum discount % allowed without manager PIN override</p>
                <div className="flex items-center gap-3 max-w-xs">
                  <input
                    type="number"
                    defaultValue={15}
                    className="w-24 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                  />
                  <span className="text-xs font-bold text-slate-600">% Maximum</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Backup & Data Management */}
        {activeTab === 'backup' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm space-y-4 animate-in fade-in">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <Database className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-800">Database & Cloud Sync Status</h3>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-900 block">Cloud Database Status</span>
                <p className="text-[11px] text-emerald-700">All footwear stock and invoices synced with local SQLite cache.</p>
              </div>
              <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-bold">
                Online & Synced
              </span>
            </div>
          </div>
        )}

        {/* Form Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-2xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
