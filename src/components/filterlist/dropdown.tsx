"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import type { FilterItemProps } from "./filter-list";
import { SortFilterItem } from "./item";
import { SortFilterItemType } from "@/lib/constants";

export function FilterItemDropdown({ item }: { item: FilterItemProps }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = React.useState("");
  const [openSelect, setOpenSelect] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    item.list.forEach((listItem: SortFilterItemType) => {
      if ("slug" in listItem && searchParams.get("sort") === listItem.slug) {
        setActive(listItem.title);
      }
    });
  }, [pathname, item.list, searchParams]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // REVIEW:
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => {
          setOpenSelect(!openSelect);
        }}
        className="flex w-full items-center justify-between rounded border border-black/30 px-4 py-2 text-sm dark:border-white/30"
      >
        <div>{active}</div>
        <ChevronDownIcon className="h-4 w-4" />
      </div>

      {/* REVIEW: */}
      {openSelect && (
        <div
          onClick={() => {
            setOpenSelect(false);
          }}
          className="absolute z-40 w-full rounded-b-md bg-white p-4 shadow-md dark:bg-black"
        >
          {item.list.map((item: SortFilterItemType, i) => (
            <SortFilterItem key={i} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
