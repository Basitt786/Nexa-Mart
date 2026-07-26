"use client";

import { useState } from "react";
import { User, Package, Heart, LogOut, KeyRound } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  // Temporary state for demonstration — replace with your Auth Hook later (e.g. NextAuth/Clerk)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-zinc-900/80 border border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-xl text-center">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-6 h-6 text-red-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-zinc-400 text-sm mb-6">
            Sign in to view your orders, manage wishlist, and update profile settings.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-4 text-left mb-6">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                required
                className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md active:scale-95 mt-2"
            >
              Sign In
            </button>
          </form>

          <p className="text-xs text-zinc-500">
            Don't have an account?{" "}
            <span className="text-red-500 cursor-pointer hover:underline">
              Create One
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[75vh] max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-red-600 to-red-400 flex items-center justify-center text-white font-bold text-xl shadow-lg">
            BA
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Basit Ali</h1>
            <p className="text-zinc-400 text-sm">basit@example.com</p>
          </div>
        </div>

        <button
          onClick={() => setIsLoggedIn(false)}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-sm font-medium rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4 text-red-500" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Account Dashboard Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl hover:border-zinc-700 transition-colors">
          <Package className="w-8 h-8 text-red-500 mb-3" />
          <h3 className="text-lg font-semibold text-white mb-1">Orders</h3>
          <p className="text-zinc-400 text-xs mb-4">Check status and track your active purchases.</p>
          <span className="text-xs font-semibold text-red-500">0 Active Orders</span>
        </div>

        <div className="p-6 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl hover:border-zinc-700 transition-colors">
          <Heart className="w-8 h-8 text-red-500 mb-3" />
          <h3 className="text-lg font-semibold text-white mb-1">Wishlist</h3>
          <p className="text-zinc-400 text-xs mb-4">View items you saved for later checkout.</p>
          <span className="text-xs font-semibold text-red-500">0 Items Saved</span>
        </div>

        <div className="p-6 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl hover:border-zinc-700 transition-colors">
          <User className="w-8 h-8 text-red-500 mb-3" />
          <h3 className="text-lg font-semibold text-white mb-1">Profile Details</h3>
          <p className="text-zinc-400 text-xs mb-4">Manage shipping addresses and contact information.</p>
          <Link href="#" className="text-xs font-semibold text-red-500 hover:underline">
            Edit Profile →
          </Link>
        </div>
      </div>
    </div>
  );
}