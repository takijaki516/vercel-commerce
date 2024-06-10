"use client";

import * as React from "react";

import { DashboardIcon, ArchiveIcon, RocketIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

export const sidebarMenus = [
  { link: "", title: "dashboard", Icon: DashboardIcon },
  { link: "product", title: "product", Icon: ArchiveIcon },
  { link: "orders", title: "orders", Icon: RocketIcon },
];

type ArrayElement<T> = T extends Array<infer U> ? U : never;

function SidebarMenuItem({
  title,
  Icon,
  link,
}: ArrayElement<typeof sidebarMenus>) {
  const pathname = usePathname();

  const isActive = pathname.slice(6) === link;
  console.log("🚀 ~ file: admin-sidebar-items.tsx:28 ~ isActive:", isActive);

  return (
    <li
      className={cn(isActive && "bg-neutral-800 text-white", "rounded-md p-2")}
    >
      <Link href={`/admin/${link}`} className="flex items-center space-x-2">
        <Icon  className="h-5 w-5"/>
        <span>{title}</span>
      </Link>
    </li>
  );
}

export function AdminSidebarItems() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center px-6 py-8">
        <h3 className="text-2xl font-semibold">DASHBOARD</h3>
      </div>

      <ul className="flex flex-1 flex-col space-y-4 overflow-hidden px-4 text-neutral-300">
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
