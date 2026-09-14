"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

const fetchProductsByCategory = async (categoryName: string) => {
  try {
    const data = await db
      .select()
      .from(products)
      .where(eq(products.category, categoryName));
    return data;
  } catch (error) {
    console.error("fetchProductsByCategory error:", error);
    throw new Error("Failed to load products from Neon DB");
  }
};

export default fetchProductsByCategory;
