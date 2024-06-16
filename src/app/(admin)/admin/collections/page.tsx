import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getAllCollections } from "../actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CollectionsPage() {
  const collections = await getAllCollections();

  return (
    <div className="w-full px-16">
      <Link
        href="/admin/collections/new"
        className="text-neutral-30 flex items-center pb-10"
      >
        <PlusIcon className="mr-2 h-6 w-6" />
        <span>add new collections</span>
      </Link>

      <div className="">
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
