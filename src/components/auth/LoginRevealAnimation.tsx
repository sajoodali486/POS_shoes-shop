'use client';

import React, { useState, useEffect } from 'react';
import { INITIAL_SHOES } from '@/data/shoes';
import { Sparkles, ArrowRight, ShieldCheck, Footprints } from 'lucide-react';

interface LoginRevealAnimationProps {
  onComplete: () => void;
}

export const LoginRevealAnimation: React.FC<LoginRevealAnimationProps> = ({ onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  // Curated array of top shoes with high quality pictures from catalog
  const shoePicturesArray = [
    INITIAL_SHOES[0], // Air Jordan 1 Retro High OG
    INITIAL_SHOES[4], // Adidas Samba Classic OG (White)
    INITIAL_SHOES[3], // New Balance 9060 Emerald Sea
    INITIAL_SHOES[1], // Nike Air Max 270 React
    INITIAL_SHOES[2], // Adidas Ultraboost Light
  ];

  useEffect(() => {
    // Smoothly cycle through the shoes array
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % shoePicturesArray.length);
    }, 1100);

    // Fade out smoothly at 3.1s
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 3100);

    // Complete transition to dashboard at 3.7s
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3700);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [shoePicturesArray.length, onComplete]);

  const activeShoe = shoePicturesArray[currentIdx] || INITIAL_SHOES[0];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-700 ease-in-out select-none ${
        isFadingOut
          ? 'opacity-0 backdrop-blur-none scale-105 pointer-events-none'
          : 'opacity-100 backdrop-blur-2xl bg-white/90'
      }`}
    >
      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 z-50 px-4 py-2 bg-white/95 hover:bg-white text-slate-700 hover:text-slate-900 rounded-full text-xs font-bold shadow-md shadow-slate-200/60 border border-slate-200 backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 hover:border-emerald-300"
      >
        <span>Skip Intro</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      {/* Atmospheric Soft Light Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-400/20 rounded-full blur-[130px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-teal-200/30 rounded-full blur-[90px]" />
        
        {/* Subtle geometric dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(#059669 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      {/* Center Presentation Stage */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-4xl">
        
        {/* SHOES PICTURES ARRAY SHOWCASE */}
        <div className="relative w-full max-w-lg h-72 sm:h-80 md:h-88 flex items-center justify-center">
          
          {/* Radiant Soft Glow behind the shoe picture */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[260px] bg-gradient-to-r from-emerald-200/70 via-white to-teal-200/70 rounded-full blur-3xl transition-all duration-1000 ${
              isFadingOut ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
            }`}
          />

          {/* Featured Shoe Picture Container */}
          <div
            className={`relative w-full h-full flex flex-col items-center justify-center transition-all duration-700 ease-out ${
              isFadingOut ? 'scale-110 opacity-0 -translate-y-6' : 'scale-100 opacity-100 translate-y-0'
            }`}
          >
            <div
              className="relative flex items-center justify-center"
              style={{
                animation: isFadingOut ? 'none' : 'floatShoe 3s ease-in-out infinite',
              }}
            >
              {/* REAL HIGH-RESOLUTION SHOE PICTURE CARD */}
              <div className="relative flex flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={activeShoe.id}
                  src={activeShoe.image}
                  alt={activeShoe.name}
                  className="w-72 sm:w-96 md:w-[440px] h-48 sm:h-60 md:h-68 object-cover rounded-3xl shadow-2xl shadow-slate-900/20 border-4 border-white transition-all duration-500 animate-in fade-in zoom-in-95"
                />

                {/* Floating Shoe Details Pill */}
                <div className="absolute -bottom-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2.5 transition-all duration-300">
                  <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-lg uppercase tracking-wider">
                    {activeShoe.brand}
                  </span>
                  <span className="text-xs font-black text-slate-800 max-w-[180px] sm:max-w-none truncate">
                    {activeShoe.name}
                  </span>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200/60">
                    Rs. {activeShoe.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Soft Ground Shadow underneath */}
          <div
            className={`absolute -bottom-2 w-2/3 h-6 bg-slate-900/15 rounded-full blur-xl transition-all duration-1000 ${
              isFadingOut ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
            }`}
          />
        </div>

        {/* ARRAY THUMBNAILS ROW */}
        <div className="mt-7 flex items-center justify-center gap-2 sm:gap-3">
          {shoePicturesArray.map((shoe, idx) => (
            <button
              key={shoe.id}
              onClick={() => setCurrentIdx(idx)}
              className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                idx === currentIdx
                  ? 'border-emerald-600 ring-2 ring-emerald-400/50 scale-110 shadow-md'
                  : 'border-white/80 opacity-60 hover:opacity-100 hover:scale-105'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shoe.image}
                alt={shoe.name}
                className="w-10 h-8 sm:w-12 sm:h-10 object-cover"
              />
            </button>
          ))}
        </div>

        {/* STORE BRANDING & ADMIN WELCOME */}
        <div
          className={`mt-4 transition-all duration-700 ease-out ${
            isFadingOut ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* Admin Verified Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-widest mb-2.5 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Authorized Admin Access</span>
          </div>

          {/* Bold Store Brand Name */}
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            SHOES SHOP
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 font-bold mt-1 tracking-wide flex items-center justify-center gap-2">
            <span>Welcome, Sajood Ali</span>
            <span className="text-emerald-500">•</span>
            <span className="text-emerald-700">Opening Dashboard...</span>
          </p>

          {/* Smooth 3.5s Progress Bar */}
          <div className="w-56 sm:w-72 h-1.5 bg-slate-200 rounded-full mx-auto mt-4 overflow-hidden border border-slate-200/80 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 rounded-full transition-all ease-linear"
              style={{
                width: isFadingOut ? '100%' : '90%',
                transitionDuration: '2800ms',
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating Keyframe Animation */}
      <style jsx>{`
        @keyframes floatShoe {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(-0.5deg);
          }
        }
      `}</style>
    </div>
  );
};
