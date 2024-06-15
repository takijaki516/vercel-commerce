"use client";

import { Collection } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Collection>[] = [
  {
    accessorKey: "title",
    header: () => <div>title</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("title")}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div>updatedAt</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("title")}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div>createdAt</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("title")}</div>;
    },
  },
];
