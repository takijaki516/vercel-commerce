import { AddCollection } from "@/components/add-collection";

export default async function CollectionsNewPage() {
  return (
    <div className="flex w-full flex-col items-center px-4 pb-6">
      <h1 className="pb-6 text-3xl">New Collection</h1>
      <AddCollection />
    </div>
  );
}
