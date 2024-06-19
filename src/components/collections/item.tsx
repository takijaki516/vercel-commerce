"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

import { cn, createUrl } from "@/lib/utils";

export function CollectionItemList({ list }: { list: { title: string }[] }) {
  return (
    <>
      {list.map((item, idx) => (
        <CollectionItem key={idx} item={item} />
      ))}
    </>
  );
}

export function CollectionItem({ item }: { item: { title: string } }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = pathname.split("/")[2] === item.title;

  const newParams = new URLSearchParams(searchParams.toString());
  const DynamicTag = active ? "p" : Link;

  const newPathname = `/search/${item.title}`;
  const createdUrl = createUrl(newPathname, newParams);

  return (
    <li className="mt-2 flex text-sm text-black dark:text-white">
      <DynamicTag
        href={createdUrl}
        className={cn("w-full hover:underline hover:underline-offset-4", {
          "underline underline-offset-4": active,
        })}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}
