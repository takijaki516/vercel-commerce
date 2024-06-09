import { auth } from "@/auth";
import { prismaDB } from "@/lib/prisma-db";
import { CartComponent } from "./cart-component";

// TODO: add cookie based cart
export async function Cart() {
  const session = await auth();
  if (!session || !session.user) return null;

  const cart = await prismaDB.cart.findUnique({
    where: {
      userId: session.user?.id,
    },
    include: {
      cartItems: true,
    },
  });

  if (!cart) return null;
  const cartItems = cart?.cartItems;

  return <CartComponent cartItems={cartItems} />;
}
