"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

const getProductById = async (id: number) => {
  try {
    const data = await db
      .select()
      .from(products)
      .where(eq(products.id, id));
    return data[0] ?? null;
  } catch (error) {
    console.error("getProductById error:", error);
    throw new Error("Failed to load product from Neon DB");
  }
};

export default getProductById;
