import Link from "next/link";
import * as React from "react";

import { HomeLogoIcon } from "./icons/home-logo";
import { FooterMenu } from "./footer-menu";
import { Menu } from "@/lib/types";
import { ModeToggle } from "./theme-toggle";

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
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm dark:border-neutral-700 md:flex-row md:gap-10 md:px-4 min-[1320px]:px-0">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 text-black dark:text-white md:pt-2"
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

      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 min-[1320px]:px-0">
          <p>&copy; All right reserved</p>
          <h4 className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          <p>Designed in California</p>
        </div>
      </div>
    </footer>
  );
}
