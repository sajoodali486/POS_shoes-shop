import { MonthlySalesData, BrandSalesData } from '@/types/pos';

export const MONTHLY_SALES_DATA: MonthlySalesData[] = [
  { month: 'Jan', sales: 480000, target: 500000 },
  { month: 'Feb', sales: 620000, target: 550000 },
  { month: 'Mar', sales: 740000, target: 600000 },
  { month: 'Apr', sales: 680000, target: 650000 },
  { month: 'May', sales: 890000, target: 700000 },
  { month: 'Jun', sales: 1120000, target: 800000 },
  { month: 'Jul', sales: 980000, target: 850000 },
  { month: 'Aug', sales: 1484900, target: 900000, isPeak: true },
  { month: 'Sep', sales: 1050000, target: 950000 },
  { month: 'Oct', sales: 1220000, target: 1000000 },
  { month: 'Nov', sales: 1340000, target: 1100000 },
  { month: 'Dec', sales: 1460000, target: 1200000 },
];

export const BRAND_WALLETS: BrandSalesData[] = [
  {
    brand: 'Nike & Jordan',
    symbol: '🇵🇰',
    currency: 'PKR',
    amount: 1850000.00,
    orders: 248,
    growth: '+14.2%',
    status: 'Active',
  },
  {
    brand: 'Adidas Originals',
    symbol: '🇵🇰',
    currency: 'PKR',
    amount: 1240000.00,
    orders: 162,
    growth: '+9.4%',
    status: 'Active',
  },
  {
    brand: 'New Balance',
    symbol: '🇵🇰',
    currency: 'PKR',
    amount: 980000.00,
    orders: 98,
    growth: '+18.1%',
    status: 'Active',
  },
  {
    brand: 'Puma & Vans',
    symbol: '🇵🇰',
    currency: 'PKR',
    amount: 650000.00,
    orders: 86,
    growth: '+5.7%',
    status: 'Active',
  },
];

export const FOOTWEAR_SAVINGS_PLAN = [
  {
    title: 'Autumn Inventory Restock Goal',
    target: 2500000,
    current: 1750000,
    percentage: 70,
    color: 'emerald',
  },
  {
    title: 'Store Expansion & Shelving Fund',
    target: 1000000,
    current: 740000,
    percentage: 74,
    color: 'indigo',
  },
];
