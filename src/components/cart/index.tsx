import { cookies } from "next/headers";

import { ShoppingCartLogoIcon } from "../icons/shopping-cart-logo";
import { Sheet, SheetHeader, SheetTrigger } from "../ui/sheet";
import { getCart } from "@/lib";
import { CartComponent } from "./cart";

export async function Cart() {
  const cartId = cookies().get("cartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }
}
