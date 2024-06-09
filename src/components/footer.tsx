import Link from "next/link";
import * as React from "react";

import { HomeLogoIcon } from "./icons/home-logo";
import { FooterMenu } from "./footer-menu";
import { Menu } from "@/lib/types";

export const footerMenus: Menu[] = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Terms & Conditions",
    path: "/terms-and-conditions",
  },
  {
    title: "Privacy Policy",
    path: "/privacy-policy",
  },
  {
    title: "FAQ",
    path: "/faq",
  },
];

export async function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div>
        <div>
          <Link href="/">
            <HomeLogoIcon />
            <span>Home</span>
          </Link>
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
          <FooterMenu menu={footerMenus} />
        </React.Suspense>
      </div>

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
