'use client';

import React, { useState } from 'react';
import { usePos } from '@/context/PosContext';
import {
  Users,
  Plus,
  Search,
  Award,
  Phone,
  Mail,
} from 'lucide-react';

export const CustomersList: React.FC = () => {
  const { customers, addNewCustomer } = usePos();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New customer form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [shoeSize, setShoeSize] = useState(42);
  const [preferredBrand, setPreferredBrand] = useState('Nike');

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNewCustomer({
      name,
      phone,
      email,
      shoeSize: Number(shoeSize),
      preferredBrand,
      memberTier: 'Bronze',
      lastVisit: 'Just now',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    });
    setName('');
    setPhone('');
    setEmail('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Shoe Club & Loyalty Customers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Track customer shoe size preferences, loyalty tiers, and purchase history (PKR).
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold transition-all shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Customer</span>
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="w-full sm:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search customer by name, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div className="text-xs font-bold text-slate-500">
            {filteredCustomers.length} registered VIP shoppers
          </div>
        </div>

        {/* Customer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pt-2">
          {filteredCustomers.map((cust) => (
            <div
              key={cust.id}
              className="p-5 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cust.avatar}
                      alt={cust.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                    />
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
                        {cust.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                            cust.memberTier === 'VIP'
                              ? 'bg-amber-100 text-amber-800'
                              : cust.memberTier === 'Gold'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {cust.memberTier} Member
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">
                      Shoe Size
                    </span>
                    <span className="text-sm font-black text-emerald-700">
                      EU {cust.shoeSize}
                    </span>
                  </div>
                </div>

                {/* Contact info */}
                <div className="space-y-1 text-xs text-slate-600 mb-3 bg-white p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{cust.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{cust.email}</span>
                  </div>
                </div>
              </div>

              {/* Stats & Loyalty */}
              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-medium block">Total Spent</span>
                  <span className="font-extrabold text-slate-900">Rs. {cust.totalSpent.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-medium block">Orders</span>
                  <span className="font-bold text-slate-700">{cust.totalOrders} pairs</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-medium block">Loyalty Pts</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-0.5 justify-end">
                    <Award className="w-3 h-3 text-emerald-600" />
                    {cust.loyaltyPoints}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-150 p-6 animate-in zoom-in-95 duration-200">
            <h2 className="text-base font-bold text-slate-900 mb-1">Add VIP Customer</h2>
            <p className="text-xs text-slate-500 mb-4">Enroll a Pakistani customer in the loyalty rewards club.</p>

            <form onSubmit={handleAddCustomerSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Asad Qureshi"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 300 1234567"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="asad@example.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Shoe Size (EU)</label>
                  <input
                    type="number"
                    value={shoeSize}
                    onChange={(e) => setShoeSize(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Favorite Brand</label>
                  <input
                    type="text"
                    value={preferredBrand}
                    onChange={(e) => setPreferredBrand(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-600/20"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
