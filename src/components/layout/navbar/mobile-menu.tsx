"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";

import { Search, SearchSkeleton } from "./search";
import { Menu } from "@/lib/types";

export function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = React.useState(false);

  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  return (
    <>
      <button>
        <HamburgerMenuIcon />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative">
          <TransitionChild as={React.Fragment} enter="" leave="">
            <div />
          </TransitionChild>

          <TransitionChild>
            <DialogPanel>
              <div>
                <button>
                  <Cross1Icon className="h-6" />
                </button>

                <div>
                  <React.Suspense fallback={<SearchSkeleton />}>
                    <Search />
                  </React.Suspense>
                </div>

                {menu.length ? (
                  <ul className="flex w-full flex-col">
                    {menu.map((item: Menu) => (
                      <li key={item.title} className="py-2 text-xl text-black">
                        <Link href={item.path} onClick={closeMobileMenu}>
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}
