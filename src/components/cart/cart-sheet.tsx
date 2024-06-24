"use client";

import Link from "next/link";
import { Cross1Icon } from "@radix-ui/react-icons";
import { CartItem, Product, ProductVariant } from "@prisma/client";
import Image from "next/image";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ShoppingCartLogoIcon } from "../icons/shopping-cart-logo";
import { Button } from "../ui/button";
import { DeleteItemButton } from "./delete-item-button";
import { Price } from "../price";
import { EditItemQuantityButton } from "./edit-item-quantity-button";

export function CartSheet({
  cartItems,
}: {
  cartItems: (CartItem & {
    product: Product;
    productVariant: ProductVariant;
  })[];
}) {
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0,
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <ShoppingCartLogoIcon className="dark:fill-white" />
        </Button>
      </SheetTrigger>

      <SheetContent
        onInteractOutside={(e) => e.preventDefault()}
        className="flex flex-col justify-between"
      >
        <SheetHeader className="flex flex-row items-center justify-between space-y-0">
          <SheetTitle>My Cart</SheetTitle>

          <SheetClose asChild className="mt-0">
            <Button
              variant={"ghost"}
              className="flex items-center justify-center"
            >
              <Cross1Icon className="h-6 w-6" />
            </Button>
          </SheetClose>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
            <ShoppingCartLogoIcon className="h-16 w-16 dark:fill-white" />
            <p className="mt-6 text-center text-2xl font-bold">
              Your cart is empty
            </p>
          </div>
        ) : (
          <div className="flex">
            <ul>
              {cartItems.map((item, idx) => {
                return (
                  <li
                    key={idx}
                    className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                  >
                    <div className="relative flex w-full flex-row justify-between px-1 py-4">
                      <div className="absolute z-50 -mt-2 ml-[55px]">
                        <DeleteItemButton itemId={item.id} />
                      </div>

                      <Link href="/" className="z-30 flex flex-row space-x-4">
                        <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                          <Image
                            className="h-full w-full object-cover"
                            width={64}
                            height={64}
                            src={item.product.mainImage}
                            alt={item.product.title}
                          />
                        </div>

                        <div className="flex flex-1 flex-col text-base">
                          <span className="leading-tight">
                            {item.product.title}
                          </span>
                          <span className="text-sm text-neutral-500 dark:text-neutral-400">
                            {item.productVariant.size}
                          </span>
                        </div>
                      </Link>

                      <div className="flex h-16 flex-col justify-between">
                        <Price
                          amount={item.quantity * item.product.price}
                          className="flex justify-end space-y-2 text-right text-sm"
                        />
                        <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                          <EditItemQuantityButton item={item} type="minus" />

                          <p className="w-6 text-center">
                            <span className="w-full text-sm">
                              {item.quantity}
                            </span>
                          </p>

                          <EditItemQuantityButton item={item} type="plus" />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <SheetFooter className="flex w-full flex-col sm:flex-col sm:justify-center sm:space-x-0">
          <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="mb-3 flex items-center justify-between border-b border-neutral-200 py-1 dark:border-neutral-700">
              <p>Shipping</p>
              <p className="text-right">calculated at checkout</p>
            </div>

            <div className="mb-3 flex items-center justify-between border-b border-neutral-200 py-1 dark:border-neutral-700">
              <p>Total</p>
              <Price
                amount={totalAmount}
                className="text-right text-base text-black dark:text-white"
              />
            </div>
          </div>

          <Link
            // TODO: add toss payments
            href={"/checkout"}
            className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
          >
            Proceed to Checkout
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
