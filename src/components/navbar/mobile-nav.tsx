"use client";

import * as React from "react";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import Link from "next/link";

import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import Search, { SearchSkeleton } from "./search";

export function MobileMenu({ menus }: { menus: string[] }) {
  const [isOpen, setIsOpen] = React.useState(false);

  // REVIEW:
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <HamburgerMenuIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side={"left"} className="flex flex-col">
        {/* TODO: fix css */}
        <SheetClose>
          <Button>
            <Cross1Icon />
          </Button>
        </SheetClose>

        <React.Suspense fallback={<SearchSkeleton />}>
          <Search />
        </React.Suspense>

        <ul className="flex w-full flex-col">
          {menus.map((item, idx) => (
            <li
              key={idx}
              className="py-2 text-xl text-black hover:text-neutral-500 dark:text-white dark:hover:text-neutral-500"
            >
              <Link href={`/search/${item}`} onClick={() => setIsOpen(false)}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
