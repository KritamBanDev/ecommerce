"use client";
import Container from "@/components/Container";
import OrdersComponent from "@/components/OrdersComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileX } from "lucide-react";
import Link from "next/link";
import React from "react";

interface OrdersPageClientProps {
  orders: import("@/sanity.types").MY_ORDERS_QUERYResult;
}

const OrdersPageClient: React.FC<OrdersPageClientProps> = ({ orders }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Container className="py-10">
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary">
            My Orders
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
            Here you can view all your past orders, check their status, and
            download invoices. Thank you for shopping with us!
          </p>
        </div>
        {orders.length ? (
          <Card className="w-full shadow-lg border border-gray-200 dark:border-gray-800 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">Order List</CardTitle>
            </CardHeader>
            <CardContent>
              <OrdersComponent orders={orders} />
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <FileX className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Orders Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You haven&apos;t placed any orders yet.
            </p>
            <Link href="/" passHref legacyBehavior>
              <Button asChild variant="default">
                <span>Continue Shopping</span>
              </Button>
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
};

export default OrdersPageClient;
