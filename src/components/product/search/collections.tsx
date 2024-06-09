import * as React from "react";
import FilterList from "./filter";

async function CollectionsList() {
  const collections = await getCollections();
  return <FilterList list={collections} title="collections" />;
}

export function Collections() {
  return (
    <React.Suspense
      fallback={
        <div>
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      }
    >
      <CollectionsList />
    </React.Suspense>
  );
}
