"use client";

import Link from "next/link";
import { Home, Grid, ShoppingCart, User } from "lucide-react";

export default function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-t border-gray-700 md:hidden">
      <div className="flex justify-between items-center px-6 py-2">
        
        <Link href="/" className="flex flex-col items-center text-white">
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link href="/category" className="flex flex-col items-center text-white">
          <Grid className="w-6 h-6" />
          <span className="text-xs mt-1">Category</span>
        </Link>

        <Link href="/cart" className="flex flex-col items-center text-white">
          <ShoppingCart className="w-6 h-6" />
          <span className="text-xs mt-1">Cart</span>
        </Link>

        <Link href="/account" className="flex flex-col items-center text-white">
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Account</span>
        </Link>

      </div>
    </div>
  );
}
