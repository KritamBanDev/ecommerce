import React from "react";
import SearchBar from "./new/SearchBar";
import CartIcon from "./new/CartIcon";
import OrdersIcon from "./new/OrdersIcon";
import { ClerkLoaded, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { getMyOrders } from "@/sanity/helpers/index";

const RightBar = async () => {
  const user = await currentUser();
  let orderCount = 0;
  if (user) {
    try {
      const orders = await getMyOrders(user.id);
      orderCount = Array.isArray(orders) ? orders.length : 0;
    } catch {
      orderCount = 0;
    }
  }
  return (
    <div className="w-auto md:w-1/3 flex items-center justify-end gap-6 text-base font-semibold">
      <SearchBar />
      <CartIcon />
      <OrdersIcon orderCount={orderCount} />
      <ClerkLoaded>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  "ring-2 ring-fuchsia-400 hover:ring-fuchsia-600 transition-all duration-200 shadow-md",
              },
            }}
          />
        </SignedIn>
        {!user && (
          <SignInButton mode="modal">
            <button className="text-base font-bold hover:text-fuchsia-700 transition-colors duration-150">
              Login
            </button>
          </SignInButton>
        )}
      </ClerkLoaded>
    </div>
  );
};

export default RightBar;
