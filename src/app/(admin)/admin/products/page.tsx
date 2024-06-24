import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { prismaDB } from "@/lib/prisma-db";
import { Button } from "@/components/ui/button";

export default async function ProductsPage() {
  const products = await prismaDB.product.findMany({});

  return (
    <div className="w-full px-16">
      <Link
        href="/admin/products/new/collection"
        className="flex items-center text-black dark:text-white"
      >
        <PlusIcon className="mr-2 h-6 w-6" />
        <span>add new product</span>
      </Link>

      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={products} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
