import { Product } from "@prisma/client";

export type SortFilterItemType = {
  title: string;
  slug: string;
  sortKey: keyof Product;
  reverse: boolean;
};

export const defaultSort: SortFilterItemType = {
  title: "Relevance",
  slug: "relevance",
  sortKey: "collectionId",
  reverse: false,
};

export const sorting: SortFilterItemType[] = [
  defaultSort,
  {
    title: "Most Sold",
    slug: "most-sold",
    sortKey: "soldCount",
    reverse: false,
  },
  {
    title: "Latest arrivals",
    slug: "latest-desc",
    sortKey: "createdAt",
    reverse: true,
  },
  {
    title: "Price: Low to high",
    slug: "price-asc",
    sortKey: "price",
    reverse: false,
  }, // asc
  {
    title: "Price: High to low",
    slug: "price-desc",
    sortKey: "price",
    reverse: true,
  },
];

export const TAGS = {
  collections: "collections",
  products: "products",
  cart: "cart",
};

export const HIDDEN_PRODUCT_TAG = "";
export const DEFAULT_OPTION = "";

export const sortByOptions = [
  { title: "Relevance" },
  { title: "Latest Product" },
  { title: "Price: Low to High" },
  { title: "Price: High to Low" },
];
