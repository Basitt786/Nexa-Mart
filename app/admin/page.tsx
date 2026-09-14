import Link from "next/link";
import { Package, ShoppingBag, PlusCircle, TrendingUp } from "lucide-react";
import fetchAllProducts from "@/actions/get-all-products";
import fetchAllOrders from "@/actions/get-orders";

export default async function AdminDashboardPage() {
  const [products, orders] = await Promise.all([
    fetchAllProducts(),
    fetchAllOrders(),
  ]);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.totalAmount),
    0
  );

  const stats = [
    {
      label: "Total Products",
      value: products.length,
      icon: Package,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400",
    },
    {
      label: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400",
    },
    {
      label: "Total Revenue",
      value: `Rs ${totalRevenue.toLocaleString("en-PK")}`,
      icon: TrendingUp,
      color: "text-red-600 bg-red-50 dark:bg-red-950/50 dark:text-red-400",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your Nexa-Mart store from here.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm"
          >
            <div className={`inline-flex p-2.5 rounded-xl ${stat.color} mb-3`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {stat.value}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/admin/add-product"
          className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:border-red-600/50 hover:shadow-md transition-all duration-200 flex items-center gap-4"
        >
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 group-hover:scale-105 transition-transform">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              Add New Product
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Create a new inventory entry
            </p>
          </div>
        </Link>

        <Link
          href="/admin/products"
          className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:border-red-600/50 hover:shadow-md transition-all duration-200 flex items-center gap-4"
        >
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              Manage Products
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Edit or delete existing products
            </p>
          </div>
        </Link>

        <Link
          href="/admin/orders"
          className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:border-red-600/50 hover:shadow-md transition-all duration-200 flex items-center gap-4"
        >
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              View Orders
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              See all customer orders
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}