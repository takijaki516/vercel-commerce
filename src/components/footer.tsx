import Link from "next/link";
import * as React from "react";

import { HomeLogoIcon } from "./icons/home-logo";
import { FooterMenu } from "./footer-menu";
import { Menu } from "@/lib/types";

export async function Footer() {
  const currentYear = new Date().getFullYear();

  // TODO:
  const menu: Menu[] = await getMenu();

  return (
    <footer>
      <div>
        <div>
          <HomeLogoIcon />
          <span>SITE NAME</span>
        </div>
      </div>
      <React.Suspense
        fallback={
          <div className="flex h-[188px] w-[200px] flex-col gap-2">
            <div className="w-full" />
            <div className="w-full" />
            <div className="w-full" />
            <div className="w-full" />
            <div className="w-full" />
            <div className="w-full" />
          </div>
        }
      >
        <FooterMenu menu={menu} />
      </React.Suspense>
      <div>
        <div>
          <p>&copy;</p>
          <h4 />
          <p>Designed in California</p>
          <p>
            <a>Crafted by</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
