// app/admin/add-product/actions.ts
"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
  const title = formData.get("title") as string;
  const priceInput = formData.get("price") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as string;
  const description = formData.get("description") as string;

  if (!title || !priceInput || !category || !image) {
    throw new Error("Required fields are missing");
  }

  await db.insert(products).values({
    title,
    price: priceInput,
    category,
    image,
    description: description || null,
  });

  revalidatePath("/");
  revalidatePath("/admin");

  return { success: true };
}