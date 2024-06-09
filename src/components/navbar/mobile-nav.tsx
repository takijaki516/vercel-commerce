"use client";

import * as React from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { Button } from "../ui/button";
import Search, { SearchSkeleton } from "./search";

export function MobileMenu({ menus }: { menus: string[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
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
        <HamburgerMenuIcon className="h-4 w-4" />
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetClose asChild>
          <Button asChild>
            <Cross1Icon />
          </Button>
        </SheetClose>

        <div>
          <React.Suspense fallback={<SearchSkeleton />}>
            <Search />
          </React.Suspense>
        </div>

        <ul>
          {menus.map((item, idx) => (
            <li key={idx}>
              <Link href={item} onClick={() => setIsOpen(false)}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
