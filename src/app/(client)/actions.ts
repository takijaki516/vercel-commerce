"use server";

import { prismaDB } from "@/lib/prisma-db";

export async function getProductByTitle(title: string) {
  const res = await prismaDB.product.findUnique({
    where: {
      title,
    },
  });

  return res;
}

export async function getCollection(title: string) {
  const res = await prismaDB.collection.findUnique({
    where: {
      title,
    },
  });

  return res;
}

export async function getCollectionProducts({
  collectTitle,
  sortKey,
  reverse,
}: {
  collectTitle: string;
  sortKey: "RELEVANCE" | "BEST_SELLING" | "CREATED_AT" | "PRICE";
  reverse: boolean;
}) {
  let prismaSortKey;
  switch (sortKey) {
    case "RELEVANCE":
      prismaSortKey = "";
      break;
    case "BEST_SELLING":
      prismaSortKey = "soldCount";
      break;
    case "CREATED_AT":
      prismaSortKey = "createdAt";
      break;
    case "PRICE":
      prismaSortKey = "price";
      break;
  }

  if (prismaSortKey) {
    return await prismaDB.collection.findUnique({
      where: {
        title: collectTitle,
      },
      include: {
        products: {
          orderBy: {
            [prismaSortKey]: reverse ? "desc" : "asc",
          },
        },
      },
    });
  } else {
    return await prismaDB.collection.findUnique({
      where: {
        title: collectTitle,
      },
      include: {
        products: true,
      },
    });
  }
}
