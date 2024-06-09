"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

import { TAGS } from "@/lib/constants";
import { createCart, getCart } from "@/lib";

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined,
) {
  let cartId = cookies().get("cartId")?.value;
  let cart;
  // REVIEW: how to get userId?
  let userId = "test user id";

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart(userId);
    cartId = cart.id;
    cookies().set("cartId", cartId);
  }

  if (!selectedVariantId) {
    return "Missing product variant id";
  }

  try {
    await addToCart(cartId, []);
    revalidateTag(TAGS.cart);
  } catch (error) {
    return "Error adding item to cart";
  }
}

export async function removeItem(prevState: any, lineId: string) {
  const cartId = cookies().get("cartId")?.value;
  if (!cartId) {
    return "Missing cart Id";
  }

  try {
    await removeFromCart(cartId, [lineId]);
    revalidateTag(TAGS.cart);
  } catch (error) {
    return "error removing item from cart";
  }
}

export async function createItemQuantity() {}
