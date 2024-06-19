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
  return (
    <footer className="border-t border-neutral-200 text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-12 text-sm md:flex-row md:gap-10 md:px-4 min-[1320px]:px-0">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 text-black dark:text-neutral-200 md:pt-2"
          >
            <HomeLogoIcon />
            <span className="uppercase">Home</span>
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
    </footer>
  );
}
