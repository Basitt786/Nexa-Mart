"use server";

import { db } from "@/db";
import { orders } from "@/db/schema";

type OrderInput = {
  customerName: string;
  phone: string;
  address: string;
  city: string;
  items: { id: number; title: string; price: number; quantity: number }[];
  totalAmount: number;
};

export async function placeOrder(data: OrderInput) {
  try {
    await db.insert(orders).values({
      customerName: data.customerName,
      phone: data.phone,
      address: data.address,
      city: data.city,
      items: JSON.stringify(data.items),
      totalAmount: data.totalAmount.toString(),
    });

    return { success: true };
  } catch (error) {
    console.error("placeOrder error:", error);
    return { success: false, error: "Failed to place order" };
  }
}
