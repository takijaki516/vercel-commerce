import * as React from "react";

import { SortFilterItem } from "./item";
import { SortFilterItemType } from "@/lib/constants";
import { FilterItemDropdown } from "./dropdown";

function FilterItemList({ list }: { list: SortFilterItemType[] }) {
  return (
    <>
      {list.map((item: SortFilterItemType, idx) => (
        <SortFilterItem key={idx} item={item} />
      ))}
    </>
  );
}

export function FilterList({ list }: { list: SortFilterItemType[] }) {
  return (
    <>
      <nav>
        <h3 className="hidden text-xs text-neutral-500 dark:text-neutral-400 md:block">
          Sort By
        </h3>
      </nav>

      <ul className="hidden md:block">
        <React.Suspense fallback={null}>
          <FilterItemList list={list} />
        </React.Suspense>
      </ul>

      <ul className="md:hidden">
        <React.Suspense fallback={null}>
          <FilterItemDropdown list={list} />
        </React.Suspense>
      </ul>
    </>
  );
}
