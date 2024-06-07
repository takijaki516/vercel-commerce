import * as React from "react";
import Link from "next/link";

import LogoSquare from "@/components/logo-squre";
import { MobileMenu } from "./mobile-menu";
import { Search, SearchSkeleton } from "./search";
import OpenCart from "@/components/cart/open-cart";

export default async function Navbar() {
  const menu = await getMenu();

  return (
    <nav>
      <div>
        <React.Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </React.Suspense>
      </div>

      <div>
        <div>
          <Link href="/">
            <LogoSquare />
          </Link>
          {menu.length ? <ul></ul> : null}
        </div>
        <div>
          <React.Suspense fallback={<SearchSkeleton />}>
            <Search />
          </React.Suspense>
        </div>
        <div>
          <React.Suspense fallback={<OpenCart />}>
            <Cart />
          </React.Suspense>
        </div>
      </div>
    </nav>
  );
}
