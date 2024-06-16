import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { prismaDB } from "@/lib/prisma-db";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CollectionsPage() {
  const collections = await prismaDB.collection.findMany({
    include: {
      products: true,
    },
  });

  return (
    <div className="w-full px-16 text-neutral-300">
      <Link
        href="/admin/collections/new"
        className="flex items-center underline-offset-4 hover:underline"
      >
        <PlusIcon className="mr-2 h-6 w-6" />
        <span>add new collections</span>
      </Link>

      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={collections} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
