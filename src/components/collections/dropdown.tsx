"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { CollectionItem } from "./item";

export function CollectionItemDropdown({
  list,
}: {
  list: { title: string }[]; // TODO: refactor type
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = React.useState("");
  const [openSelect, setOpenSelect] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  React.useEffect(() => {
    list.forEach((listItem) => {
      if (pathname.split("/")[2] === listItem.title) {
        setActive(listItem.title);
      }
    });
  }, [pathname, list, searchParams]);

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

      {openSelect && (
        <div
          onClick={() => {
            setOpenSelect(false);
          }}
          className="absolute z-40 w-full rounded-b-md bg-white p-4 shadow-md dark:bg-black"
        >
          {list.map((item, idx) => (
            <CollectionItem key={idx} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
