"use client";

import Link from "next/link";
import * as React from "react";
import { usePathname } from "next/navigation";

import { Menu } from "@/lib/types";
import { cn } from "@/lib/utils";

function FooterMenuItem({ item }: { item: Menu }) {
  const pathname = usePathname();
  const [active, setActive] = React.useState(pathname === item.path);

  React.useEffect(() => {
    setActive(pathname === item.path);
  }, [pathname, item.path]);

  return (
    <li>
      <Link
        href={item.path}
        className={cn("block p-2", {
          "text-black dark:text-neutral-300": active,
        })}
      >
        {item.title}
      </Link>
    </li>
  );
}

export function FooterMenu({ menu }: { menu: Menu[] }) {
  if (!menu.length) return null;

  return (
    <nav>
      <ul>
        {menu.map((item: Menu) => {
          return <FooterMenuItem key={item.title} item={item} />;
        })}
      </ul>
    </nav>
  );
}
