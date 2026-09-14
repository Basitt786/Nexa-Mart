
"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "@/app/store/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

const CartPage = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!mounted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-zinc-400">Loading cart...</p>
      </div>
    );
  }

  if (items.length === 0) {
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

  return (
    <div className="px-4 sm:px-6 md:px-10 mt-6 pb-12 max-w-4xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-6">
        Your Cart
      </h1>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4"
          >
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-white font-medium text-sm sm:text-base line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-red-500 font-bold mt-1 text-sm sm:text-base">
                  Rs {item.price.toLocaleString("en-PK")}
                </p>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 hover:text-red-400 p-2 shrink-0"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 border-t border-zinc-800 pt-3">
              <button
                onClick={() => dispatch(decreaseQuantity(item.id))}
                className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-md p-2"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-white w-8 text-center font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() => dispatch(increaseQuantity(item.id))}
                className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-md p-2"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 sm:p-6 flex items-center justify-between">
        <span className="text-white text-base sm:text-lg font-semibold">Total</span>
        <span className="text-red-500 text-xl sm:text-2xl font-bold">
          Rs {total.toLocaleString("en-PK")}
        </span>
      </div>

      <Link
        href="/checkout"
        className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center text-sm sm:text-base"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default CartPage;
