"use server";

import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc } from "drizzle-orm";

const fetchAllOrders = async () => {
  try {
    const data = await db.select().from(orders).orderBy(desc(orders.createdAt));
    return data;
  } catch (error) {
    console.error("fetchAllOrders error:", error);
    throw new Error("Failed to load orders from Neon DB");
  }
};

export default fetchAllOrders;
