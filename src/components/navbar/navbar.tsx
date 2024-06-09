import * as React from "react";
import Link from "next/link";

import { HomeLogoIcon } from "../icons/home-logo";
import { Cart } from "../cart";
import OpenCart from "../cart/open-cart";
import Search, { SearchSkeleton } from "../search";
import { MobileMenu } from "./mobile-nav";

const menus = ["all", "shirt", "pants", "shoes"];

export async function Navbar() {
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <React.Suspense fallback={null}>
          <MobileMenu menus={menus} />
        </React.Suspense>
      </div>

      <div className="flex w-full items-center">
        <div className="flew w-full md:w-1/3">
          <Link href="/">
            <HomeLogoIcon />
            <span>HOME</span>
          </Link>
          {menus.map((item, idx) => (
            <li key={idx}>
              <Link
                href={item}
                className="text-neutral-500 underline-offset-4 hover:text-black"
              >
                {item}
              </Link>
            </li>
          ))}
        </div>

        <div className="hidden justify-center md:flex md:w-1/3">
          <React.Suspense fallback={<SearchSkeleton />}>
            <Search />
          </React.Suspense>
        </div>

        <div>
          <React.Suspense fallback={<OpenCart />}></React.Suspense>
        </div>
      </div>
    </nav>
  );
}
