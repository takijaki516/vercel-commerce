import * as React from "react";
import { prismaDB } from "@/lib/prisma-db";

import { cn } from "@/lib/utils";
import { CollectionItemDropdown } from "./dropdown";
import { CollectionItemList } from "./item";

async function CollectionList() {
  const collectionsList = [{ title: "all" }];
  const dbCollections = await prismaDB.collection.findMany({});
  collectionsList.push(...dbCollections);

  return (
    <>
      <nav>
        <h3 className="hidden text-xs text-neutral-500 dark:text-neutral-400 md:block">
          Collections
        </h3>

        <ul className="hidden md:block">
          <React.Suspense fallback={null}>
            <CollectionItemList list={collectionsList} />
          </React.Suspense>
        </ul>

        <ul className="md:hidden">
          <React.Suspense fallback={null}>
            <CollectionItemDropdown list={collectionsList} />
          </React.Suspense>
        </ul>
      </nav>
    </>
  );
}

export function Collections() {
  return (
    <React.Suspense
      fallback={
        <div>
          <div />
          <div />
        </div>
      }
    >
      <CollectionList />
    </React.Suspense>
  );
}
