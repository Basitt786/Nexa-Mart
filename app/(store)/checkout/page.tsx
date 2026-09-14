"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { clearCart } from "@/app/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import { placeOrder } from "./actions";

const CheckoutPage = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "Safepay">("COD");

  // Hydration sync fix
  useEffect(() => {
    setMounted(true);
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (paymentMethod === "COD") {
        const result = await placeOrder({
          customerName,
          phone,
          address,
          city,
          items: items.map((item) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
          })),
          totalAmount: total,
          paymentMethod: "COD",
        });

        if (result.success) {
          dispatch(clearCart());
          alert("Order placed successfully! We will contact you soon.");
          router.push("/");
        } else {
          alert("Failed to place order. Please try again.");
        }
      } else {
        const res = await fetch("/apis/safepay/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerName,
            phone,
            address,
            city,
            items: JSON.stringify(items),
            totalAmount: total,
          }),
        });

        const data = await res.json();
        if (data.url) {
          dispatch(clearCart());
          window.location.href = data.url;
        } else {
          alert("Safepay initialization failed. Please try again.");
        }
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Prevent rendering state mismatch until component mounts on client
  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-400 font-medium">Loading checkout...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 font-medium">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-10 mt-6 pb-12 max-w-2xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Checkout
      </h1>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <h2 className="text-gray-900 font-semibold mb-4 text-lg">Order Summary</h2>
        <div className="divide-y divide-gray-100">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm text-gray-700 py-2.5">
              <span>
                {item.title} <span className="text-gray-400 font-medium">x {item.quantity}</span>
              </span>
              <span className="font-medium text-gray-900">
                Rs {(item.price * item.quantity).toLocaleString("en-PK")}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between text-gray-900 font-bold text-base">
          <span>Total</span>
          <span className="text-red-600">Rs {total.toLocaleString("en-PK")}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Full Name
          </label>
          <input
            type="text"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors shadow-sm"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Phone Number
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors shadow-sm"
            placeholder="03XX-XXXXXXX"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Delivery Address
          </label>
          <textarea
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none shadow-sm"
            placeholder="House #, Street, Area"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            City
          </label>
          <input
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors shadow-sm"
            placeholder="Karachi, Lahore, etc."
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <label className="text-sm font-medium text-gray-900 mb-3 block">
            Select Payment Method
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod("COD")}
              className={`p-3.5 rounded-xl border text-sm font-semibold transition-all ${
                paymentMethod === "COD"
                  ? "border-red-600 bg-red-50 text-red-600 shadow-sm"
                  : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:border-gray-300"
              }`}
            >
              Cash on Delivery
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("Safepay")}
              className={`p-3.5 rounded-xl border text-sm font-semibold transition-all ${
                paymentMethod === "Safepay"
                  ? "border-red-600 bg-red-50 text-red-600 shadow-sm"
                  : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:border-gray-300"
              }`}
            >
              Safepay (Card / Wallet)
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 shadow-md shadow-red-600/20"
        >
          {loading
            ? "Processing..."
            : paymentMethod === "COD"
            ? "Place Order (COD)"
            : "Pay with Safepay"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;