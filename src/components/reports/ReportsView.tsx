'use client';

import React, { useState, useMemo } from 'react';
import { usePos } from '@/context/PosContext';
import {
  FileSpreadsheet,
  Download,
  Printer,
  Calendar,
  Filter,
  FileText,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Package,
  Layers,
  Sparkles,
  Check,
  FileCode,
  Table,
} from 'lucide-react';

type ReportType = 'sales' | 'brand' | 'inventory' | 'tax' | 'cashier';
type DateRange = 'today' | 'yesterday' | '7days' | 'month' | 'all';

export const ReportsView: React.FC = () => {
  const { orders, shoes, customers } = usePos();
  const [reportType, setReportType] = useState<ReportType>('sales');
  const [dateRange, setDateRange] = useState<DateRange>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Filtered Orders Calculation
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      // In a live system date filtering would parse timestamps; here we support range selection
      return true;
    });
  }, [orders]);

  // Aggregate Metrics
  const totalRevenue = filteredOrders.reduce((acc, o) => acc + o.total, 0);
  const totalSubtotal = filteredOrders.reduce((acc, o) => acc + o.subtotal, 0);
  const totalTax = filteredOrders.reduce((acc, o) => acc + o.tax, 0);
  const totalDiscount = filteredOrders.reduce((acc, o) => acc + o.discount, 0);
  const totalItemsSold = filteredOrders.reduce(
    (acc, o) => acc + o.items.reduce((sum, i) => sum + i.quantity, 0),
    0
  );

  // Brand sales summary breakdown
  const brandSalesMap: Record<string, { pairs: number; revenue: number }> = {};
  filteredOrders.forEach((o) => {
    o.items.forEach((item) => {
      const b = item.brand || 'Others';
      if (!brandSalesMap[b]) {
        brandSalesMap[b] = { pairs: 0, revenue: 0 };
      }
      brandSalesMap[b].pairs += item.quantity;
      brandSalesMap[b].revenue += item.price * item.quantity;
    });
  });

  // Export handlers for all formats
  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';

    if (reportType === 'sales' || reportType === 'tax') {
      csvContent += 'Invoice No,Date,Time,Customer,Payment Method,Subtotal (PKR),Discount (PKR),Tax (PKR),Total (PKR),Items Count\n';
      filteredOrders.forEach((o) => {
        csvContent += `"${o.invoiceNo}","${o.date}","${o.time}","${o.customerName}","${o.paymentMethod}",${o.subtotal},${o.discount},${o.tax},${o.total},${o.items.length}\n`;
      });
    } else if (reportType === 'brand') {
      csvContent += 'Brand,Pairs Sold,Gross Revenue (PKR),Market Share %\n';
      Object.entries(brandSalesMap).forEach(([brand, data]) => {
        const share = totalRevenue > 0 ? ((data.revenue / totalRevenue) * 100).toFixed(1) : '0';
        csvContent += `"${brand}",${data.pairs},${data.revenue},${share}%\n`;
      });
    } else {
      csvContent += 'Shoe Model,Brand,SKU,Category,Cost Price (PKR),Retail Price (PKR),Total Stock,Stock Value (PKR)\n';
      shoes.forEach((s) => {
        csvContent += `"${s.name}","${s.brand}","${s.sku}","${s.category}",${s.costPrice},${s.price},${s.totalStock},${s.costPrice * s.totalStock}\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ShoesShop_POS_${reportType}_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    triggerSuccess('CSV');
  };

  const handleExportJSON = () => {
    const dataToExport = {
      store: 'Shoes Shop Retail Store Pakistan',
      reportType,
      generatedAt: new Date().toISOString(),
      currency: 'PKR',
      summary: {
        totalRevenue,
        totalTax,
        totalDiscount,
        totalOrders: filteredOrders.length,
        totalItemsSold,
      },
      orders: filteredOrders,
      shoesInventory: shoes,
    };

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(dataToExport, null, 2)
    )}`;
    const link = document.createElement('a');
    link.setAttribute('href', jsonString);
    link.setAttribute('download', `ShoesShop_POS_${reportType}_Report_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    triggerSuccess('JSON');
  };

  const handleExportExcel = () => {
    // Generates a clean tab-delimited Excel format
    let excelContent = 'data:application/vnd.ms-excel;charset=utf-8,';
    excelContent += 'Invoice No\tDate\tTime\tCustomer\tPayment Method\tSubtotal (PKR)\tDiscount (PKR)\tTax 8% (PKR)\tTotal (PKR)\n';
    filteredOrders.forEach((o) => {
      excelContent += `${o.invoiceNo}\t${o.date}\t${o.time}\t${o.customerName}\t${o.paymentMethod}\t${o.subtotal}\t${o.discount}\t${o.tax}\t${o.total}\n`;
    });

    const encodedUri = encodeURI(excelContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ShoesShop_POS_Excel_${reportType}_${Date.now()}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    triggerSuccess('Excel (XLS)');
  };

  const handlePrintReport = () => {
    window.print();
  };

  const triggerSuccess = (format: string) => {
    setDownloadSuccess(format);
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Reports & Audit Engine
            </h1>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Multi-Format Export
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Generate, filter, and export detailed sales ledgers, brand turnovers, and tax audit sheets in PKR.
          </p>
        </div>

        {/* Multi-Format Export Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
            title="Download CSV Spreadsheet"
          >
            <Table className="w-3.5 h-3.5 text-emerald-600" />
            <span>CSV</span>
          </button>

          <button
            onClick={handleExportExcel}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
            title="Download Excel Sheet"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Excel (XLS)</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
            title="Download JSON Payload"
          >
            <FileCode className="w-3.5 h-3.5 text-indigo-600" />
            <span>JSON</span>
          </button>

          <button
            onClick={handlePrintReport}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
            title="Print Thermal Summary or Save PDF"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-400" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Download Alert Notification */}
      {downloadSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{downloadSuccess} Report exported and downloaded successfully!</span>
        </div>
      )}

      {/* Report Configuration & Filters Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-150 shadow-sm space-y-4">
        {/* Report Type Selector Pills */}
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Select Report Module
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { id: 'sales', label: '📊 Sales & Cash Ledger', desc: 'Daily/Monthly Invoices' },
              { id: 'brand', label: '🏷️ Brand Turnover Report', desc: 'Brand-wise sales & pairs' },
              { id: 'inventory', label: '📦 Inventory Valuation', desc: 'Stock Cost & Retail value' },
              { id: 'tax', label: '🧾 Tax & VAT (8%) Audit', desc: 'FBR/Tax filing ledger' },
              { id: 'cashier', label: '👤 Cashier Shift Z-Report', desc: 'Terminal closeout' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setReportType(t.id as ReportType)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                  reportType === t.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/70'
                }`}
              >
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Date Period</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as DateRange)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
            >
              <option value="today">Today (Live Shift)</option>
              <option value="yesterday">Yesterday</option>
              <option value="7days">Last 7 Days</option>
              <option value="month">This Month (Current)</option>
              <option value="all">All Time Records</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Filter by Brand</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
            >
              <option value="All">All Brands</option>
              <option value="Nike">Nike</option>
              <option value="Adidas">Adidas</option>
              <option value="Jordan">Jordan</option>
              <option value="New Balance">New Balance</option>
              <option value="Puma">Puma</option>
              <option value="Vans">Vans</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Cashier / Terminal</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer">
              <option value="all">All Terminals (Sajood Ali)</option>
              <option value="t1">Terminal #1 (Front Counter)</option>
              <option value="t2">Terminal #2 (Express Counter)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards for Active Report */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-150 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Sales Volume</span>
          <div className="text-2xl font-black text-slate-900 mt-1">Rs. {totalRevenue.toLocaleString()}</div>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">From {filteredOrders.length} processed sales</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-150 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Pairs Sold</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{totalItemsSold} Pairs</div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Across all shoe categories</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-150 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Collected Tax (8%)</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">Rs. {totalTax.toLocaleString()}</div>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">FBR compliant collected</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-150 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Discounts Given</span>
          <div className="text-2xl font-black text-rose-600 mt-1">Rs. {totalDiscount.toLocaleString()}</div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Promo codes & VIP loyalty</p>
        </div>
      </div>

      {/* Active Report Table Data */}
      <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              {reportType === 'sales' && 'Sales & Transaction Ledger'}
              {reportType === 'brand' && 'Brand Turnover & Performance Summary'}
              {reportType === 'inventory' && 'Inventory Stock & Valuation Audit'}
              {reportType === 'tax' && 'Tax & VAT (8%) Collection Ledger'}
              {reportType === 'cashier' && 'Cashier Shift Closeout (Z-Report)'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live audit data preview • Currency: PKR (Pakistani Rupee)
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
              {reportType === 'brand' ? Object.keys(brandSalesMap).length : filteredOrders.length} Records
            </span>
          </div>
        </div>

        {/* Dynamic Table Based on Report Type */}
        <div className="overflow-x-auto">
          {reportType === 'brand' ? (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100 font-semibold">
                  <th className="pb-3 pl-1">Brand Name</th>
                  <th className="pb-3">Pairs Sold</th>
                  <th className="pb-3">Gross Revenue</th>
                  <th className="pb-3">Revenue Share %</th>
                  <th className="pb-3 text-right pr-1">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {Object.entries(brandSalesMap).map(([brand, data]) => {
                  const share = totalRevenue > 0 ? ((data.revenue / totalRevenue) * 100).toFixed(1) : '0';
                  return (
                    <tr key={brand} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 pl-1 font-bold text-slate-900">{brand}</td>
                      <td className="py-3.5 text-slate-700 font-medium">{data.pairs} pairs</td>
                      <td className="py-3.5 font-bold text-slate-900">Rs. {data.revenue.toLocaleString()}</td>
                      <td className="py-3.5 text-emerald-700 font-bold">{share}%</td>
                      <td className="py-3.5 text-right pr-1">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                          Active
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100 font-semibold">
                  <th className="pb-3 pl-1">Invoice ID</th>
                  <th className="pb-3">Date & Time</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3">Subtotal</th>
                  <th className="pb-3">Discount</th>
                  <th className="pb-3">Tax (8%)</th>
                  <th className="pb-3 text-right pr-1">Total (PKR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 pl-1 font-mono font-bold text-slate-900">{order.invoiceNo}</td>
                    <td className="py-3.5 text-slate-500">{order.date}, {order.time}</td>
                    <td className="py-3.5 font-semibold text-slate-800">{order.customerName}</td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-600">Rs. {order.subtotal.toLocaleString()}</td>
                    <td className="py-3.5 text-rose-600 font-medium">-Rs. {order.discount.toLocaleString()}</td>
                    <td className="py-3.5 text-slate-600">Rs. {order.tax.toLocaleString()}</td>
                    <td className="py-3.5 text-right pr-1 font-black text-slate-900">
                      Rs. {order.total.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
