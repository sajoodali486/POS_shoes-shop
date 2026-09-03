'use client';

import React, { useState, useMemo } from 'react';
import { usePos } from '@/context/PosContext';
import { CategoryPills } from './CategoryPills';
import { ShoeCard } from './ShoeCard';
import { CartSidebar } from './CartSidebar';
import { PosSearchBar } from './PosSearchBar';
import { CheckoutModal } from './CheckoutModal';
import { ReceiptModal } from '../orders/ReceiptModal';
import { Order } from '@/types/pos';
import { Footprints } from 'lucide-react';

export const PosRegister: React.FC = () => {
  const { shoes } = usePos();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Shoes');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Filter shoes
  const filteredShoes = useMemo(() => {
    return shoes.filter((shoe) => {
      const matchSearch =
        searchQuery === '' ||
        shoe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shoe.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shoe.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shoe.color.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'All Shoes' || shoe.category === selectedCategory;

      const matchBrand =
        selectedBrand === 'All Brands' || shoe.brand === selectedBrand;

      return matchSearch && matchCategory && matchBrand;
    });
  }, [shoes, searchQuery, selectedCategory, selectedBrand]);

  return (
    <div className="flex flex-col h-full min-h-0 space-y-4 animate-in fade-in duration-300">
      {/* POS Top Bar */}
      <div className="shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              POS Cashier Register
            </h1>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Terminal #1
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Search or tap shoe sizes to immediately add pairs to the active cart.
          </p>
        </div>

        {/* Dedicated POS Search Component with Direct Carting */}
        <PosSearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Main Register Grid: Shoes catalogue on the left (8 cols), Cart on the right (4 cols) */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Filter Pills + Shoe Catalog (Scrollable) */}
        <div className="lg:col-span-8 flex flex-col min-h-0 overflow-y-auto pr-1.5 space-y-4 pb-6">
          <CategoryPills
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedBrand={selectedBrand}
            onSelectBrand={setSelectedBrand}
          />

          {/* Shoe Items Grid */}
          {filteredShoes.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-150 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
                <Footprints className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No Shoes Found</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                No footwear matched your search or category filter. Try clearing your filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All Shoes');
                  setSelectedBrand('All Brands');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl hover:bg-emerald-100 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
              {filteredShoes.map((shoe) => (
                <ShoeCard key={shoe.id} shoe={shoe} />
              ))}
            </div>
          )}
        </div>

        {/* Right: Interactive Cart Sidebar (Fixed in place, dynamic height as items grow, items scroll internally) */}
        <div className="lg:col-span-4 flex flex-col self-start sticky top-0 max-h-[calc(100vh-180px)] w-full">
          <CartSidebar onOpenCheckout={() => setShowCheckoutModal(true)} />
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <CheckoutModal
          onClose={() => setShowCheckoutModal(false)}
          onSuccess={(order) => {
            setShowCheckoutModal(false);
            setCompletedOrder(order);
          }}
        />
      )}

      {/* Completed Order Receipt Modal */}
      {completedOrder && (
        <ReceiptModal
          order={completedOrder}
          onClose={() => setCompletedOrder(null)}
        />
      )}
    </div>
  );
};
