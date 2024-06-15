import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function ProductsPage() {
  return (
    <div className="w-full px-4">
      <Link href="/admin/products/new/collection" className="text-neutral-30 flex items-center">
        <PlusIcon className="mr-2 h-6 w-6" />
        <span>add new product</span>
      </Link>
    </div>
  );
}
