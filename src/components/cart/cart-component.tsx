"use client";

import { CartItem as CartItemType } from "@prisma/client";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { ShoppingCartLogoIcon } from "../icons/shopping-cart-logo";
import { CartItem } from "./cart-item";

export function CartComponent({ cartItems }: { cartItems: CartItemType[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <ShoppingCartLogoIcon />
      </SheetTrigger>

      <SheetContent>
        <ul>
          {cartItems.map((item, idx) => (
            <li key={idx}>
              <CartItem cartItem={item} />
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
