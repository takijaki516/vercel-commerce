"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

import { Collection } from "@prisma/client";
import { cn, createUrl } from "@/lib/utils";

export function CollectionItemList({ list }: { list: Collection[] }) {
  return (
    <>
      {list.map((item: Collection, idx) => (
        <CollectionItem key={idx} item={item} />
      ))}
    </>
  );
}

export function CollectionItem({ item }: { item: Collection }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // TODO:
  const active = pathname === item.title;
  const newParams = new URLSearchParams(searchParams.toString());
  const DynamicTag = active ? "p" : Link;

  return (
    <li className="mt-2 flex text-black dark:text-white">
      <DynamicTag href={createUrl(pathname, newParams)}>
        {item.title}
      </DynamicTag>
    </li>
  );
}
