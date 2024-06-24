"use server";

import { cookies } from "next/headers";

import { auth } from "@/auth";
import { prismaDB } from "@/lib/prisma-db";

interface AddItemToCartParams {
  productId: string | undefined;
  selectedVariantId: string | undefined;
}

export async function addItemToCart(
  prevState: any,
  params: AddItemToCartParams,
) {
  // TODO: add ZOD to validate
  if (!params || !params.selectedVariantId || !params.productId) {
    return "invalid params";
  }

  const session = await auth();

  // REVIEW:
  if (!session || !session.user || !session.user.id) {
    return "Not authorized";
  }
  const userId = session.user.id;

  let cart = await prismaDB.cart.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!cart) {
    cart = await prismaDB.cart.create({
      data: {
        userId: userId,
      },
    });
  }

  try {
    await prismaDB.cartItem.create({
      data: {
        quantity: 1,
        cartId: cart.id,
        productId: params.productId,
        productVariantId: params.selectedVariantId,
      },
    });
    // TODO: add revalidate
  } catch (error) {
    return "Error adding item to cart";
  }
}

interface RemoveItemFromCartParams {
  itemId: string;
}

export async function removeItemFromCart(
  prevState: any,
  params: RemoveItemFromCartParams,
) {
  try {
    const deletedCartItem = await prismaDB.cartItem.delete({
      where: {
        id: params.itemId,
      },
    });
    // TODO: add revalidate
  } catch (error) {
    return "error removing item from cart";
  }
}

export interface UpdateItemQuantityParams {
  itemId: string;
  variantId: string;
  quantity: number;
}

export async function updateItemQuantity(
  prevState: any,
  params: UpdateItemQuantityParams,
) {
  try {
    if (params.quantity === 0) {
      await prismaDB.cartItem.delete({
        where: {
          id: params.itemId,
        },
      });
      // TODO: add revalidation
      return;
    }

    await prismaDB.cartItem.update({
      where: {
        id: params.itemId,
      },
      data: {
        quantity: params.quantity,
      },
    });

    // TODO: add revalidate
  } catch (error) {
    return "error updating item quantity";
  }
}
