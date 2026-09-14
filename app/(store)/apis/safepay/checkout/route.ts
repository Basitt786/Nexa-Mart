import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, phone, address, city, items, totalAmount } = body;

    const apiKey = process.env.SAFEPAY_PUBLIC_KEY;
    const environment = process.env.SAFEPAY_ENVIRONMENT || "sandbox";

    if (!apiKey) {
      console.error("❌ SAFEPAY ERROR: API Key missing in environment variables.");
      return NextResponse.json({ error: "API key missing" }, { status: 500 });
    }

    const baseUrl =
      environment === "production"
        ? "https://api.getsafepay.com"
        : "https://sandbox.api.getsafepay.com";

    // 1. Safepay API Session Init
    const response = await fetch(`${baseUrl}/order/v1/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client: apiKey,
        amount: Math.round(Number(totalAmount) * 100), // PKR to Paisa
        currency: "PKR",
        environment: environment,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data?.data?.token) {
      console.error("❌ SAFEPAY API INIT ERROR:", data);
      return NextResponse.json({ error: "Safepay API init failed" }, { status: 500 });
    }

    const token = data.data.token;

    // 2. Database Order Insert
    await db.insert(orders).values({
      customerName,
      phone,
      address,
      city,
      items: typeof items === "string" ? items : JSON.stringify(items),
      totalAmount: totalAmount.toString(),
      status: "pending",
      paymentMethod: "Safepay",
      paymentStatus: "unpaid",
      safepayTracker: token,
    });

    const checkoutUrl = `${baseUrl}/checkout/pay?beacon=${token}`;
    return NextResponse.json({ url: checkoutUrl });

  } catch (error) {
    console.error("❌ SAFEPAY ROUTE FATAL ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}