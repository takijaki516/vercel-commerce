"use server";

import { prismaDB } from "@/lib/prisma-db";
import { Prisma, Product } from "@prisma/client";

export async function getProducts({
  query,
  reverse,
  sortKey,
}: {
  query: string;
  sortKey: keyof Product;
  reverse?: boolean;
}) {
  let res;

  if (sortKey === "collectionId") {
    res = await prismaDB.product.findMany({
      where: {
        collection: {
          title: query === "all" ? undefined : query, // REVIEW:
        },
      },
    });
  } else {
    res = await prismaDB.product.findMany({
      where: {
        collection: {
          title: query === "all" ? undefined : query, // REVIEW:
        },
      },
      orderBy: {
        [sortKey]: reverse ? "desc" : "asc",
      },
    });
  }

  return res;
}
