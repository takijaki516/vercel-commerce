"use client";

import { Collection, Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Collection & { products: Product[] }>[] = [
  {
    accessorKey: "title",
    header: () => <div>title</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("title")}</div>;
    },
  },
  {
    accessorKey: "products",
    header: () => <div># products</div>,
    cell: ({ row }) => {
      return <div>{(row.getValue("products") as Product[]).length}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div>last modified</div>,
    cell: ({ row }) => {
      const aa = new Date(row.getValue("updatedAt") as Date); // REVIEW:
      return <div>{aa.toLocaleString("en-US")}</div>;
    },
  },
];
