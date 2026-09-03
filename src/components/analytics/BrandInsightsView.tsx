'use client';

import React, { useState } from 'react';
import { usePos } from '@/context/PosContext';
import {
  TrendingUp,
  Award,
  Package,
  ArrowUpRight,
  Sparkles,
  ShoppingBag,
  Footprints,
  CheckCircle2,
  AlertCircle,
  BarChart2,
} from 'lucide-react';

interface BrandStat {
  name: string;
  category: string;
  tagline: string;
  marketShare: number;
  revenuePkr: number;
  totalSold: number;
  avgMargin: number;
  topModel: string;
  gradient: string;
  accentColor: string;
  textColor: string;
}

const BRAND_DATA: BrandStat[] = [
  {
    name: 'Nike',
    category: 'Performance & Lifestyle',
    tagline: 'Just Do It • Global Leader',
    marketShare: 38,
    revenuePkr: 2450000,
    totalSold: 128,
    avgMargin: 42,
    topModel: 'Air Jordan 1 Retro High',
    gradient: 'from-emerald-600 to-teal-800',
    accentColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    textColor: 'text-emerald-700',
  },
  {
    name: 'Adidas',
    category: 'Classics & Sportswear',
    tagline: 'Impossible is Nothing • Street Icon',
    marketShare: 26,
    revenuePkr: 1680000,
    totalSold: 94,
    avgMargin: 38,
    topModel: 'Samba OG Classic',
    gradient: 'from-slate-800 to-slate-950',
    accentColor: 'bg-slate-100 text-slate-800 border-slate-300',
    textColor: 'text-slate-900',
  },
  {
    name: 'Jordan',
    category: 'Premium Basketball & Culture',
    tagline: 'Flight Heritage • High Demand',
    marketShare: 18,
    revenuePkr: 1220000,
    totalSold: 42,
    avgMargin: 46,
    topModel: 'Air Jordan 4 Retro',
    gradient: 'from-rose-700 to-rose-950',
    accentColor: 'bg-rose-50 text-rose-700 border-rose-200',
    textColor: 'text-rose-700',
  },
  {
    name: 'New Balance',
    category: 'Heritage Running & Dad Shoes',
    tagline: 'Fearlessly Independent • Trendsetter',
    marketShare: 10,
    revenuePkr: 720000,
    totalSold: 36,
    avgMargin: 35,
    topModel: 'New Balance 550 Vintage',
    gradient: 'from-indigo-600 to-indigo-900',
    accentColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    textColor: 'text-indigo-700',
  },
  {
    name: 'Puma',
    category: 'Fast Sportstyle',
    tagline: 'Forever Faster • Motorsport & Retro',
    marketShare: 5,
    revenuePkr: 380000,
    totalSold: 28,
    avgMargin: 32,
    topModel: 'Puma Suede Classic XXI',
    gradient: 'from-amber-600 to-amber-900',
    accentColor: 'bg-amber-50 text-amber-700 border-amber-200',
    textColor: 'text-amber-700',
  },
  {
    name: 'Vans',
    category: 'Skate & Streetwear',
    tagline: 'Off The Wall • Skate Classic',
    marketShare: 3,
    revenuePkr: 250000,
    totalSold: 24,
    avgMargin: 30,
    topModel: 'Old Skool Skate Pro',
    gradient: 'from-cyan-700 to-cyan-950',
    accentColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    textColor: 'text-cyan-700',
  },
];

