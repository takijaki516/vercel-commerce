"use server";

import { prismaDB } from "@/lib/prisma-db";
import { Prisma, Product } from "@prisma/client";

export async function getProducts({
  query,
  reverse,
  sortKey,
  collectionTitle,
}: {
  query: string;
  sortKey: keyof Product;
  reverse?: boolean;
  collectionTitle?: string;
}) {
  let res;

  if (sortKey === "collectionId") {
    res = await prismaDB.product.findMany({
      where: {
        collection: {
          title: collectionTitle === "all" ? undefined : collectionTitle,
        },
        title: query ? query : undefined,
      },
    });
  } else {
    res = await prismaDB.product.findMany({
      where: {
        collection: {
          title: collectionTitle === "all" ? undefined : collectionTitle,
        },
        title: query ? query : undefined,
      },
      orderBy: {
        [sortKey]: reverse ? "desc" : "asc",
      },
    });
  }

  return res;
}
