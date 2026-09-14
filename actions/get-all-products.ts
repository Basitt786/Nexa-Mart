
"use server";

import { db } from "@/db";
import { products } from "@/db/schema";

const fetchAllProducts = async () => {
  try {
    const data = await db.select().from(products);
    console.log("fetchAllProducts result:", data);
    return data;
  } catch (error) {
    console.error("fetchAllProducts error:", error);
    throw new Error("Failed to load products from Neon DB");
  }
};

export default fetchAllProducts;
