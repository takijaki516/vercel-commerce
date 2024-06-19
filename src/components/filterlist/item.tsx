"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { cn, createUrl } from "@/lib/utils";
import { SortFilterItemType } from "@/lib/constants";

export function SortFilterItem({ item }: { item: SortFilterItemType }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("sort") === item.slug;
  const q = searchParams.get("q");
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(item.slug && item.slug.length && { sort: item.slug }),
    }),
  );

  const DynamicTag = active ? "p" : Link;

  return (
    <li className="mt-2 flex text-sm text-black dark:text-white">
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className={cn("w-full hover:underline hover:underline-offset-4", {
          "underline underline-offset-4": active,
        })}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}
