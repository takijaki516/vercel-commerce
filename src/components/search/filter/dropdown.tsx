"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { ListItem } from ".";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterItem } from "./item";

export function FilterItemDropdown({ list }: { list: ListItem[] }) {
  // TODO: active
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ChevronDownIcon className="h-4 w-4" />
        {/* TODO: active */}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {list.map((item: ListItem, i) => (
          <FilterItem key={i} item={item} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
