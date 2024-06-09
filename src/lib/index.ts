import { prismaDB } from "./prisma-db";

export async function getCart(cartId: string) {
  const res = await prismaDB.cart.findUnique({
    where: {
      id: cartId,
    },
  });

  return res;
}

export async function createCart(userId: string) {
  const res = await prismaDB.cart.create({
    data: {
      userId: userId,
    },
  });

  return res;
}

export async function addToCart(cartId: string) {}

// NOTE: USER
export async function getUserByEmail(email: string) {
  const res = await prismaDB.user.findUnique({
    where: {
      email: email,
    },
  });

  return res;
}
