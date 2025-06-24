import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, metadata } = body;
    // Create a new order in Sanity for COD
    const orderDoc = {
      _type: "order",
      orderNumber: metadata.orderNumber || uuidv4(),
      customerName: metadata.customerName,
      customerEmail: metadata.customerEmail,
      clerkUserId: metadata.clerkUserId,
      status: "cod",
      products: items.map((item: any) => ({
        product: { _ref: item.product._id, _type: "reference" },
        quantity: item.quantity,
      })),
      orderDate: new Date().toISOString(),
    };
    await client.create(orderDoc);
    return NextResponse.json({ success: true, orderNumber: orderDoc.orderNumber });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
