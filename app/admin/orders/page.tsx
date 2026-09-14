import fetchAllOrders from "@/actions/get-orders";

type OrderItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

// Safe helper function to prevent runtime SyntaxError
const safeParseItems = (itemsData: unknown): OrderItem[] => {
  if (!itemsData) return [];
  if (Array.isArray(itemsData)) return itemsData;

  if (typeof itemsData === "string") {
    try {
      const parsed = JSON.parse(itemsData);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // Fallback for malformed or un-stringified plain text data
      return [{ id: 1, title: itemsData, price: 0, quantity: 1 }];
    }
  }

  return [];
};

const OrdersPage = async () => {
  const orders = await fetchAllOrders();

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
        Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">No orders yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => {
            const items = safeParseItems(order.items);
            const orderDate = new Date(order.createdAt).toLocaleString("en-PK", {
              dateStyle: "medium",
              timeStyle: "short",
            });

            return (
              <div
                key={order.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Order #{order.id} — {order.customerName}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {orderDate}
                    </p>
                  </div>
                  <span className="inline-block w-fit text-xs font-semibold uppercase px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                    {order.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Phone</p>
                    <p className="text-slate-900 dark:text-white font-medium">
                      {order.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">City</p>
                    <p className="text-slate-900 dark:text-white font-medium">
                      {order.city}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-slate-500 dark:text-slate-400">Address</p>
                    <p className="text-slate-900 dark:text-white font-medium">
                      {order.address}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                  {items.map((item, idx) => (
                    <div
                      key={item.id ?? idx}
                      className="flex justify-between text-sm text-slate-700 dark:text-slate-300 mb-1"
                    >
                      <span>
                        {item.title} x {item.quantity}
                      </span>
                      <span>
                        Rs {(item.price * item.quantity).toLocaleString("en-PK")}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-slate-900 dark:text-white mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span>Total</span>
                    <span className="text-red-600">
                      Rs {Number(order.totalAmount).toLocaleString("en-PK")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;