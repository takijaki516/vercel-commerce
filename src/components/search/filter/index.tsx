import * as React from "react";
import { SortFilterItem } from "@/lib/constants";
import { FilterItem } from "./item";
import { FilterItemDropdown } from "./dropdown";

export type PathFilterItem = { title: string; path: string };
export type ListItem = SortFilterItem | PathFilterItem;

function FilterItemList({ list }: { list: ListItem[] }) {
  return (
    <>
      {list.map((item: ListItem, i) => (
        <FilterItem key={i} item={item} />
      ))}
    </>
  );
}

export default function FilterList({
  list,
  title,
}: {
  list: ListItem[];
  title?: string;
}) {
  return (
    <>
      <nav>
        {title ? <h3>{title}</h3> : null}
        <ul className="hidden md:block">
          <React.Suspense fallback={null}>
            <FilterItemList list={list} />
          </React.Suspense>
        </ul>
        {/* NOTE: for mobile */}
        <ul className="md:hidden">
          <React.Suspense fallback={null}>
            <FilterItemDropdown list={list} />
          </React.Suspense>
        </ul>
      </nav>
    </>
  );
}
