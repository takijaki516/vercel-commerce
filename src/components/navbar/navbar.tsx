import * as React from "react";
import Link from "next/link";
import { auth } from "@/auth";

import { HomeLogoIcon } from "../icons/home-logo";
import OpenCart from "../cart/open-cart";
import { MobileMenu } from "./mobile-nav";
import Search, { SearchSkeleton } from "./search";
import { UserInfo } from "./user-info";
import { Cart } from "../cart";
import { PersonIcon } from "@radix-ui/react-icons";

const menus = ["all", "shirt", "pants", "shoes"];

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <React.Suspense fallback={null}>
          <MobileMenu menus={menus} />
        </React.Suspense>
      </div>

      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <HomeLogoIcon className="h-4 w-4" />
            <span className="ml-2 flex-none justify-center text-sm font-medium md:w-auto lg:mr-6">
              HOME
            </span>
          </Link>
          <ul className="hidden gap-6 text-sm md:flex md:items-center">
            {menus.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item}
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

        <div className="flex justify-end md:w-1/3">
          {session ? (
            <UserInfo />
          ) : (
            <Link href="/login">
              <PersonIcon />
            </Link>
          )}
          <React.Suspense fallback={<OpenCart />}>
            <Cart />
          </React.Suspense>
        </div>
      </div>
    </nav>
  );
}
