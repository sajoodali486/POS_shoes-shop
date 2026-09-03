import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { PosProvider } from "@/context/PosContext";

export const metadata: Metadata = {
  title: "Shoes Shop POS - Retail Footwear Management System",
  description: "Modern Footwear POS & Inventory Management System for Shoes Stores in Pakistan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F4F7F6] text-slate-900 min-h-screen">
        <AuthProvider>
          <PosProvider>
            {children}
          </PosProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
