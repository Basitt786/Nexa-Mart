import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages, tool, type UIMessage } from 'ai';
import { z } from 'zod';
import { db } from '@/db';
import { products, orders } from '@/db/schema';
import { eq, ilike } from 'drizzle-orm';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: UIMessage[] = Array.isArray(body.messages) ? body.messages : [];

    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: google('gemini-1.5-flash'), // Stable model for tool execution
      stopWhenToolCalled: false,
      system:
        'Aap Nexa-Mart e-commerce store ke helpful customer support AI assistant hain. Hamesha usi language/style me jawab dein jisme user ne sawal poocha hai. Jab bhi user kisi product ke baare me poochay, "searchProducts" tool use karein. Jab user apna name, phone, address aur product confirm kare, hamesha "createOrder" tool call karke order database mein save karein. Default payment method Cash on Delivery (COD) hai.',
      messages: modelMessages,
      tools: {
        searchProducts: tool({
          description:
            'Nexa-Mart ke Neon database se products search karta hai.',
          inputSchema: z.object({
            category: z.string().optional(),
            keyword: z.string().optional(),
          }),
          execute: async ({ category, keyword }) => {
            try {
              let query = db.select().from(products).$dynamic();

              if (category) {
                query = query.where(eq(products.category, category.toLowerCase()));
              }
              if (keyword) {
                query = query.where(ilike(products.title, `%${keyword}%`));
              }

              const data = await query.limit(10);

              if (data.length === 0) {
                return { found: false, message: 'Koi matching product nahi mila.' };
              }

              return {
                found: true,
                products: data.map((p) => ({
                  id: p.id,
                  title: p.title,
                  price: p.price,
                  category: p.category,
                  description: p.description,
                })),
              };
            } catch (error) {
              console.error('searchProducts tool error:', error);
              return { found: false, message: 'Products fetch karte waqt error aaya.' };
            }
          },
        }),

        createOrder: tool({
          description: 'Jab customer order ki details (Name, Phone, Address, City, Product Title, Total Price) de de, tab is tool se database me order place karein.',
          inputSchema: z.object({
            customerName: z.string().describe("Customer ka poora naam"),
            phone: z.string().describe("Customer ka mobile number"),
            address: z.string().describe("Delivery address"),
            city: z.string().describe("City name, e.g. Karachi"),
            items: z.string().describe("Order hone wale product ka title ya item details"),
            totalAmount: z.number().describe("Total price amount"),
            paymentMethod: z.string().optional().describe("Payment method e.g. 'COD' ya 'Card'"),
          }),
          execute: async ({ customerName, phone, address, city, items, totalAmount, paymentMethod }) => {
            try {
              const newOrder = await db.insert(orders).values({
                customerName,
                phone,
                address,
                city,
                items, 
                totalAmount: totalAmount.toString(),
                status: 'pending',
                paymentMethod: paymentMethod || 'COD', // Default to COD
                paymentStatus: 'unpaid',               // Default payment status
              }).returning();

              return {
                success: true,
                orderId: newOrder[0].id,
                message: 'Order successfully created in database with Cash on Delivery!',
              };
            } catch (error) {
              console.error('createOrder tool error:', error);
              return { success: false, message: 'Database mein order insert nahi ho saka.' };
            }
          },
        }),
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate response' }),
      { status: 500 }
    );
  }
}