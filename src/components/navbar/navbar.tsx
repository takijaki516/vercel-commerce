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

const menus = ["all", "shirt", "pants"];

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
          {/* TODO: render button differently based on media query */}
          {/* TODO: implement use-mediaquery hook */}
          <Button
            variant={"outline"}
            className="mx-auto md:ml-0 md:mr-4 lg:ml-0 lg:mr-6"
          >
            <Link href="/">
              <HomeLogoIcon className="h-4 w-4" />
            </Link>
          </Button>

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

        <div className="flex justify-end space-x-1 md:w-1/3">
          {session ? (
            <>
              <UserInfo isAdmin={session.admin} />
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center space-x-1 text-neutral-300 underline-offset-4 hover:text-neutral-200 hover:underline"
            >
              <span>Login</span>
            </Link>
          )}
          <ModeToggle />
          <React.Suspense fallback={<OpenCart />}>
            <Cart />
          </React.Suspense>
        </div>
      </div>
    </nav>
  );
}
