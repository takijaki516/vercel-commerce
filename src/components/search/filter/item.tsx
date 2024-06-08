"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { cn, createUrl } from "@/lib/utils";
import type { ListItem, PathFilterItem } from ".";
import type { SortFilterItem } from "@/lib/constants";

function PathFilterItem({ item }: { item: PathFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = pathname === item.path;
  const newParams = new URLSearchParams(searchParams.toString()); // REVIEW:
  const DynamicTag = active ? "p" : Link;

  // REVIEW:
  newParams.delete("q");

  return (
    <li className="mt-2">
      <DynamicTag href={createUrl(item.path, newParams)}>
        {item.title}
      </DynamicTag>
    </li>
  );
}

function SortFilterItem({ item }: { item: SortFilterItem }) {
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
    <li>
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className={cn("w-full hover:underline hover:underline-offset-4")}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}

export function FilterItem({ item }: { item: ListItem }) {
  return "path" in item ? (
    <PathFilterItem item={item} />
  ) : (
    <SortFilterItem item={item} />
  );
}
