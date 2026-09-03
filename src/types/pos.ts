export interface ShoeSizeStock {
  size: number; // e.g. 39, 40, 41, 42, 43, 44, 45, 46
  stock: number;
}

export interface ShoeItem {
  id: string;
  name: string;
  brand: 'Nike' | 'Adidas' | 'Jordan' | 'Puma' | 'New Balance' | 'Vans' | 'Converse' | 'Asics';
  category: 'Sneakers' | 'Running' | 'Basketball' | 'Casual' | 'Formal' | 'Slides';
  sku: string;
  barcode: string;
  price: number;
  costPrice: number;
  image: string;
  color: string;
  gender: 'Men' | 'Women' | 'Unisex';
  sizes: ShoeSizeStock[];
  totalStock: number;
  rating: number;
  isFeatured?: boolean;
}

export interface CartItem {
  shoeId: string;
  name: string;
  brand: string;
  image: string;
  size: number;
  color: string;
  price: number;
  quantity: number;
  maxStockForSize: number;
}

export type PaymentMethod = 'cash' | 'card' | 'qr_pay' | 'split';

export interface OrderItem {
  shoeId: string;
  name: string;
  brand: string;
  size: number;
  color: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  invoiceNo: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  cashierName: string;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  shoeSize: number;
  preferredBrand: string;
  totalOrders: number;
  totalSpent: number;
  loyaltyPoints: number;
  memberTier: 'Bronze' | 'Silver' | 'Gold' | 'VIP';
  lastVisit: string;
  avatar: string;
}

export interface User {
  id: string;
  name: string;
  role: 'Store Manager' | 'Cashier' | 'Admin';
  email: string;
  avatar: string;
  terminalId: string;
}

export interface MonthlySalesData {
  month: string;
  sales: number;
  target: number;
  isPeak?: boolean;
}

export interface BrandSalesData {
  brand: string;
  symbol: string;
  currency: string;
  amount: number;
  orders: number;
  growth: string;
  status: 'Active' | 'Inactive';
}
