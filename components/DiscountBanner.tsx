import { SALE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const DiscountBanner = async ({ sales }: { sales: SALE_QUERYResult }) => {
  return (
    <section className="w-full max-w-screen-xl mx-auto mt-10 mb-5 animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 text-center tracking-tight">
        Limited Time Deals
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-2xl mx-auto">
        Save big on our exclusive offers! Use the coupon codes below and enjoy
        amazing discounts on your favorite products.
      </p>
      <Carousel className="w-full">
        <CarouselContent>
          {sales.map((sale) => (
            <CarouselItem key={sale?._id}>
              <Card className="overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="flex-1 p-6 md:px-12">
                      <Badge
                        variant="secondary"
                        className="mb-2 md:mb-4 text-darkBlue capitalize text-base px-3 py-1"
                      >
                        {sale?.badge} {sale?.discountAmount}% off
                      </Badge>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-2 md:mb-4">
                        {sale.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {sale?.description}
                      </p>
                      <p className="mb-4">
                        Use code:{" "}
                        <span className="font-semibold text-darkColor uppercase">
                          {sale.couponCode}
                        </span>{" "}
                        for{" "}
                        <span className="font-semibold">
                          {sale?.discountAmount}%
                        </span>{" "}
                        OFF
                      </p>
                      <Button className="mt-2 shadow-md hover:scale-105 transition-transform duration-200">
                        Shop Now
                      </Button>
                    </div>

                    {sale?.image && (
                      <div className="w-full md:w-1/2 h-auto relative flex items-center justify-center py-2">
                        <Image
                          src={urlFor(sale?.image).url()}
                          alt={sale.title || "bannerImage"}
                          width={500}
                          height={500}
                          priority
                          className="h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105 rounded-lg shadow-md"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.7s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default DiscountBanner;