export const BrandInsightsView: React.FC = () => {
  const { shoes, setActiveTab } = usePos();
  const [selectedBrand, setSelectedBrand] = useState<string>('All');

  const brandShoes = selectedBrand === 'All' 
    ? shoes 
    : shoes.filter((s) => s.brand.toLowerCase() === selectedBrand.toLowerCase());

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Brand Insights & Performance
            </h1>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Official Partners
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Analyze market share, profitability, and stock velocity for each footwear manufacturer in PKR.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('pos')}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold transition-all shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Launch POS for Brands</span>
        </button>
      </div>

      {/* Brand High-Level KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-150 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Brand Revenue</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">Nike & Jordan</div>
          <p className="text-xs text-emerald-600 font-bold mt-1">Rs. 3.67M total revenue</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-150 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Highest Margin</span>
            <TrendingUp className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">Jordan Retro</div>
          <p className="text-xs text-rose-600 font-bold mt-1">46% Avg profit margin</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-150 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fastest Turnover</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">Adidas Samba</div>
          <p className="text-xs text-amber-600 font-bold mt-1">Sold out in 4.2 days</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-150 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Brand Partners</span>
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">6 Major Brands</div>
          <p className="text-xs text-blue-600 font-bold mt-1">{shoes.length} Distinct shoe models</p>
        </div>
      </div>

      {/* Brand Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-extrabold text-slate-900">Brand Market Share & Volume</h2>
          <span className="text-xs text-slate-400 font-medium">Updated live from POS sales</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BRAND_DATA.map((brand) => {
            const modelsInStock = shoes.filter((s) => s.brand.toLowerCase() === brand.name.toLowerCase()).length;
            const isSelected = selectedBrand.toLowerCase() === brand.name.toLowerCase();

            return (
              <div
                key={brand.name}
                onClick={() => setSelectedBrand(isSelected ? 'All' : brand.name)}
                className={`rounded-3xl p-5 border transition-all cursor-pointer bg-white relative overflow-hidden group shadow-sm hover:shadow-md ${
                  isSelected ? 'ring-2 ring-emerald-500 border-emerald-400' : 'border-slate-150 hover:border-slate-300'
                }`}
              >
                {/* Brand Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-lg font-black text-slate-900 block">{brand.name}</span>
                    <span className="text-[11px] text-slate-400 font-medium">{brand.category}</span>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${brand.accentColor}`}>
                    {brand.marketShare}% Share
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${brand.gradient} rounded-full transition-all duration-500`}
                    style={{ width: `${brand.marketShare * 2}%` }}
                  />
                </div>

                {/* Brand Metrics */}
                <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium block text-[11px]">Gross Revenue</span>
                    <span className="font-extrabold text-slate-900">Rs. {brand.revenuePkr.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block text-[11px]">Pairs Sold</span>
                    <span className="font-extrabold text-slate-900">{brand.totalSold} pairs</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block text-[11px]">Profit Margin</span>
                    <span className="font-extrabold text-emerald-600">+{brand.avgMargin}%</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block text-[11px]">Models In Store</span>
                    <span className="font-extrabold text-slate-900">{modelsInStock} models</span>
                  </div>
                </div>

                {/* Top Model Badge */}
                <div className="mt-4 p-2.5 rounded-2xl bg-slate-50 border border-slate-150 flex items-center justify-between text-xs">
                  <div className="min-w-0 pr-2">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Top Seller Model</span>
                    <p className="font-bold text-slate-800 truncate">{brand.topModel}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Brand Specific Shoes Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              {selectedBrand === 'All' ? 'All Brand Shoes in Stock' : `${selectedBrand} Footwear Inventory`}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Showing {brandShoes.length} models for {selectedBrand}
            </p>
          </div>

          {/* Quick Brand Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {['All', 'Nike', 'Adidas', 'Jordan', 'New Balance', 'Puma', 'Vans'].map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedBrand.toLowerCase() === b.toLowerCase()
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Shoes Grid Preview for Brand */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-2">
          {brandShoes.map((shoe) => (
            <div
              key={shoe.id}
              className="p-4 rounded-2xl bg-slate-50/70 border border-slate-150 hover:border-emerald-200 transition-all flex flex-col justify-between"
            >
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shoe.image}
                  alt={shoe.name}
                  className="w-full h-32 object-cover rounded-xl border border-slate-200 bg-white mb-3"
                />
                <div className="flex items-center justify-between text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md mb-1.5 w-max">
                  {shoe.brand}
                </div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{shoe.name}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">{shoe.color} • SKU: {shoe.sku}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <span className="font-extrabold text-slate-900">Rs. {shoe.price.toLocaleString()}</span>
                <span className="text-[11px] font-bold text-slate-500">{shoe.totalStock} in stock</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
