// db/schema.ts
import {
    pgTable,
    serial,
    text,
    numeric,
    timestamp,
  } from "drizzle-orm/pg-core";
  
  export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    price: numeric("price").notNull(),
    category: text("category").notNull(),
    image: text("image").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  });
  
  export const orders = pgTable("orders", {
    id: serial("id").primaryKey(),
    customerName: text("customer_name").notNull(),
    phone: text("phone").notNull(),
    address: text("address").notNull(),
    city: text("city").notNull(),
    items: text("items").notNull(),
    totalAmount: numeric("total_amount").notNull(),
    status: text("status").default("pending").notNull(),
    paymentMethod: text("payment_method").default("COD").notNull(),
    paymentStatus: text("payment_status").default("unpaid").notNull(),
    
    // Safepay tracker optional configuration
    safepayTracker: text("safepay_tracker"),
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
  });