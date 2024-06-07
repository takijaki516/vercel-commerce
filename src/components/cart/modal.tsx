"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Cart } from "@/lib/types";
import OpenCart from "./open-cart";
import { ShoppingCartLogoIcon } from "../icons/shopping-cart-logo";
import CloseCart from "./close-cart";
import { createUrl } from "@/lib/utils";
import { DEFAULT_OPTION } from "@/lib/constants";
import { DeleteItemButton } from "./delete-item-button";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export function CartModal({ cart }: { cart: Cart }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const quantityRef = React.useRef(cart.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  React.useEffect(() => {}, []);

  return (
    <>
      <button>
        <OpenCart quantity={cart.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart}>
          <TransitionChild>
            <div />
          </TransitionChild>
          <TransitionChild>
            <DialogPanel>
              <div>
                <p>My Cart</p>
                <button>
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.lines.length === 0 ? (
                <div>
                  <ShoppingCartLogoIcon />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                <div>
                  <ul>
                    {cart.lines.map((item, i) => {
                      const merchandiseSearchPrams =
                        {} as MerchandiseSearchParams;

                      item.merchandise.selectedOptions.forEach(
                        ({ name, value }) => {},
                      );

                      const merchandiseUrl = createUrl();

                      return (
                        <li key={i} className="flex w-full">
                          <div>
                            <div>
                              <DeleteItemButton />
                            </div>
                            <Link
                              href={merchandiseUrl}
                              onClick={closeCart}
                              className="z-30 flex"
                            >
                              <div>
                                <Image />
                              </div>

                              <div>
                                <span>{item.merchandise.product.title}</span>
                                {item.merchandise.title !== DEFAULT_OPTION ? (
                                  <p>{item.merchandise.title}</p>
                                ) : null}
                              </div>
                            </Link>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}
