'use client';

import React, { createContext, useContext, useState } from 'react';
import { ShoeItem, CartItem, Order, Customer, PaymentMethod } from '@/types/pos';
import { INITIAL_SHOES } from '@/data/shoes';
import { INITIAL_ORDERS } from '@/data/transactions';
import { INITIAL_CUSTOMERS } from '@/data/customers';

interface PosContextType {
  // Shoes / Inventory
  shoes: ShoeItem[];
  addNewShoe: (newShoe: Omit<ShoeItem, 'id'>) => void;
  updateShoeStock: (shoeId: string, size: number, delta: number) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (shoe: ShoeItem, size: number, quantity?: number) => void;
  updateCartQuantity: (shoeId: string, size: number, quantity: number) => void;
  removeFromCart: (shoeId: string, size: number) => void;
  clearCart: () => void;
  discountPercent: number;
  setDiscountPercent: (discount: number) => void;
  selectedCustomer: Customer | null;
  setSelectedCustomer: (customer: Customer | null) => void;
  
  // Totals
  cartSubtotal: number;
  cartDiscountAmount: number;
  cartTaxAmount: number;
  cartTotal: number;
  cartItemCount: number;
  
  // Orders / Invoices
  orders: Order[];
  processCheckout: (
    paymentMethod: PaymentMethod,
    customerName: string,
    customerPhone?: string,
    cashierName?: string,
    notes?: string
  ) => Order;
  
  // Customers
  customers: Customer[];
  addNewCustomer: (customer: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'loyaltyPoints'>) => void;
  
  // Active Navigation & Modals
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lastCompletedOrder: Order | null;
  setLastCompletedOrder: (order: Order | null) => void;
}

const PosContext = createContext<PosContextType | undefined>(undefined);

export const PosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shoes, setShoes] = useState<ShoeItem[]>(INITIAL_SHOES);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(null);

  // Cart operations
  const addToCart = (shoe: ShoeItem, size: number, quantity: number = 1) => {
    const sizeStock = shoe.sizes.find((s) => s.size === size)?.stock || 0;
    if (sizeStock <= 0) return;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.shoeId === shoe.id && item.size === size);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = Math.min(updated[existingIndex].quantity + quantity, sizeStock);
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            shoeId: shoe.id,
            name: shoe.name,
            brand: shoe.brand,
            image: shoe.image,
            size: size,
            color: shoe.color,
            price: shoe.price,
            quantity: Math.min(quantity, sizeStock),
            maxStockForSize: sizeStock,
          },
        ];
      }
    });
  };

  const updateCartQuantity = (shoeId: string, size: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(shoeId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.shoeId === shoeId && item.size === size) {
          const clampedQty = Math.min(quantity, item.maxStockForSize);
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (shoeId: string, size: number) => {
    setCart((prev) => prev.filter((item) => !(item.shoeId === shoeId && item.size === size)));
  };

  const clearCart = () => {
    setCart([]);
    setDiscountPercent(0);
    setSelectedCustomer(null);
  };

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartDiscountAmount = (cartSubtotal * discountPercent) / 100;
  const taxableAmount = Math.max(0, cartSubtotal - cartDiscountAmount);
  const cartTaxAmount = taxableAmount * 0.08; // 8% sales tax
  const cartTotal = taxableAmount + cartTaxAmount;
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Inventory modifications
  const updateShoeStock = (shoeId: string, size: number, delta: number) => {
    setShoes((prev) =>
      prev.map((shoe) => {
        if (shoe.id !== shoeId) return shoe;
        const updatedSizes = shoe.sizes.map((s) => {
          if (s.size === size) {
            return { ...s, stock: Math.max(0, s.stock + delta) };
          }
          return s;
        });
        const total = updatedSizes.reduce((sum, s) => sum + s.stock, 0);
        return { ...shoe, sizes: updatedSizes, totalStock: total };
      })
    );
  };

  const addNewShoe = (newShoeData: Omit<ShoeItem, 'id'>) => {
    const newId = `shoe-${Date.now()}`;
    const newShoe: ShoeItem = {
      ...newShoeData,
      id: newId,
    };
    setShoes((prev) => [newShoe, ...prev]);
  };

  // Customers
  const addNewCustomer = (custData: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'loyaltyPoints'>) => {
    const newCustomer: Customer = {
      ...custData,
      id: `cust-${Date.now()}`,
      totalOrders: 0,
      totalSpent: 0,
      loyaltyPoints: 50, // Welcome bonus
    };
    setCustomers((prev) => [newCustomer, ...prev]);
  };

  // Checkout process
  const processCheckout = (
    paymentMethod: PaymentMethod,
    customerName: string,
    customerPhone: string = '',
    cashierName: string = 'Sajood Ali',
    notes: string = ''
  ): Order => {
    const now = new Date();
    const invoiceNo = `INV-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const dateStr = now.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      invoiceNo,
      date: dateStr,
      time: timeStr,
      customerName: customerName || 'Walk-in Customer',
      customerPhone,
      cashierName,
      paymentMethod,
      paymentStatus: 'Paid',
      subtotal: Number(cartSubtotal.toFixed(2)),
      discount: Number(cartDiscountAmount.toFixed(2)),
      tax: Number(cartTaxAmount.toFixed(2)),
      total: Number(cartTotal.toFixed(2)),
      items: cart.map((c) => ({
        shoeId: c.shoeId,
        name: c.name,
        brand: c.brand,
        size: c.size,
        color: c.color,
        price: c.price,
        quantity: c.quantity,
      })),
      notes,
    };

    // Deduct stock for all items
    cart.forEach((item) => {
      updateShoeStock(item.shoeId, item.size, -item.quantity);
    });

    // Update orders list
    setOrders((prev) => [newOrder, ...prev]);

    // Update customer stats if matched
    if (customerName && customerName !== 'Walk-in Customer') {
      setCustomers((prev) =>
        prev.map((cust) => {
          if (cust.name.toLowerCase() === customerName.toLowerCase() || cust.phone === customerPhone) {
            const addedPoints = Math.floor(newOrder.total * 0.1);
            return {
              ...cust,
              totalOrders: cust.totalOrders + 1,
              totalSpent: Number((cust.totalSpent + newOrder.total).toFixed(2)),
              loyaltyPoints: cust.loyaltyPoints + addedPoints,
              lastVisit: `Today, ${timeStr}`,
            };
          }
          return cust;
        })
      );
    }

    setLastCompletedOrder(newOrder);
    clearCart();
    return newOrder;
  };

  return (
    <PosContext.Provider
      value={{
        shoes,
        addNewShoe,
        updateShoeStock,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        discountPercent,
        setDiscountPercent,
        selectedCustomer,
        setSelectedCustomer,
        cartSubtotal,
        cartDiscountAmount,
        cartTaxAmount,
        cartTotal,
        cartItemCount,
        orders,
        processCheckout,
        customers,
        addNewCustomer,
        activeTab,
        setActiveTab,
        lastCompletedOrder,
        setLastCompletedOrder,
      }}
    >
      {children}
    </PosContext.Provider>
  );
};

export const usePos = () => {
  const context = useContext(PosContext);
  if (!context) {
    throw new Error('usePos must be used within a PosProvider');
  }
  return context;
};
