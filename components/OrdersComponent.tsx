"use client";
import React, { useCallback, useState } from "react";
import { TableBody, TableCell, TableRow } from "./ui/table";
import PriceFormatter from "./PriceFormatter";
import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import OrderDetailsDialog from "./OrderDetailsDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { format } from "date-fns";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border border-yellow-300",
  paid: "bg-blue-100 text-blue-800 border border-blue-300",
  shipped: "bg-purple-100 text-purple-800 border border-purple-300",
  delivered: "bg-green-100 text-green-800 border border-green-300",
  cancelled: "bg-red-100 text-red-800 border border-red-300",
};

const OrdersComponent = ({ orders }: { orders: MY_ORDERS_QUERYResult }) => {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<
    MY_ORDERS_QUERYResult[number] | null
  >(null);

  const handleOrderClick = (order: MY_ORDERS_QUERYResult[number]) => {
    setSelectedOrder(order);
  };
  const router = useRouter();

  const refreshOrders = useCallback(() => {
    // This will trigger a refresh of the page data
    router.refresh();
  }, [router]);
  const handleDeleteOrder = async (
    orderId: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation(); // Prevent expanding the order when clicking delete

    if (
      !confirm(
        "Are you sure you want to delete this order? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(orderId);

    try {
      const response = await fetch("/api/delete-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete order");
      }

      toast.success("Order deleted successfully");

      // Refresh the page data to get the updated orders list
      refreshOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete order. Please try again."
      );
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders.map((order) => {
            const statusClass =
              statusColors[order.status || "pending"] ||
              "bg-gray-100 text-gray-800 border border-gray-300";
            return (
              <Tooltip key={order?.orderNumber}>
                <TooltipTrigger asChild>
                  <TableRow
                    className="cursor-pointer hover:bg-blue-50/60 h-14 transition group"
                    onClick={() => handleOrderClick(order)}
                  >
                    <TableCell className="font-medium max-w-[120px] truncate">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>{order.orderNumber?.slice(-10) ?? "N/A"}...</span>
                          </TooltipTrigger>
                          <TooltipContent>{order.orderNumber}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {order?.orderDate &&
                        format(new Date(order.orderDate), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell className="max-w-[120px] truncate">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>{order.customerName}</span>
                          </TooltipTrigger>
                          <TooltipContent>{order.customerName}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell max-w-[160px] truncate">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>{order.email}</span>
                          </TooltipTrigger>
                          <TooltipContent>{order.email}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1">
                        <PriceFormatter
                          amount={order?.totalPrice}
                          className="text-black font-medium"
                        />
                        <span className="text-xs text-gray-500">
                          {order.currency}
                        </span>
                      </span>
                    </TableCell>
                    <TableCell>
                      {order?.status && (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${statusClass} transition`}
                        >
                          {order?.status.charAt(0).toUpperCase() +
                            order?.status.slice(1)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell max-w-[100px] truncate">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>{order?.invoice?.number || "----"}</span>
                          </TooltipTrigger>
                          <TooltipContent>{order?.invoice?.number}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={(e) => handleDeleteOrder(order._id, e)}
                              className="ml-2 text-red-500 hover:text-red-700 cursor-pointer transition-colors disabled:opacity-60 disabled:cursor-not-allowed group-hover:scale-110 group-hover:shadow-lg"
                              disabled={isDeleting === order._id}
                              aria-label="Delete order"
                            >
                              {isDeleting === order._id ? (
                                <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Trash size={18} />
                              )}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Delete order</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                </TooltipTrigger>
                <TooltipContent className="text-white font-medium">
                  <p>Click to see order details</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </TableBody>
      <OrderDetailsDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
};

export default OrdersComponent;