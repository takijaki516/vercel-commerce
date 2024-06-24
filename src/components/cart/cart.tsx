import { auth } from "@/auth";
import { prismaDB } from "@/lib/prisma-db";

import { CartSheet } from "./cart-sheet";

export async function Cart() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return null;
  }

  const cart = await prismaDB.cart.findUnique({
    where: {
      userId: session.user?.id,
    },
    include: {
      cartItems: {
        include: {
          product: true,
          productVariant: true,
        },
      },
    },
  });

  if (!cart) {
    return null;
  }

  const cartItems = cart.cartItems;

  return <CartSheet cartItems={cartItems} />;
}
