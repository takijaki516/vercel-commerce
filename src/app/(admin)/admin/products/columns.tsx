"use client";

import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "title",
    header: () => <div>Title</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("title")}</div>;
    },
  },
  {
    accessorKey: "description",
    header: () => <div>description</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("description")}</div>;
    },
  },
  {
    accessorKey: "price",
    header: () => <div>price</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("price")}</div>;
    },
  },
  {
    accessorKey: "soldCount",
    header: () => <div>sold count</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("soldCount")}</div>;
    },
  },
  {
    accessorKey: "availableForSale",
    header: () => <div>available for sale</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("availableForSale") ? "true" : "false"}</div>;
    },
  },
];
