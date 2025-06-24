import { getMyOrders } from "@/sanity/helpers/index";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import OrdersPageClient from "./OrdersPageClient";

const OrdersPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }
  const orders = (await getMyOrders(userId)) || [];
  return <OrdersPageClient orders={orders} />;
};

export default OrdersPage;