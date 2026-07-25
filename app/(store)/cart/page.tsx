import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function CartPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="p-4 rounded-full bg-zinc-900 border border-zinc-800 mb-4">
        <ShoppingBag className="w-10 h-10 text-red-500" />
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">Your Cart is Empty</h1>
      <p className="text-zinc-400 text-sm max-w-sm mb-6">
        Looks like you haven't added any products to your cart yet.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl text-sm transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}