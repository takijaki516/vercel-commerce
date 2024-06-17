"use client";

import * as React from "react";

import {
  DashboardIcon,
  ArchiveIcon,
  RocketIcon,
  TableIcon,
} from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

export const sidebarMenus = [
  { link: "dashboard", title: "dashboard", Icon: DashboardIcon },
  { link: "products", title: "products", Icon: ArchiveIcon },
  { link: "collections", title: "collections", Icon: TableIcon },
  { link: "orders", title: "orders", Icon: RocketIcon },
];

type ArrayElement<T> = T extends Array<infer U> ? U : never;

function SidebarMenuItem({
  title,
  Icon,
  link,
}: ArrayElement<typeof sidebarMenus>) {
  const pathname = usePathname();
  const pathArr = pathname.split("/");
  const activePath = pathArr[2];
  const isActive = activePath === link;

  return (
    <li
      className={cn(
        isActive &&
          "bg-neutral-100 text-black dark:bg-neutral-800 dark:text-neutral-300",
        "rounded-md p-2",
      )}
    >
      <Link href={`/admin/${link}`} className="flex items-center space-x-2">
        <Icon className="h-5 w-5" />
        <span>{title}</span>
      </Link>
    </li>
  );
}

export function AdminSidebarItems() {
  const pathname = usePathname();
  const pathArr = pathname.split("/");
  const activePath = pathArr[2];

  return (
    <div className="flex h-full flex-col bg-neutral-50 dark:bg-neutral-900">
      <div className="flex items-center px-6 py-8">
        <h3 className="text-2xl font-semibold uppercase text-black dark:text-neutral-300">
          {activePath}
        </h3>
      </div>

      <ul className="flex flex-1 flex-col space-y-4 overflow-hidden px-4 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-neutral-300">
        {sidebarMenus.map((item, idx) => (
          <SidebarMenuItem
            key={idx}
            link={item.link}
            title={item.title}
            Icon={item.Icon}
          />
        ))}
      </ul>
    </div>
  );
}
