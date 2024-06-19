import * as React from "react";

import { SortFilterItem } from "./item";
import { SortFilterItemType } from "@/lib/constants";
import { FilterItemDropdown } from "./dropdown";

export type FilterItemProps = { type: "sort-key"; list: SortFilterItemType[] };

function FilterItemList({ list }: { list: FilterItemProps }) {
  return (
    <>
      {list.list.map((item: SortFilterItemType, idx) => (
        <SortFilterItem key={idx} item={item} />
      ))}
    </>
  );
}

export function FilterList({ item }: { item: FilterItemProps }) {
  return (
    <>
      <nav>{item.type}</nav>

      <ul className="hidden md:block">
        <React.Suspense fallback={null}>
          <FilterItemList list={item} />
        </React.Suspense>
      </ul>

      <ul className="md:hidden">
        <React.Suspense fallback={null}>
          <FilterItemDropdown item={item} />
        </React.Suspense>
      </ul>
    </>
  );
}
