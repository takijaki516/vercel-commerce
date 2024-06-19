import * as React from "react";
import { prismaDB } from "@/lib/prisma-db";

import { cn } from "@/lib/utils";
import { CollectionItemDropdown } from "./dropdown";
import { CollectionItemList } from "./item";

async function CollectionList() {
  const collections = await prismaDB.collection.findMany({});

  return (
    <>
      <nav>
        <h3 className="hidden text-xs">Collections</h3>
        <ul>
          <React.Suspense fallback={null}>
            <CollectionItemList list={collections} />
          </React.Suspense>
        </ul>
        <ul>
          <React.Suspense fallback={null}>
            <CollectionItemDropdown list={collections} />
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
