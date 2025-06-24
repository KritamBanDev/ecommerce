import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { client } from "@/sanity/lib/client";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { orderId } = await req.json();
    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }
    // Fetch the order to verify ownership
    const order = await client.fetch(
      `*[_type == 'order' && _id == $orderId && clerkUserId == $userId][0]`,
      { orderId, userId }
    );
    if (!order) {
      return NextResponse.json({ error: "Order not found or not authorized" }, { status: 404 });
    }
    // Delete the order
    await client.delete(orderId);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error deleting order:", error);
    return NextResponse.json({ error: (error as Error).message || "Failed to delete order" }, { status: 500 });
  }
}
