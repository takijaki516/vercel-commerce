import * as React from "react";
import Link from "next/link";
import { auth } from "@/auth";

import { HomeLogoIcon } from "../icons/home-logo";
import OpenCart from "../cart/open-cart";
import { MobileMenu } from "./mobile-nav";
import Search, { SearchSkeleton } from "./search";
import { UserInfo } from "./user-info";
import { Cart } from "../cart";
import { ModeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import { prismaDB } from "@/lib/prisma-db";

export async function Navbar() {
  const mostProductCollections = await prismaDB.collection.findMany({
    orderBy: {
      products: {
        _count: "desc",
      },
    },
    take: 2,
  });

  const session = await auth();

  const menus = ["all"];

  mostProductCollections.forEach((collection) => {
    menus.push(collection.title);
  });


  // TODO: come up with better css
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <React.Suspense fallback={null}>
          <MobileMenu menus={menus} />
        </React.Suspense>
      </div>

      <div className="flex w-full md:w-1/3">
        {/* NOTE: centering home icon via margin */}
        <Button
          variant={"outline"}
          className="mx-auto md:ml-0 md:mr-4 lg:ml-0 lg:mr-6"
        >
          <Link href="/">
            <HomeLogoIcon className="h-4 w-4" />
          </Link>
        </Button>

        {/* NOTE: show if screen is larger than md */}
        <ul className="hidden gap-6 text-sm md:flex md:items-center">
          {menus.map((item, idx) => (
            <li key={idx}>
              <Link
                href={`/search/${item}`}
                className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden justify-center md:flex md:w-1/3">
        <React.Suspense fallback={<SearchSkeleton />}>
          <Search />
        </React.Suspense>
      </div>

      <div className="flex justify-end space-x-1 md:w-1/3">
        {session ? (
          <>
            <UserInfo isAdmin={session.admin} />
          </>
        ) : (
          <Link
            href="/login"
            className="flex items-center text-neutral-300 underline-offset-4 hover:text-neutral-200 hover:underline"
          >
            <span>Login</span>
          </Link>
        )}
        <ModeToggle />
        <React.Suspense fallback={<OpenCart />}>
          <Cart />
        </React.Suspense>
      </div>
    </nav>
  );
}
