"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Collection } from "@prisma/client";
import { CollectionItem } from "./item";

export function CollectionItemDropdown({ list }: { list: Collection[] }) {
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

  // REVIEW:
  React.useEffect(() => {
    list.forEach((listItem: Collection) => {
      if (pathname === listItem.title) {
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
        className="flex w-full items-center justify-between"
      >
        <div>{active}</div>
        <ChevronDownIcon className="h-4 w-4" />
      </div>

      {openSelect && (
        <div
          onClick={() => {
            setOpenSelect(false);
          }}
        >
          {list.map((item: Collection, idx) => (
            <CollectionItem key={idx} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
