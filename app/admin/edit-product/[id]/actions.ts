"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProduct(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const priceInput = formData.get("price") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as string;
  const description = formData.get("description") as string;

  if (!title || !priceInput || !category || !image) {
    throw new Error("Required fields are missing");
  }

  await db
    .update(products)
    .set({
      title,
      price: priceInput,
      category,
      image,
      description: description || null,
    })
    .where(eq(products.id, id));

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}