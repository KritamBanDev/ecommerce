import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import PriceFormatter from "./PriceFormatter";
import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { BadgeCheck, FileDown } from "lucide-react";

interface OrderDetailsDialogProps {
  order: MY_ORDERS_QUERYResult[number] | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  paid: "bg-blue-100 text-blue-800 border-blue-300",
  shipped: "bg-purple-100 text-purple-800 border-purple-300",
  delivered: "bg-green-100 text-green-800 border-green-300",
  cancelled: "bg-red-100 text-red-800 border-red-300",
};

const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!order) return null;

  const statusClass =
    statusColors[order.status || "pending"] ||
    "bg-gray-100 text-gray-800 border-gray-300";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-scroll bg-white rounded-xl shadow-xl p-0">
        <DialogHeader className="border-b px-6 pt-6 pb-2">
          <DialogTitle className="text-2xl font-bold">
            Order Details{" "}
            <span className="text-base font-normal text-gray-500">
              #{order.orderNumber}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 py-4 flex flex-col gap-2 md:flex-row md:gap-8 border-b">
          <div className="flex-1 space-y-1">
            <p>
              <strong>Customer:</strong> {order.customerName}
            </p>
            <p>
              <strong>Email:</strong> {order.email}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {order.orderDate &&
                new Date(order.orderDate).toLocaleDateString()}
            </p>
          </div>
          <div className="flex-1 space-y-1">
            <p className="flex items-center gap-2">
              <strong>Status:</strong>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-semibold capitalize ${statusClass}`}
              >
                <BadgeCheck className="w-4 h-4 mr-1" />
                {order.status}
              </span>
            </p>
            <p>
              <strong>Invoice Number:</strong>{" "}
              {order?.invoice?.number || (
                <span className="text-gray-400">N/A</span>
              )}
            </p>
            {order?.invoice?.hosted_invoice_url && (
              <Button
                asChild
                variant="outline"
                className="mt-2 flex items-center gap-2 border-blue-400 text-blue-700 hover:bg-blue-50"
              >
                <Link href={order.invoice.hosted_invoice_url} target="_blank">
                  <FileDown className="w-4 h-4" /> Download Invoice
                </Link>
              </Button>
            )}
          </div>
        </div>
        <div className="px-6 py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.products?.map((product, index) => (
                <TableRow key={index}>
                  <TableCell className="flex items-center gap-2 min-w-[180px]">
                    {product?.product?.images ? (
                      <Image
                        src={urlFor(product.product.images[0]).url()}
                        alt={product?.product?.name || "Product Image"}
                        width={50}
                        height={50}
                        className="border rounded-sm bg-white"
                      />
                    ) : (
                      <div className="w-[50px] h-[50px] bg-gray-100 border rounded-sm flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                    <span className="font-medium">
                      {product?.product?.name || (
                        <span className="text-gray-400">Unknown</span>
                      )}
                    </span>
                  </TableCell>
                  <TableCell>{product?.quantity}</TableCell>
                  <TableCell>
                    <PriceFormatter
                      amount={product?.product?.price}
                      className="text-black font-medium"
                    />
                    <span className="ml-1 text-xs text-gray-500">
                      {order.currency}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-end">
          <div className="w-56 flex flex-col gap-1">
            {order?.amountDiscount !== 0 && (
              <div className="w-full flex items-center justify-between">
                <strong>Discount: </strong>
                <span className="flex items-center gap-1">
                  <PriceFormatter
                    amount={order?.amountDiscount}
                    className="text-black font-bold"
                  />
                  <span className="text-xs text-gray-500">
                    {order.currency}
                  </span>
                </span>
              </div>
            )}
            {order?.amountDiscount !== 0 && (
              <div className="w-full flex items-center justify-between">
                <strong>Subtotal: </strong>
                <span className="flex items-center gap-1">
                  <PriceFormatter
                    amount={
                      (order?.totalPrice as number) +
                      (order?.amountDiscount as number)
                    }
                    className="text-black font-bold"
                  />
                  <span className="text-xs text-gray-500">
                    {order.currency}
                  </span>
                </span>
              </div>
            )}
            <div className="w-full flex items-center justify-between border-t pt-2 mt-2">
              <strong>Total: </strong>
              <span className="flex items-center gap-1">
                <PriceFormatter
                  amount={order?.totalPrice}
                  className="text-black font-bold"
                />
                <span className="text-xs text-gray-500">
                  {order.currency}
                </span>
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;